const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { execSync } = require('child_process');

async function initializeReduxStore() {
  try {
    const reduxDir = path.join(process.cwd(), 'src', 'redux');
    
    // Detect if the project is TypeScript by checking for tsconfig.json
    const isTypeScript = await fs.pathExists(path.join(process.cwd(), 'tsconfig.json'));

    const hooksFile = path.join(reduxDir, isTypeScript ? 'hooks.tsx' : 'hooks.jsx');
    const storeFile = path.join(reduxDir, isTypeScript ? 'store.tsx' : 'store.jsx');

    // Create redux directory if it doesn't exist
    await fs.ensureDir(reduxDir);

    // Create hooks file for TS or JS
    if (isTypeScript) {
      await fs.writeFile(hooksFile, `import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';\nimport { RootState, AppDispatch } from './store';\nexport const useAppDispatch = () => useDispatch<AppDispatch>();\nexport const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;\n`);
    } else {
      await fs.writeFile(hooksFile, `import { useDispatch, useSelector } from 'react-redux';\nexport const useAppDispatch = () => useDispatch();\nexport const useAppSelector = useSelector;\n`);
    }

    // Create store file using EJS template for TS or JS
    const storeTemplate = await ejs.renderFile(path.join(__dirname, '../templates/store.ejs'), { isTypeScript });
    await fs.writeFile(storeFile, storeTemplate);

    // Update index file to wrap App with Redux Provider
    const indexPath = path.join(process.cwd(), 'src', isTypeScript ? 'index.tsx' : 'index.js');
    let indexContent = await fs.readFile(indexPath, 'utf-8');
    if (!indexContent.includes('<Provider')) {
      indexContent = indexContent.replace(
        `<App />`,
        `<Provider store={store}><App /></Provider>`
      );
      indexContent = `import { Provider } from 'react-redux';\nimport { store } from './redux/store';\n` + indexContent;
      await fs.writeFile(indexPath, indexContent);
    }

    // Install necessary dependencies
    console.log('Installing required dependencies...');
    execSync(`npm install react-redux @reduxjs/toolkit ${isTypeScript ? '@types/react-redux' : ''}`, { stdio: 'inherit' });

    console.log('Redux store initialized and dependencies installed.');
  } catch (error) {
    console.error('Error initializing Redux store:', error);
  }
}

module.exports = { initializeReduxStore };
