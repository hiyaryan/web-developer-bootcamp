# Section 65: React Events

- [React Events Intro](#react-events-intro)
- [Non-Click Events](#non-click-events)
- [Working with the Event Object](#working-with-the-event-object)
- [Clicker Exercise](#clicker-exercise)

## React Events Intro
In vanilla JavaScript, events are added to objects as by selecting it, then adding an event listener.
```js
const btn = document.querySelector("buttin");
btn.addEventListener("click", function () {
    // ...
})
```

In React, set the event inline on an object in the component and pass it a callback function.
```jsx
const handleClick = () => {
    window.alert("Clicked the button!");
}

export default function Clicker() {
    return (
        <div>
            <p>Click the Button</p>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}
```

## Non-Click Events
The following example expands on the [previous example](#react-events-intro) and adds a non-click `mouseover` event to the paragraph.
```jsx
const handleHover = () => {
    const p = document.querySelector("p");
    p.innerText = "Ouch!"
}

export default function Clicker() {
    return (
        <div>
            <p onMouseOver={handleHover}>Click the Button</p>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}
```

All [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) in *camelCase form* can be used in React.

## Working with the Event Object
The event object is automatically passed to the callback function and can be used normally such as determining what key was pressed or preventing certain actions from occurring, 

Preventing default action of a form from automatically refreshing the page whn clicked.
```jsx
const handleFormSubmit = (e) => {
    e.preventDefault();
    window.alert("Sending the data!");
}

export default function Form() {
    return (
        <form onSubmit={handleFormSubmit}>
            <p>Submit me!</p>
            <button>Submit</button>
        </form>
    )
}
```

## Clicker Exercise
See `src/Clicker.jsx` for a `Clicker` component that retrieves a message that is alerted when a button with custom text is pressed.

This version of the exercise uses the [`bind()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) on the callback passed to the `button`'s `onClick` event allowing arguments to be passed to it.