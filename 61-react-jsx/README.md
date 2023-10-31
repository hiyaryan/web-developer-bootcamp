# Section 61: JSX in Detail

- [Importing and Exporting Components](#importing-and-exporting-components)
- [The Rules of JSX](#the-rules-of-jsx)
- [React Fragments](#react-fragments)
- [Evaluating JS Expressions in JSX](#evaluating-js-expressions-in-jsx)
- [Creating a Die Component](#creating-a-die-component)
- [Component Decomposition](#component-decomposition)
- [Styling Components](#styling-components)
- [Random PokeCard Exercise](#random-pokecard-exercise)

## Importing and Exporting Components
The typical way to write a React app is by putting a single component in one file named after the component.

A `Greeter` component in a `Greeter.js` file. 
```jsx
export default function Greeter() {
  return <h1>Hello world!</h1>;
}
```

Greeter can also be exported on a separate line.
```jsx
function Greeter() {
  return <h1>Hello world!</h1>;
}

export default Greeter;
```

Importing `Greeter` into into `App`.
```jsx
import Greeter from "./Greeter";

export default function App() {
  return (
    <div className="App">
      <Greeter />
    </div>
  );
}
```

## The Rules of JSX
- Self-closing elements must be explicitly closed `<br />`.
- Components can only return a single element.

Example of both rules with self-closing elements `<input>` being explicitly closed and a function returning a single element `<div>`.
```jsx
export default function LoginForm() {
    return (
        <div>
            <input type="password" />
            <input type="text" />
        </div>
    );
}
```

## React Fragments
React fragments `<>` and `</>` can be used in place of `<div>` in the event that a `<div>` is not the desired wrapper element to satisfy the single element requirement of a component.

Example using reacts fragments.
```jsx
export default function LoginForm() {
    return (
        <>
            <input type="password" />
            <input type="text" />
        </>
    );
}
```

## Evaluating JS Expressions in JSX
Components can retrieve dynamic values. JavaScript can be executed in a Components return statement using `{}`. Anything inside of the `{}` is interpolated then added to the element.

Passing a title to a property component.
```jsx
export default function Property() {
    return <p> {listing.title} </p>; 
}
```

## Creating a Die Component
The following component generates and displays a random number using interpolation.
```jsx
export default function Die() {
    const roll = Math.floor(Math.random() * 6) + 1;
    return <h1>Die Roll: { roll }</h1>
}
```

## Component Decomposition
Component decomposition involves breaking down logic into separate components to build a single component built of a hierarchy of more simple components.

Instead of creating 3 dice to roll 3 different times, a DiceRolls component should be created to roll the dice .
```jsx
import Die from "./Die";

export default function DiceRoll() {
    return (
        <div>
            <Die />
            <Die />
            <Die />
        </div>
    )
}
```

## Styling Components
Add a class to the top level component to add styles in React. The keyword to add an HTML class in React is `className` since `class` is already a reserved keyword in JavaScript.

Adding a class to the die component.
```jsx
export default function Die() {
    const roll = Math.floor(Math.random() * 6) + 1;
    return <h1 className="Die">Die Roll: { roll }</h1>
}
```

Add styles to the component by retrieving the className in a designated `.css` file for the component.

Adding styles to th `Die` component in a `Die.css` stylesheet.
```css
.Die {
    color: purple;
}
```

Using webpack, the stylesheet can then be imported into the component to apply the styles on the component.

Importing `Die.css` into the `Die.js` component.
```js
import "./Die.css"
```

## Random PokeCard Exercise
Generate a random Pokemon sprite using a component with styles.

`RandomPokemon.js` component.
```jsx
import "./RandomPokemon.css";

export default function RandomPokemon() {
  const random151 = Math.floor(Math.random() * 151) + 1;
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random151}.png`;

  return (
    <div className="RandomPokemon">
      <h1>Pokemon #{random151}</h1>
      <img src={sprite} alt="Pokemon Sprite" />
    </div>
  );
}
```

`RandomPokemon.css` styles.
```jsx
.RandomPokemon {
  border: 1px black solid;
  width: 300px;
}

.RandomPokemon img {
  width: 150px;
}

.RandomPokemon h1 {
  color: blue;
}
```