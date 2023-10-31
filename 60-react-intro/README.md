# Section 60: Introducing React

- [React Intro](#react-intro)
- [Setting Up Code Sand Box](#setting-up-code-sand-box)
- [The Basics of JSX](#the-basics-of-jsx)
- [Basic React App Structure](#basic-react-app-structure)
- [First React Component](#first-react-component)

## React Intro
The remaining sections of this course cover the following React topics.
- React Basics
- Vite
- Props
- React Events
- `uesState`
- `useEffect`
- Controlled Forms
- Material UI
- Component Design
- React Patterns

### What is React?
[React](https://react.dev/) is a front-end library (or JavaScript framework).
- It helps you build user interfaces from components.
- It provides the ability to build large scale applications through the assembly of smaller components.

### Components
Components combine HTML and logic into a single reusable function.

## Setting Up Code Sandbox
[Code Sandbox](https://codesandbox.io/) allows you to run your code in powerful microVMs and build anything without limits. Your environment is configured for you and your code is always ready, behind a URL.

Code Sandbox is the fastest way to test React code. In general, React code requires a backend server up in order to develop a React app locally.

## The Basics of JSX
Here is a snippet of React code.
```js
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox!!!</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

In Code Sandbox, running any changes to this code instantly update the view. In a regular JavaScript app, combing HTML code with JavaScript would result in a syntax error. This is possible because `.js` files in a React app include a `.jsx` extension which allow HTML and CSS syntax in `.js` files.

### JSX
JSX is a syntax extension for JavaScript.
- It allows you to write markup that looks like HTML directly inside of your JavaScript.
- It is not "legal" JS on its own, so it must be transpiled.

### Babel
Babel takes `.jsx` syntax and transpiles it into real JavaScript before it is actually compiled. 

The code in the previous example is transpiled into the following by Babel.
```js
import "./styles.css";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function App() {
  return /*#__PURE__*/_jsxs("div", {
    className: "App",
    children: [/*#__PURE__*/_jsx("h1", {
      children: "Hello CodeSandbox!!!"
    }), /*#__PURE__*/_jsx("h2", {
      children: "Start editing to see some magic happen!"
    })]
  });
}
```

## Basic React App Structure
All react apps contain these files at a minimum,
- `src/App.js`
- `src/index.js`
- `public/index.html`
- `package.json`

There are basic conventions that React apps follow. All reacts apps have,
- A component called `App`. 
  - `App.js` is the top level of the application.
  - The file renders other components that themselves render other components in a hierarchical structure.
- An `index.js` file.
  - `index.js` is where the `App` component is put into the document.
  - The file contains a line that selects a `root` element in `index.html` and creates a root object from it.
  - The root object renders the `<App />`.
- A public HTML file `index.html`.
  - `index.html` contains a `div` of class `root` where all of the React content is put.

## First React Component
Writing a React component consists of creating a function with the name of the component. These functions are functions that "know" how to render themselves into HTML.

Example creating a `Header` component.
```jsx
function Header() {
    return <h1>I'm a header component!</h1>
}
```

To use the component, it must be rendered in the App (not necessarily in the same file or its direct child).
```jsx
function Greeter() {
  return <h1>Hello, world!</h1>;
}

export default function App() {
  return (
    <div className="App">
      <Greeter />
    </div>
  );
}
```

Note that adjacent JSX elements must be wrapped in an enclosing tag.

Returns a `SyntaxError` error.
```jsx
return <h1>Hello, world!</h1> <h2>It's me, Mario!</h2>;
```

Solution to the `SyntaxError`.
```jsx
function Greeter() {
  return (<h1>Hello, world!</h1>), (<h2>It's me, Mario!</h2>);
}
```