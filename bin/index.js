#!/usr/bin/env node

const { Command } = require('commander');
const { createReactApp } = require('../commands/createReactApp');
const { initializeReduxStore } = require('../commands/initializeReduxStore');
const { addRTKApi } = require('../commands/addRTKApi');
const { createSlice } = require('../commands/createSlice');
const { createReactComponent } = require('../commands/createComponent'); // Import the new command
const program = new Command();

program
  .version('1.0.0')
  .description('CLI Tool to scaffold React projects with Redux and RTK Query');

// Command 1: Create React App
program
  .command('create-app <name>')
  .option('-t, --typescript', 'Use TypeScript template')
  .description('Create a new React app with optional TypeScript')
  .action((name, options) => {
    createReactApp(name, options.typescript);
  });

// Command 2: Initialize Redux Store
program
  .command('init-redux')
  .description('Initialize Redux store in an existing React app')
  .action(initializeReduxStore);

// Command 3: Add RTK Query API
program
  .command('add-rtk-api <apiName>')
  .description('Add RTK Query API with the given name')
  .action(addRTKApi);

// Command 4: Create Redux Slice
program
  .command('create-slice <sliceName>')
  .description('Create a Redux slice with hooks integration')
  .action(createSlice);

// Command 5: Create React Component
program
  .command('create-component <componentName>')
  .option('-p, --path <path>', 'Relative path from src (default: "components")')
  .description('Create a new React component with optional relative path')
  .action((componentName, options) => {
    createReactComponent(componentName, options.path);
  });

program.parse(process.argv);
