const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

async function createSlice(sliceName) {
  const reduxDir = path.join(process.cwd(), 'src', 'redux');
  const sliceDir = path.join(reduxDir, 'slices');

  // Detect if the project is TypeScript
  const isTypeScript = await fs.pathExists(path.join(process.cwd(), 'tsconfig.json'));

  const sliceFile = path.join(sliceDir, `${sliceName}.${isTypeScript ? 'tsx' : 'jsx'}`);
  const hooksFile = path.join(reduxDir, isTypeScript ? 'hooks.tsx' : 'hooks.jsx');
  
  // Create redux/slices directory
  await fs.ensureDir(sliceDir);
  
  // Create slice file using EJS template
  const sliceTemplate = await ejs.renderFile(path.join(__dirname, '../templates/sampleSlice.ejs'), { sliceName, isTypeScript });
  await fs.writeFile(sliceFile, sliceTemplate);

  // Add hooks for the slice in hooks file
  let hooksContent = '';
  if (fs.existsSync(hooksFile)) {
    hooksContent = await fs.readFile(hooksFile, 'utf-8');
  }

  hooksContent += `\nexport const use${sliceName.charAt(0).toUpperCase() + sliceName.slice(1)} = () => useAppSelector(state => state.${sliceName});`;
  await fs.writeFile(hooksFile, hooksContent);

  // Update store file to include new slice
  const storePath = path.join(reduxDir, `store.${isTypeScript ? 'tsx' : 'jsx'}`);
  let storeContent = await fs.readFile(storePath, 'utf-8');

  // Add import statement for the new slice reducer
  const importStatement = `import ${sliceName}Reducer from './slices/${sliceName}';\n`;
  if (!storeContent.includes(importStatement)) {
    storeContent = importStatement + storeContent;
  }

  // Add the new slice reducer to rootReducers
  const reducerRegex = /const rootReducers = combineReducers\(\{([^}]*)\}\)/;
  const reducerMatch = storeContent.match(reducerRegex);
  
  if (reducerMatch) {
    const existingReducers = reducerMatch[1].trim();
    const newReducer = `${sliceName}: ${sliceName}Reducer,`;
    
    // Add new reducer if it does not already exist
    if (!existingReducers.includes(sliceName)) {
      const newReducers = existingReducers ? `${existingReducers}\n  ${newReducer}` : `  ${newReducer}`;
      storeContent = storeContent.replace(reducerRegex, `const rootReducers = combineReducers({\n${newReducers}\n})`);
    }
  } else {
    // Handle case where `rootReducers` object does not exist
    storeContent = storeContent.replace(
      `const rootReducers = combineReducers({`,
      `const rootReducers = combineReducers({\n  ${sliceName}: ${sliceName}Reducer,`
    );
  }

  // Write the updated store content back to the file
  await fs.writeFile(storePath, storeContent);

  console.log(`Redux slice ${sliceName} created and hooks integrated.`);
}

module.exports = { createSlice };
