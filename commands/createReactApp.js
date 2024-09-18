const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

// Function to create a React app with optional TypeScript
const createReactApp = (name, typescript) => {
  const template = typescript ? '--template typescript' : '';
  const command = `npx create-react-app ${name} ${template}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating React app: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      //return;
    }
    console.log(`React app created successfully: ${stdout}`);

    if (typescript) {
      setupTypeScript(name);
    }
  });
};

// Function to set up TypeScript-specific configurations
const setupTypeScript = async (appName) => {
  const appPath = path.join(process.cwd(), appName);

  // Check if TypeScript is already set up
  const tsconfigPath = path.join(appPath, 'tsconfig.json');
  const packageJsonPath = path.join(appPath, 'package.json');

  // Install TypeScript dependencies if not already installed
  console.log('Installing TypeScript dependencies...');
  exec(`npm install --prefix ${appPath} @types/node @types/react @types/react-dom @types/jest`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing TypeScript dependencies: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`TypeScript dependencies installed successfully: ${stdout}`);
  });

  // Create or update tsconfig.json if necessary
  if (!(await fs.pathExists(tsconfigPath))) {
    console.log('Creating tsconfig.json...');
    const tsconfig = {
      compilerOptions: {
        target: 'es5',
        module: 'es6',
        jsx: 'react',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ['src'],
      exclude: ['node_modules'],
    };
    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('tsconfig.json created.');
  }

  // Optionally: Add any other TypeScript-related configuration or files here
};

module.exports = { createReactApp };
