# Section 63: Working with Props

- [Props Intro](#props-intro)
- [Non-String Props](#non-string-props)
- [Setting Default Prop Values](#setting-default-prop-values)
- [Passing Arrays and Objects](#passing-arrays-and-objects)
- [React Conditionals](#react-conditionals)
- [The React Developer Tools](#the-react-developer-tools)
- [Adding Dynamic Component Styles](#adding-dynamic-component-styles)
- [Rendering Arrays with Map](#rendering-arrays-with-map)
- [Slot Machine Exercise](#slot-machine-exercise)

## Props Intro
Props are like arguments that you can provide to a component. They are used to make components configurable.

Passing props to a Greeter component.
```jsx
<Greeter name="Bill" />
<Greeter name="Ted" />
```

Retrieving the value in greeter and using it.
```jsx
// retrieving name from props
// export default function Greeter(props) {
//     return <h1>Hi, {props.name}!</h1>
// }

// destructuring name
export default function Greeter({name}) {
    return <h1>Hi, {name}!</h1>
}
```

## Non-String Props
Pass multiple props to a component.
```jsx
<Greeter name="Bill" from="Ryan" />
<Greeter name="Ted" from="Jason" />
```

Retrieve multiple props in the component.
```jsx
export default function Greeter({name, from}) {
    return (
    <>
        <h1>Hi, {name}!</h1>
        <h2>- {from}</h2>
    </>)
}
```

Pass non-String types props using `{}`.

Creating a 20-sided Die.
```jsx
<Die numsides={20}>
```

## Setting Default Prop Values
Add default values to a prop.

Setting a default value of 6 to a Die component.
```jsx
export default function Die({numSides = 6}) {
    const roll = Math.floor(Math.random() * numSides) + 1;
    return (
        <>
            <p>{numSides} sided die roll: {roll}</p>
            <></>
        </>
    )
}
```

## Passing Arrays and Objects
Pass an array or object to props by passing `[]` or `{}` inside of `{}`.

Passing an array and an obj to two `ListPicker` components.
```jsx
<ListPicker nums={['a','b','c','d']}/>
<ListPicker obj={{a: 1,b: 2,c: 3,d: 4}}/>
```

Retrieve the props from the component in [the same way](#setting-default-prop-values) other types are retrieved.

## React Conditionals
Add conditionals to components inline between html tags, outside of html tags, or before the return statement.

DoubleDice game with inline conditionals where you win if the dice are the same number.
```jsx
export default function DoubleDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    return (
        <>
            <h1>{die1 === die2 ? "YOU WIN!" : "YOU LOSE!"}</h1>
            <p>Num 1: {die1}</p>
            <p>Num 2: {die2}</p>
        </>
    )
}
```

DoubleDice game with outside conditionals 
```jsx
export default function DoubleDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    return (
        <>
            {die1 === die2 ? <h1>YOU WIN!</h1> : null}
            <p>Num 1: {die1}</p>
            <p>Num 2: {die2}</p>
        </>
    )
}
```

DoubleDice game with conditionals before the return statement.
```jsx
export default function DoubleDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    const result = die1 === die2 ? <h1>YOU WIN!</h1> : <h1>YOU LOSE!</h1>;

    return (
        <>
            {result}
            <p>Num 1: {die1}</p>
            <p>Num 2: {die2}</p>
        </>
    )
}
``` 

## The React Developer Tools
Add [React Developer Tools](https://github.com/facebook/react) plugin to browser.  

This tool allows you to see all of the App's components and their state under the `Components` tab of the browsers Web Developer Tools.

## Adding Dynamic Component Styles
Component styles can be dynamic by assigning them inline to the `style` property.

If you win, the text turns green, otherwise, red.
```jsx
export default function DoubleDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    const isWinner = die1 === die2;
    const styles = { isWinner ? "green" : "red" };

    return (
        <div className="DoubleDice" style={styles}>
            {isWinner && <h1>You win!!</h1>}
            <p>Num 1: {die1}</p>
            <p>Num 2: {die2}</p>
        </div>
    )
}
```

## Rendering Arrays with Map
Array elements must be wrapped in HTML tags in order to be rendered as HTML.

The following would render `redpinkpurpleteal` when passes to `ColorList`.
```jsx
<ColorList colors={["red", "pink", "purple", "teal"]} />
```

The following would render an actual `p`, `h1`, and `input` objects on the document.
```jsx
<ColorList colors={[<p>Hello!</p>, <h1>Bye!</h1>, <input type="password" />]} />
```

Often the elements of an array do not come with html tags. To create valid html from the elements of an array, the elements should be mapped onto an html tag.

The `colors` in the color array are mapped onto `li` tags which are then each rendered as list items for the `ul`.
```jsx
export default function ColorList({ colors }) {
    return (
        <div>
            <h2>Color List</h2>
            <p>{colors.map(color => <li style={{ color }}>{color}</li>)}</p>
        </div>
    )
}
```

## Slot Machine Exercise
See `src/Slots.jsx` component for an exercise covering the props topics in this section.