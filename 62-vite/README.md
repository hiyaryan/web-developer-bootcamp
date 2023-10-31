# Section 62: Local React Apps with Vite

- [Creating React Apps with Vite](#creating-react-apps-with-vite)
  - [Creating a New Vite Environment](#creating-a-new-vite-environment)
  - [Hosting a React App on the Local Network](#hosting-a-react-app-on-the-local-network)
- [Tour of a Vite App](#tour-of-a-vite-app)
  - [`/src` Directory](#src-directory)
  - [Root `index.html`](#root-indexhtml)
  - [`main.jsx`](#mainjsx)
  - [`index.css`](#indexcss)

## Creating React Apps with Vite
[Vite](https://vitejs.dev/guide/) (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:
- A dev server that provides [rich feature enhancements](https://vitejs.dev/guide/features) over [native ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), for example extremely fast [Hot Module Replacement (HMR)](https://vitejs.dev/guide/features#hot-module-replacement).
- A build command that bundles your code with [Rollup](https://rollupjs.org/), pre-configured to output highly optimized static assets for production.

Simply put, Vite allows you to run React apps locally by setting up a development environment for you.

### Creating a New Vite Environment
Create a new vite environment using npm.
```bash
$ npm create vite@latest
```

After entering (y) to proceed installing required packages:
1. Provide a Project name.
2. Select the React framework.
3. Select the JavaScript variant.
4. `cd` into the new directory with the given Project name.
5. Install required packages listed in `package.json` with `npm install`.
6. Launch the dev environment with `npm run dev`.

Note: [create-react-app](https://create-react-app.dev/) was previously the way to setup a React app before Vite

### Hosting a React App on the Local Network
To host a React app on a vite server over the local network, add the following to `vite.config.js`
```
server: {
    host: true,
}
```

## Tour of a Vite App
The following is a list of files common to all React apps and where to find them.

### `/src` Directory  
On `create vite`, all components, including `App.jsx` and `App.css` styles, are stored in a `/src` directory.

### Root `index.html`
The root `index.html` that renders the app, is in the root directory of the project, one level up from `/src`.

### `main.jsx`
The `main.jsx` file is the entry to the application in the `/src` directory. It retrieves the `root` and provides it with the `App` component to render.

### `index.css`
`index.css`, in the `/src` directory, is a stylesheet with the use case of applying the same styles across all components as opposed to individual stylesheets like `src/App.css` that overrides the `index.css` styles.