const fs = require('fs-extra');
const path = require('path');

// Function to create a React component
async function createReactComponent(componentName, relativePath) {
  // Define the path for the new component
  const componentsDir = path.join(process.cwd(), 'src', relativePath || 'components');
  const componentFile = path.join(componentsDir, `${componentName}.jsx`);
  const componentTemplate = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      <h1>${componentName} Component</h1>
    </div>
  );
};

export default ${componentName};
  `;

  // Ensure the components directory exists
  await fs.ensureDir(componentsDir);

  // Write component file
  await fs.writeFile(componentFile, componentTemplate.trim());

  console.log(`Component ${componentName} created at ${componentsDir}`);
}

module.exports = { createReactComponent };
