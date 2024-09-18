# React-CLIX

React-CLIX is a CLI tool to scaffold React projects with Redux and RTK Query. It provides useful commands to streamline React development, including setting up Redux, RTK Query, and creating React components easily.

## Installation

To install `react-clix` globally, run:

```bash
npm install -g react-clix
```

Alternatively, if you do not want to install it globally, you can install it locally in your project:

```bash
npm install react-clix --save-dev
```

After installing locally, you can run the commands using `npx`:

```bash
npx react-clix <command>
```

## Commands

### 1. `create-app <name>`

Creates a new React application with an optional TypeScript setup.

#### Global Usage:

```bash
react-clix create-app MyApp
```

#### Local Usage:

If you have installed `react-clix` locally in your project, run:

```bash
npx react-clix create-app MyApp
```

#### Options:

- `-t, --typescript`: Use a TypeScript template for the project.

#### Example:

```bash
react-clix create-app MyApp -t
```

Or, using `npx` for local installation:

```bash
npx react-clix create-app MyApp -t
```

---

### 2. `init-redux`

Initializes a Redux store in an existing React project. This command will create a `store.js` file in the `src` directory, including basic Redux setup and configuration.

#### Global Usage:

```bash
react-clix init-redux
```

#### Local Usage:

If `react-clix` is installed locally, run:

```bash
npx react-clix init-redux
```

#### Example:

```bash
cd my-existing-react-app
react-clix init-redux
```

Or:

```bash
cd my-existing-react-app
npx react-clix init-redux
```

---

### 3. `add-rtk-api <apiName>`

Adds a new RTK Query API with the specified name to the Redux store. It generates the API slice in the `src/services/` directory and sets up everything for you.

#### Global Usage:

```bash
react-clix add-rtk-api <apiName>
```

#### Local Usage:

If `react-clix` is installed locally, run:

```bash
npx react-clix add-rtk-api <apiName>
```

#### Example:

```bash
react-clix add-rtk-api authApi
```

Or:

```bash
npx react-clix add-rtk-api authApi
```

---

### 4. `create-slice <sliceName>`

Creates a new Redux slice with the specified name and integrates it into the Redux store. It also updates the necessary files to include hooks for easy usage within React components.

#### Global Usage:

```bash
react-clix create-slice <sliceName>
```

#### Local Usage:

If `react-clix` is installed locally, run:

```bash
npx react-clix create-slice <sliceName>
```

#### Example:

```bash
react-clix create-slice userSlice
```

Or:

```bash
npx react-clix create-slice userSlice
```

---

### 5. `create-component <componentName>`

Generates a new React component in the specified path under the `src` directory. By default, it creates the component in the `src/components` folder. You can also specify a relative path.

#### Global Usage:

```bash
react-clix create-component <componentName>
```

#### Local Usage:

If `react-clix` is installed locally, run:

```bash
npx react-clix create-component <componentName>
```

#### Options:

- `-p, --path <path>`: Relative path from the `src` directory where the component should be created.

#### Example:

```bash
react-clix create-component MyComponent -p components/ui
```

Or:

```bash
npx react-clix create-component MyComponent -p components/ui
```

---

## Examples

1. **Creating a New React App:**

   Global:

   ```bash
   react-clix create-app MyNewApp -t
   ```

   Locally:

   ```bash
   npx react-clix create-app MyNewApp -t
   ```

2. **Initializing Redux in an Existing App:**

   Global:

   ```bash
   cd MyExistingApp
   react-clix init-redux
   ```

   Locally:

   ```bash
   cd MyExistingApp
   npx react-clix init-redux
   ```

3. **Adding an RTK Query API:**

   Global:

   ```bash
   react-clix add-rtk-api productsApi
   ```

   Locally:

   ```bash
   npx react-clix add-rtk-api productsApi
   ```

4. **Creating a Redux Slice:**

   Global:

   ```bash
   react-clix create-slice cartSlice
   ```

   Locally:

   ```bash
   npx react-clix create-slice cartSlice
   ```

5. **Creating a React Component:**

   Global:

   ```bash
   react-clix create-component Button -p components/common
   ```

   Locally:

   ```bash
   npx react-clix create-component Button -p components/common
   ```

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
