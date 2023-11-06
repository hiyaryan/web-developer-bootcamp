# Section 67: Intermediate State Concepts

- [Setting State with an Updater Function](#setting-state-with-an-updater-function)
- [State Initializer Functions](#state-initializer-functions)
- [When Does React Re-Render?](#when-does-react-re-render)
- [Working with Objects in State](#working-with-objects-in-state)
- [Arrays in State](#arrays-in-state)
- [Generating Ids with UUID](#generating-ids-with-uuid)
- [Deleting from Arrays the React Way](#deleting-from-arrays-the-react-way)
- [Common Array Updating Patterns](#common-array-updating-patterns)
- [Updating All Elements in an Array](#updating-all-elements-in-an-array)
- [Score Keeper Exercise](#score-keeper-exercise)

## Setting State with an Updater Function
When new state depends on old state, state *should not* be updated by passing the old state variable to its set method. This is because the value does not get updated until the component is re-rendered.

Example of how to incorrectly update state with the expectation that `count` is 3 after using `addThree` but remains 1 after the component is rendered.
```jsx
const [count, setCount] = useState(0);

const addThree = () => {
    setCount(count + 1); // count = 0; count + 1 = 1
    setCount(count + 1); // count = 0 (still); count + 1 = 1 (still)
    setCount(count + 1); // count = 0 (still); count + 1 = 1 (still)
}
```

To properly update state, use a callback. Any time the set method is called, React will pass the previous calculated state from the callback to the next time it is called with the same callback 

`currentCount` starts with the value of `count` in state then passes the new calculated value to the next `currentCount`. `count` remains 0 until the component is re-rendered. 
```jsx
const [count, setCount] = useState(0);

const addThree = () => {
    setCount(currentCount => currentCount + 1); // count = 0; currentCount = 0; currentCount + 1 = 1
    setCount(currentCount => currentCount + 1); // count = 0; currentCount = 1; currentCount + 1 = 2
    setCount(currentCount => currentCount + 1); // count = 0; currentCount = 2; currentCount + 2 = 3
}
```

React batches all state changes together inside of a component then updates the actual state when re-rendered. This is to prevent every change of state in a component from constantly re-rendering the component.

## State Initializer Functions
Sometimes complex logic is used to generate the initial state instead of a single value such as `0`. To do this imply pass a callback to `useState`. Ensure that the function is not executed in `useState` or else it will continuously run and use resources.

Example passing a `generateGameBoard` callback to generate initial state with more complex logic.
Example passing a `generateGameBoard` callback to generate initial state with more complex logic.
```jsx
const [board, setBoard] = useState(generateGameBoard);
```

See `src/Dumbo.jsx` for full example.

## When Does React Re-Render?
React re-renders only when it detects a change in state.

The `makeTen` button can only be pressed once. If it's pressed again, React knows there has been no state change. It can be pressed again only when the `count` state variable is updated.
```jsx
export default function Counter() {
    const [count, setCount] = useState(0);

    const makeTen = () => {
        setCount(10);
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={makeTen}>=10</button>
        </div>
    )
}
```

See `src/Counter.jsx` for full example.

## Working with Objects in State
Objects can be used as state values. Updating an object in state is not as simple as updating a value. This will not cause a re-render because the object itself is the same regardless of any changes in its internal values. 

To trigger a re-render, React must know that the object itself has been updated. One way to do this is to use the spread operator to spread the contents of the object into a new object and update a selected field.
```jsx
const [scores, setScores] = useState({ p1Score: 0, p2Score: 0 });

const addP1Score = () => {
    setScores(oldScores => {
        return {
            ...oldScores, p1Score: oldScores.p1Score + 1
        }
    });
}
```

See `src/ScoreKeeper.jsx` for full example.

## Arrays in State
Similar to objects, arrays can trigger a component re-render only if a copy of it is passed to its setter method. To do this, a common approach is to use the spread operator and attach the new element to the end.

Adding an emoji to the end of an array on click of a button.
```jsx
export default function EmojiClicker() {
    const [emojis, setEmojis] = useState(["😀"]);

    const addEmoji = () => {
        setEmojis([...emojis, "😄"])
    }

    return (
        <div>
            {emojis.map((e) => (
                <span style={{ fontSize: "4rem" }}>{e}</span>
            ))}
            <button onClick={addEmoji}>Add Emoji</button>
        </div>
    )
}
```

## Generating Ids with UUID
Generate uuids for props with [UUID](https://www.npmjs.com/package/uuid).
```bash
$ npm i uuid
```

Setting a uuid for each emoji in an array of emojis.
```jsx
const addEmoji = () => {
    setEmojis((currentEmojis) => [...currentEmojis, { id: uuid(), emoji: "😄" }]);
}
```

## Deleting from Arrays the React Way
Delete an element from an array by filtering out the element with the matching id. To pass an argument to a callback setter function, call the function inside of a callback.

Deleting an emoji by passing its id to its setter function and filtering it out.
```jsx
const deleteEmoji = (id) => {
    setEmojis(currentEmojis => currentEmojis.filter(e => e.id !== id));
}

{emojis.map((e) => (
    <span
        key={e.id}
        onClick={() => deleteEmoji(e.id)}
        style={{ fontSize: "4rem", cursor: "pointer" }}>
        {e.emoji}
    </span>
))}
```

## Common Array Updating Patterns
State in react is updated using common array patterns. The following is a list of these patterns through a `shoppingCart` example.

A an array of shopping cart items that is to be updated using common array updating patterns used in React.
```js
const shoppingCart = [
    { id: 1, product: "HDMI Cable", price: 4 },
    { id: 2, product: "Easy Base Oven", price: 28 },
    { id: 3, product: "Peach Pie", price: 6.5 },
];
```

To add an element to an array, use the spread operator and append an element to the array.
```js
[...shoppingCart, {id : 4, product: "Coffee Mug", price: 7.99 }];
```

To remove an element from an array, use the filter method on the array.
```js
shoppingCart.filter((item) => item.id !== 2);
```

To modify a particular element in an array, use the map method and conditionals to find one matching a unique identifier.
```js
shoppingCart.map((item) => {
    if (item.id === 3) {
        return { ...item, price: 10.99 };
    } else {
        return item;
    }
});
```

See [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state) to see common state updating patterns in more depth.

## Updating All Elements in an Array
To update all elements in an array, use the map method on the array.
```js
shoppingCart.map((item) => {
    return {
        ...item,
        product: item.product.toLowerCase(),
    }
});
```

## Score Keeper Exercise
See `src/ScoreKeeper2.jsx` for an exercise on intermediate state concepts.