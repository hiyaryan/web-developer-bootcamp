# Section 73: Advanced Todo List

- [Topics](#topics)
  - [Advanced React Topics](#advanced-react-topics)
  - [IndexedDB](#indexeddb)
- [How to Run](#how-to-run)

This section provides bonus material for a fancier and more advanced todo list than the previous section using Material UI and React.

The todo list allows you to create multiple lists each with their own set of todos.

See `fancy-todo-list` for the source code.

## Topics
### Advanced React Topics
Below lists some of the more advanced React topics used in this project.
- [Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### IndexedDB
Instead of using `LocalStorage` this project uses [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

IndexedDB is a large-scale, NoSQL storage system. It lets you store just about anything in the user's browser. In addition to the usual search, get, and put actions, IndexedDB also supports transactions. Here is the definition of IndexedDB on MDN:

    IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. This API uses indexes to enable high performance searches of this data. While DOM Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data. IndexedDB provides a solution.

## How to Run
This project comes with a `vite.config.js` file that was built using `npm create vite@latest` and a `package.json` file.

To run this project locally, cd into the directory, then install the dependencies with npm.
```bash
$ cd fancy-todo-list
$ npm install
```

Once installed, run the project using the npm script `dev`.
```bash
$ npm run dev
```