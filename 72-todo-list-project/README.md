# Section 72: Building a Todo List with Material UI and Local Storage

- [Creating the Application](#creating-the-application)
  - [CSS Baseline](#css-baseline)
- [The TodoList Component](#the-todolist-component)
- [Removing Todos](#removing-todos)
- [Toggling Todos](#toggling-todos)
- [The New Todo Form](#the-new-todo-form)
- [Adding LocalStorage](#adding-localstorage)
- [Tweaking the Todo Icons and Ids](#tweaking-the-todo-icons-and-ids)
- [Final Styles](#final-styles)

## Creating the Application
This application is built using a Vite dev environment.
```bash
$ npm create vite@latest
```

Install Material UI and its fonts and icons.
```bash
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @fontsource/roboto
$ npm install @mui/icons-material
```

Delete all CSS added by Vite in `App.css` and `index.css`.

Import [`CssBaseline`](https://mui.com/material-ui/react-css-baseline/) from Material UI.

### CSS Baseline
The CssBaseline component helps to kickstart an elegant, consistent, and simple baseline to build upon.

#### Global reset
You might be familiar with [normalize.css](https://github.com/necolas/normalize.css), a collection of HTML element and attribute style-normalizations.

MUI CSS Baseline strips away any browser default styles.

```jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## The TodoList Component
A todo list will have the following data structure.
```json
[
    {id: "12312", text: "walk the dog", completed: false},
    {id: "14523", text: "feed the cat", completed: true},
    {id: "12352", text: "water the plants", completed: false},
]
```

Create a `src/TodoList.jsx` and hard code some initial todos.

Import the MUI [Checkbox](https://mui.com/material-ui/react-list/#checkbox) component to display the data and tweak it display the list of todos appropriately checking the boxes that are completed.

## Removing Todos
In this section, the `TodoList` was broken into two components, the list, `TodoList`, and an individual item, `TodoItem`.

Recall [implicit returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body). The TodoList maps over all of the todos and each `TodoItem` is implicitly returned
```jsx
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {todos.map((todo) => (
        < TodoItem key={todo.id} todo={todo} handleToggle={handleToggle} />
    ))}
</List>
```

To delete a Todo requires altering state. The `TodoList` parent sends a todo to the `TodoItem` and a `removeTodo` callback and the `TodoItem` executes the function removing the `TodoItem`.

## Toggling Todos
To toggle a TodoItem, follow the same process as [removing a todo](#removing-todos). 


To toggle a Todo requires altering state. The `TodoList` parent sends a todo to the `TodoItem` and a `toggleTodo` callback and the `TodoItem` executes the function toggling the `TodoItem`.

## The New Todo Form
To add a new todo to the TodoList requires altering the state. This involves creating a copy of the current state of todos and adding on a new todo.

The form will exist as another `ListItem`. It will be contained in its own component, `TodoForm`, and be added as a `TodoItem` in the `TodoList`.

The `TodoItem` containing the `TodoForm` will have a MUI [Text Field](https://mui.com/material-ui/react-text-field/) and [Input Adornment](https://mui.com/material-ui/react-text-field/#input-adornments) to add a button inside the input field.

## Adding LocalStorage
LocalStorage is added to for data persistance. This will make it so if the Vite server is restarted the data will be in the local storage to retrieve.

One option to retrieve the data is when the component is mounted. This method would require [`useEffect`](https://react.dev/reference/react/useEffect).

Saving the todos into local storage with the key `todos` whenever the `todos` state is updated.
```jsx
useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos),)
}, [todos])
```

Retrieve the data from local storage.
```jsx
const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);
    
    // ...
}
```

## Tweaking the Todo Icons and Ids
This section tweaks
- The label of the text field `label="Add Todo"`
- The icon of each TodoItem to a Delete icon
Requires import then adding it in the `IconButton`
```jsx
import DeleteIcon from '@mui/icons-material/Delete';

// ...
<IconButton edge="end" aria-label="comments" onClick={remove}>
    <DeleteIcon />
</IconButton>
// ...
```

## Final Styles
This section includes the following.
- Adds a (non-functional) [Navbar](https://mui.com/material-ui/react-app-bar/#basic-app-bar) to `App.jsx`.
- Adds contents of `TodoList` into a [Box](https://mui.com/material-ui/react-box/) to add styles using `sx`.
```jsx
import Box from '@mui/material/Box';

// ...

<Box sx={{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: "center",
    m: 3,
}}>

{/* ... */}

</Box>
```
- Adds an `h1` header using MUI [Typography](https://mui.com/material-ui/react-typography/#usage) to the `TodoList`
```jsx
import Typography from '@mui/material/Typography';

// ...

<Typography variant="h1" component="h1" sx={{ flexgrow: 1 }}>
    Todo List
</Typography>
```

See `App.jsx` and `TodoList.jsx` for the completed code.