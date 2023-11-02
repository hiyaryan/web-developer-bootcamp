# Section 66: The Basics of React State

- [State Intro](#state-intro)
- [The `useState()` Hook](#the-usestate-hook)
- [Creating a Toggler Component](#creating-a-toggler-component)
- [Multiple Pieces of State in a Component](#multiple-pieces-of-state-in-a-component)
- [`useState()` and Rendering](#usestate-and-rendering)
  - [Closures](#closures)
- [Color Box Exercise](#color-box-exercise)

## State Intro
***"Will this ever change?" if so, it should go into state.***

Reacts Concepts
- **Components** - the building blocks of react, they combine logic and presentation
- **Props** - *immutable* data passed to a component
- **State** - *mutable* data specific to an instance of a component

In order for mutable data to be reflected in a component, React must know when to call it again. 

`num` in the following code is updated but not reflected in the `p` tag. When this component is rendered, the `incrementNum` callback with the `num` variable is associated with the `button` in the browser as regular JavaScript and not `p` where `num` remains 0.
```jsx
export default function Counter() {
    let num = 0;
    const incrementNum = () => (num += 1);
    return (
        <div>
            <p>The count is: {num}</p>
            <button onClick={incrementNum}>Increment</button>
        </div>
    )
}
```

Additionally, passing `num` to the `Counter` component and incrementing it will not be reflected in the `p` tag because *`props` are immutable*.
```jsx
export default function Counter({ num }) {
    const incrementNum = () => (num += 1);
    return (
        <div>
            <p>The count is: {num}</p>
            <button onClick={incrementNum}>Increment</button>
        </div>
    )
}
```

In order for `num` to be reflected in `p` requires the use of React state. ***State is mutable***. In general, it contains,
- Data fetched from an API
- Form Information
- A variable that "decides" whether something is showing or hidden
- Anything that might change

## The `useState()` Hook
To use state in React requires the use of the `useState()` Hook.

State is created using the `useState` hook.
```jsx
const [count, setCount] = useState(0);
```

The line above returns a array containing two elements
- The piece of state itself
- A function to change the piece of state

`useState` must be called ***inside*** a component.

The `useState` hook updates `num` using state which is then reflected as expected throughout the component. The `setNum` method associated with `num` takes a callback (or anonymous function) that updates the value of `num`.
```jsx
export default function Counter() {
    const [num, setNum] = useState(0);

    return (
        <div>
            <p>The count is: {num}</p>
            <button onClick={() => { setNum(num + 1) }}>Increment</button>
        </div>
    )
}
```

[Hooks](https://react.dev/blog/2023/03/16/introducing-react-dev#going-all-in-on-modern-react-with-hooks) let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. See [Hooks API Reference](https://react.dev/reference/react/hooks) for a list of available hooks.

Below is a list of basic hooks.
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [useContext](https://react.dev/reference/react/useContext)

## Creating a Toggler Component
See `src/Toggler.jsx` for another example of state usage.

Note in this example that the `useState` method accepts any data type. In the [previous example](#state-intro) it set `num` to an initial number of 0. In this example the initial value is the boolean value `true`.
```jsx
const [isHappy, setIsHappy] = useState(true);
```

## Multiple Pieces of State in a Component
Multiple pieces of state can be added to a component. See `src/ToggleCounter.jsx` for the full demo.

To add multiple pieces of state, use the `useState` hook as many times as there is mutable data.

Using `useState` twice in the `ToggleCounter` component.
```jsx
const [isHappy, setIsHappy] = useState(true);
const [count, setNum] = useState(0);
```

## `useState()` and Rendering
When `useState` is used in a component, React knows to render the component again whenever the defined stateful variable is updated. 

It should be noted that when the component is rendered the first time, React uses the initial value passed to `useState(<initial-value>)`. On consecutive renderings, when `useState` is executed the new value is used in place of the initial value once the associated `set` method is executed.

The first printed value of `num` is `0`, then only when `setNum` is called, the printed value of `num` is `1`. Anytime `setNum` is called it updates the value in the store where the state is located. React knows not to use the initial value of `0` next time the Counter component is rendered because there is a value associated with `num` which it uses as the next mutable object.
```jsx
export default function Counter() {
    const [num, setNum] = useState(0);
    console.log(num);

    const count = () => {
        setNum(num + 1);
        console.log(num);
    }

    return (
        <div>
            <p>The count is: {num}</p>
            <button onClick={count}>Increment</button>
        </div>
    )
}
```

React adds memory to components using hooks with [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

### [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

## Color Box Exercise
See `src/ColorBox.jsx` for an exercise using React state to change the background color of sub-squares in a square container.