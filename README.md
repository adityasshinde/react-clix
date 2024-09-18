# React-CLIX

React-CLIX is a CLI tool to scaffold React projects with Redux and RTK Query. It provides useful commands to streamline React development, including setting up Redux, RTK Query, and creating React components easily.

## Installation

To install `react-clix` globally, run:

```bash
npm install -g react-clix
```

## Commands

### 1. `create-app <name>`

Creates a new React application with an optional TypeScript setup.

#### Usage:

```bash
react-clix create-app MyApp
```

#### Options:

- `-t, --typescript`: Use a TypeScript template for the project.

#### Example:

```bash
react-clix create-app MyApp -t
```

This will create a new React app named `MyApp` using the TypeScript template.

---

### 2. `init-redux`

Initializes a Redux store in an existing React project. This command will create a `store.js` file in the `src` directory, including basic Redux setup and configuration.

#### Usage:

```bash
react-clix init-redux
```

#### Example:

Run this command inside an existing React project:

```bash
cd my-existing-react-app
react-clix init-redux
```

This will add the necessary files to set up Redux in your project.

---

### 3. `add-rtk-api <apiName>`

Adds a new RTK Query API with the specified name to the Redux store. It generates the API slice in the `src/services/` directory and sets up everything for you.

#### Usage:

```bash
react-clix add-rtk-api <apiName>
```

#### Example:

```bash
react-clix add-rtk-api authApi
```

This will create an `authApi` in the `src/services/` directory with proper RTK Query configuration.

---

### 4. `create-slice <sliceName>`

Creates a new Redux slice with the specified name and integrates it into the Redux store. It also updates the necessary files to include hooks for easy usage within React components.

#### Usage:

```bash
react-clix create-slice <sliceName>
```

#### Example:

```bash
react-clix create-slice userSlice
```

This will create a Redux slice named `userSlice` and automatically update the store configuration.

---

### 5. `create-component <componentName>`

Generates a new React component in the specified path under the `src` directory. By default, it creates the component in the `src/components` folder. You can also specify a relative path.

#### Usage:

```bash
react-clix create-component <componentName>
```

#### Options:

- `-p, --path <path>`: Relative path from the `src` directory where the component should be created.

#### Example:

```bash
react-clix create-component MyComponent -p components/ui
```

This will create `MyComponent.jsx/tsx` inside `src/components/ui/` without creating an additional folder for the component.

---

## Examples

1. **Creating a New React App:**

   ```bash
   react-clix create-app MyNewApp -t
   ```

   This will create a new React app with TypeScript support.

2. **Initializing Redux in an Existing App:**

   ```bash
   cd MyExistingApp
   react-clix init-redux
   ```

   This will set up Redux for state management in your existing app.

3. **Adding an RTK Query API:**

   ```bash
   react-clix add-rtk-api productsApi
   ```

   This will create a new `productsApi` service for RTK Query in your project.

4. **Creating a Redux Slice:**

   ```bash
   react-clix create-slice cartSlice
   ```

   This will add a new `cartSlice` to manage cart-related state.

5. **Creating a React Component:**

   ```bash
   react-clix create-component Button -p components/common
   ```

   This will create a `Button.jsx/tsx` file inside `src/components/common/`.

## Installation for Development

If you are developing `react-clix` or want to modify it:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-clix.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. To test your CLI tool locally, link it globally:
   ```bash
   npm link
   ```

This will allow you to use `react-clix` commands globally on your machine.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

