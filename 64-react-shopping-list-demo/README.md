# Section 64: Shopping List Project: `keys`, prop types, and more

- [Creating a Shopping List Component](#creating-a-shopping-list-component)
- [The Key Prop](#the-key-prop)
- [The Shopping List Item Component](#the-shopping-list-item-component)
- [Rental Property Exercise](#rental-property-exercise)
- [Configuring ESLint](#configuring-eslint)
- [PropTypes Library Crash Course](#proptypes-library-crash-course)

## Creating a Shopping List Component
See `src/ShoppingList.jsx` for a shopping list component that displays a list of grocery items.

## The Key Prop
`key` props assign a unique identifier to each element in a list. Without `key` the following Warning will result.

    Warning: Each child in a list should have a unique "key" prop.

In order to resolve this, assign the unique id associated with each item in the list to `key`. This could be an actual id, such as one from MongoDB `_id`, or the index of an element.

Assigning the list item `li.id` from each item in `items` to the `key` property.
```jsx
export default function ShoppingList({ items }) {
    return (
        <ul>
            {items.map(li => (
                <li key={li.id} style={li.completed ? {
                    color: "gray",
                    textDecoration: "line-through"
                } : null}>
                    {li.qty}x {li.item}
                </li>
            ))}
        </ul>
    )
}
```

## The Shopping List Item Component
See `src/ShoppingListItem.jsx` for a shopping list item component that displays a single grocery list item. Items grayed out with a strike through are completed. 

See also, `src/ShoppingList.jsx` for a component that uses the `ShoppingListItem` component.

## Rental Property Exercise
See `PropertyList{.jsx/.css}` and `Property.jsx` for react exercise mapping over an array of data. 

## Configuring ESLint
[ESLint](https://eslint.org/) comes pre-configured with every Vite server. It finds and fixes problems in your JavaScript code. 

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline. 

The ESLint configuration file `.eslintrc.cjs` is located on the top level of the app. It is where you can define or disable specific linting rules.

Example turning `off` rule for `prop-type` enforcement in `rules` object of `.eslintrc.cjs` file.
```cjs
rules: {
'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
],
'react/prop-types': 'off',
},
```

## PropTypes Library Crash Course
PropTypes are not commonly used but ESLint will raise validation error.

    '{prop}' is missing in props validationeslintreact/prop-types

This means that ESLint is expecting each prop to be validated with a data type, e.g. String, Number, etc. TypeScript is generally used in place of JavaScript for projects that enforce types.

To resolve this issue in JavaScript requires a package [`prop-types`](https://www.npmjs.com/package/prop-types) that comes installed with every React app created using Vite.

Example setting prop types on a `ShoppingListItem` component.
```jsx
import PropTypes from 'prop-types';

export default function ShoppingListItem({ item, qty, completed }) {
    const style =
        completed ?
            {
                color: "gray",
                textDecoration: "line-through"
            } : null;

    return (
        <>
            <li style={style}>{item} - {qty}</li>
        </>
    )
}

ShoppingListItem.propTypes = {
    item: PropTypes.string,
    qty: PropTypes.number,
    completed: PropTypes.bool
}
```

Now if a String is passed to `qty`, for instance, the application will not crash but the following warning will be returned.

    Warning: Failed prop type: Invalid prop `qty` of type `string` supplied to `ShoppingListItem`, expected `number`.