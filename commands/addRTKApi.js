const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

async function addRTKApi(apiName) {
  // Check if the project uses TypeScript
  const isTypeScript = await fs.pathExists(path.join(process.cwd(), 'tsconfig.json'));

  const apiDir = path.join(process.cwd(), 'src', 'redux', 'api');
  const apiFile = path.join(apiDir, `${apiName}.${isTypeScript ? 'tsx' : 'jsx'}`);
  const storeFile = path.join(process.cwd(), 'src', 'redux', `store.${isTypeScript ? 'tsx' : 'jsx'}`);

  // Create redux/api directory
  await fs.ensureDir(apiDir);

  // Create api file
  const apiTemplate = await ejs.renderFile(path.join(__dirname, '../templates/sampleApi.ejs'), { apiName, isTypeScript });
  await fs.writeFile(apiFile, apiTemplate);

  // Update store file to include API slice
  let storeContent = await fs.readFile(storeFile, 'utf-8');

  // Add import statement for the API
  const importStatement = `import { ${apiName} } from './api/${apiName}';\n`;
  if (!storeContent.includes(importStatement)) {
    storeContent = importStatement + storeContent;
  }else{
    return;
  }

  // Add API reducer to the rootReducers
  const reducerRegex = /const rootReducers = combineReducers\(\{([^}]*)\}\)/;
  const reducerMatch = storeContent.match(reducerRegex);

  if (reducerMatch) {
    const existingReducers = reducerMatch[1].trim();
    const newReducer = `[${apiName}.reducerPath]: ${apiName}.reducer,`;

    // Add new reducer if it does not already exist
    if (!existingReducers.includes(`[${apiName}.reducerPath]`)) {
      const newReducers = existingReducers ? `${existingReducers}\n    ${newReducer}` : `    ${newReducer}`;
      storeContent = storeContent.replace(reducerRegex, `const rootReducers = combineReducers({\n${newReducers}\n})`);
    }else return;
  } else {
    // Handle case where rootReducers is not found (unlikely, but just in case)
    storeContent = storeContent.replace(
      /configureStore\({/,
      `configureStore({\n  reducer: {\n    [${apiName}.reducerPath]: ${apiName}.reducer,\n  },`
    );
  }

  // Add API middleware to the middleware array
  const middlewareMatch = /getDefaultMiddleware\(\)\s*\.concat\(([\s\S]*?)\)/;
  //check whether the middleware is already added
  if(storeContent.includes(`${apiName}.middleware`)) return;
  const middlewareReplacement = `getDefaultMiddleware().concat(\n ${apiName}.middleware,$1 \n)`;

  if (middlewareMatch.test(storeContent)) {
    storeContent = storeContent.replace(middlewareMatch, middlewareReplacement);
  } else {
    storeContent = storeContent.replace(
      `getDefaultMiddleware()`,
      `getDefaultMiddleware().concat(${apiName}.middleware)`
    );
  }

  // Write the updated store content back to the file
  await fs.writeFile(storeFile, storeContent);

  console.log(`RTK Query API ${apiName} added and integrated into the store.`);
}

module.exports = { addRTKApi };
