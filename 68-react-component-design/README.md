# Section 68: Component Design

- [The Lucky7 Game](#the-lucky7-game)
- [Formulating a Component Game Plan](#formulating-a-component-game-plan)
  - [Lucky7 Requirements](#lucky7-requirements)
  - [State Design Principle](#state-design-principle)
  - [Decoupling Logic from Presentation](#decoupling-logic-from-presentation)
- [Building Die and Dice Components](#building-die-and-dice-components)
  - [Die Component](#die-component)
  - [Dice Component](#dice-component)
- [The LuckyN Component](#the-luckyn-component)
- [State as Props](#state-as-props)
- [Passing Functions as Props](#passing-functions-as-props)
- [Passing Functions that Update State](#passing-functions-that-update-state)
  - [Data Flow](#data-flow)
- [Practice Passing State Updating Function](#practice-passing-state-updating-function)

## The Lucky7 Game
Lucky7 is a dice game where you win by rolling at 7.

Objectives of the Lucky7 Game.
- Understand strategies for "component decomposition"
- Practice designing a React app
- Learn how to pass functions between components

Given Lucky7 component.
```jsx
import { useState } from "react";
import { getRolls, sum } from "./utils";
import "./Lucky7.css";

export default function Lucky7() {
    const [dice, setDice] = useState(getRolls(2));
    const won = sum(dice) === 7;

    const roll = () => {
        setDice(getRolls(2));
    }

    return (
        <main className="Lucky7">
            <h1>Lucky7 {won && "You win!"}</h1>
            <section className="Lucky7-dice">
                <div className="Lucky7-die">{dice[0]}</div>
                <div className="Lucky7-die">{dice[1]}</div>
            </section>
            <button onClick={roll}>Roll Again!</button>
        </main>
    )
}
```

The Lucky7 component can be [improved](#formulating-a-component-game-plan). Currently it is,
- Doing a lot.
- It's inflexible
  - It always rolls 2 dice
  - It always wins on 7
- there are no reuseable parts
  - Showing a set of dice
  - Showing an individual die 

## Formulating a Component Game Plan
### Lucky7 Requirements
There should be a set of components that
- Allows a game to be played with a chosen number of dice
- Shows a win message when the total is equal to some chosen sum
- A "roll again" button that re-rolls all the dice

Currently the component hierarchy is as follows.

- App
  - LuckyN
    - Dice
      - Die
      - Die
      - ...

### State Design Principle
To decide where state should live in the component hierarchy, follow this state design principle.

    Lift state as high as needed-but no higher.

Where should the dice-rolls state live?
- Not in App: not needed, shouldn't lift it
- **In LuckyN**: this is the game itself
- Not in Dice: should just be about showing a hand
- Not in Die: need to know roll total, not just for one

### Decoupling Logic from Presentation
There are generally two types of components you will create in a React app, presentational and logical. Generally have components be one of two of them.

#### Presentational Type
Presentational components (also, "dumb" components) do not have state. It is primarily about appearance/UI.

In the Lucky7 game the `App`, `Dice`, and `Die` components are presentational components.

#### Logical Type
Logical components do have state or related logic. It is *not* about a appearance/UI.

In the Lucky7 game the `LuckyN` component is the logical components.

## Building Die and Dice Components
### Die Component
- Props: `val`: number
- State: none
- Events: none

The `Die` component is a presentation component that represents a single die.
```jsx
export default function Die({ val }) {
    return (
        <div className="Die">
            { val }
        </div>
    );
}
```

### Dice Component
- Props: `dice`: [n, ...]
- State: none
- Events: none

The `Dice` component is a presentation component that represents a set of dice or a hand.
```jsx
export default function Dice({ dice }) {
    return (
        <section className="Dice">
            {dice.map((v, i) =>
                <Die key={i} val={v} />
            )}
        </section>
    );
}
```

## The LuckyN Component
- Props:
  - `numDice`: number
  - `goal`: number
- State: `dice`: [n, ...]
- Events: `roll()`

The `LuckyN` component is the logic component that contains the game logic.
```jsx
import { useState } from "react";
import { getRolls, sum } from "./utils";
import Dice from "./Dice";

export default function LuckyN({ numDice = 2, goal = 7 }) {
    const [dice, setDice] = useState(getRolls(numDice));
    const isWinner = sum(dice) === goal;

    const roll = () => setDice(getRolls(numDice));

    return (
        <main className="LuckyN">
            <h1>Lucky{goal} {isWinner && "You win!"}</h1>
            <Dice dice={dice} />
            <button onClick={roll}>Re-Roll Dice</button>
        </main>
    )
}
```

## State as Props
In general, state defined in a component is used in that component. However, passing states down as props is also a very common pattern in React.

In the `LuckyN` game, the state is passed down from `LuckyN` to `Dice`, then from `Dice` to each individual `Die`.

## Passing Functions as Props
A good design principle is to minimize the logic in presentational components. Utility functions such at those in `src/util.js` can be imported into and used in any component.

Currently `LuckyN` takes `numDice` and `goal` but what if we wanted a different game such as one where you had to roll less than a number? The logic for winning in this component is,
```jsx
const won = sum(dice) === goal;
```

To make this component more flexible and expand the game, you can pass a function as a prop.
- In JavaScript, functions are first-class objects—they can be passed around.
- A `winCheck(dice)` function can be passed to the `LuckyN` game to check for a variety of win types.

Example of a `lessThan4` win type set using `winCheck`.
```jsx
function lessThan4(dice) {
    return sum(dice) < 4;
}

<LuckyN numDice={3} winCheck={lessThan4} />
```

Updated version of `LuckyN` with `winCheck`.
```jsx
function LuckyN({numDice, winCheck}) {
    const [dice, setDice] = useState(getRolls(numDice));
    const won = winCheck(dice);

    // ...
}
```

Now the `LuckyN` component is about the *view* of the app and can take configurable logic.

## Passing Functions that Update State
References to a state setter can be passed as props. This provides a method (or anti-pattern) that can be used to propagate a value upward to the parent component from the child component where it can be used in other child components of the parent.

Example creating a generic `Button` component that can be used throughout the app that accepts two props. some text and a click function.
```jsx
import "./Button.css"

export default function Button({ label = "Click Me!", onClick }) {
    return (
        <button onClick={onClick} className="Button">
            {label}
        </button>
    )
}
```

Using the `Button` component in the `LuckyN` game and passing the prop setter function as a reference in `LuckyN` to the `Button` to update the dice.
```jsx
export default function LuckyN({ title = "Dice Game", numDice = 2, winCheck }) {
    const [dice, setDice] = useState(getRolls(numDice));
    const isWinner = winCheck(dice);

    const roll = () => setDice(getRolls(numDice));

    return (
        <main className="LuckyN">
            <h1>{title} {isWinner && "You win!"}</h1>
            <Dice dice={dice} />
            <Button label={"Roll Dice"} onClick={roll} />
        </main>
    )
}
```

### Data Flow
How data flows between the `LuckyN` and the `Button` is a common pattern in React. The flow is as follows,
- A parent component defines a function
- The function is passed as a prop to a child component
- The child component invokes the prop function
- The parent function is called, usually setting new state
- The parent component is re-rendered along with its children.

## Practice Passing State Updating Function
See `src/Box.jsx` and `src/BoxGrid.jsx` for another example of passing a state setter from a parent component and updating the state in its child component.