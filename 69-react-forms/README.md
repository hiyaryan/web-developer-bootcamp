# Section 69: React Forms

- [Controlled Components](#controlled-components)
  - [Forms](#forms)
- [The `htmlFor` Property](#the-htmlfor-property)
- [Working with Multiple Inputs](#working-with-multiple-inputs)
- [A Better Signup Form](#a-better-signup-form)
- [Computed Property Names in `handleChange()`](#computed-property-names-in-handlechange)
- [Creating a Shopping List Form](#creating-a-shopping-list-form)
- [Shopping List Component](#shopping-list-component)
  - [Passing Data Up to a Parent Component](#passing-data-up-to-a-parent-component)
- [Form Validation From Scratch](#form-validation-from-scratch)
- [Validations using React Hook Form](#validations-using-react-hook-form)
  - [Apply validation](#apply-validation)

## Controlled Components
### Forms
HTML form elements work differently than other DOM elements in React. 
- Form elements naturally keep some internal state.

```jsx
<form>
    Full Name:
    <input name="fullname" />
    <button>Add!<button/>
</form>
```

Generally, it is convenient to have a JS function that
- Handles the submission of the form
- Has access to the data the user entered.

The technique to achieve this is by using `input` elements as *controlled components*.
- Make React state be the "single source of truth".
- React controls
  - What is *shown* (the value of the component)
  - What happens when the user types (this gets kept in state)

The `onChange` method links the value typed in the input with the value in the state and can be extracted form the event object `event.target.value`.
```jsx
import { useState } from "react";

export default function UsernameForm() {
    const [username, setUsername] = useState("");

    const updateUsername = (evt) => {
        setUsername(evt.target.value);
    }

    return (
        <div>
            <input onChange={updateUsername} type="text" placeholder="username" value={username} />
            <button>Submit</button>
        </div>
    )
}
```

## The `htmlFor` Property
Good accessibility practice puts `<label>` elements in forms.
```jsx
<form>
    <label for="fullname-input">Full Name:</label>
    <input id="fullname-input" name="fullname" />
    <button>Add!</button>
</form>
```

To add a label in React, use the `htmlFor` property and match it with the `<input>` element's `id`.
```jsx
<div>
    <label htmlFor="username">Username</label>
    <input onChange={updateUsername} type="text" placeholder="username" value={username} id="username" />
    <button>Submit</button>
</div>
```

`for` is a reserved word in JavaScript, just like `class`, so in a similar manner to `className`, `htmlFor` is used for labeling `<input>` in React.

## Working with Multiple Inputs
One way of making a form with multiple input is to to create state for each of the input fields.

A form that accepts a first and last name as input.
```jsx
import { useState } from "react";

export default function SignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const updateFirstName = (evt) => {
        setFirstName(evt.target.value);
    }

    const updateLastName = (evt) => {
        setLastName(evt.target.value);
    }

    const handleSubmit = () => {
        console.log(`Hi, ${ firstName } ${ lastName }!`);
    }

    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input onChange={updateFirstName} type="text" placeholder="first name" value={firstName} id="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input onChange={updateLastName} type="text" placeholder="last name" value={lastName} id="lastName" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
```

## A Better Signup Form
Instead of using multiple state variables for each input, a better approach would be to use an object to handle multiple input. With this approach there would be one piece of state as an object whose fields would be reflected on change.

To handle multiple controlled inputs:
- Instead of making a separate `onChange` handler for every single input, make one generic function for multiple inputs.
- Add HTML `name` attribute to each JSX input element.
- Then the handler function can determine the key in state to update based on `event.target.name`.
  - Using this method, the keys in the state must match the input `name` attributes.

Updating state using an object and spreading the data captured in the event object into the state.
```jsx
import { useState } from "react";

export default function SignupForm2() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", password: "" });

    const handleChange = (evt) => {
        setFormData(currentData => {
            currentData[evt.target.name] = evt.target.value;
            return { ...currentData }
        });
    }

    const handleSubmit = () => {
        console.log(`Hi, ${ formData.firstName } ${ formData.lastName }!`);
    }

    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input onChange={handleChange} type="text" placeholder="first name" value={formData.firstName} id="firstName" name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input onChange={handleChange} type="text" placeholder="last name" value={formData.lastName} id="lastName" name="lastName" />

            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" placeholder="password" value={formData.password} id="password" name="password" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
```

## Computed Property Names in `handleChange()`
Recall in JavaScript that a new key-value pair can be added to an object using square bracket notation.
```jsx
const mystery = "chicken";
const obj = { a: 1, blue: 4 };

obj[mystery] = "eggs";
obj // returns { a: 1, blue: 4, chicken: 'eggs'}

// this also equivalent to setting a new key-value pair
const obj2 = {[mystery]: "blah"};
obj2 // return { chicken: 'blah' }
```

The `updateFormData` callback in the example from the [previous section](#a-better-signup-form) can be refactored as follows.
```jsx
const updateFormData = (evt) => {
    setFormData(currentData => {
        return {
            ...currentData,
            [evt.target.name]: evt.target.value
        }
    });
}
```

## Creating a Shopping List Form
A shopping list can be composed of two components.
- Parent: *ShoppingList* (manages a list of shopping items)
  - State: { product: string, quantity: number } (one input per state variable)
- Child: *ShoppingListForm* (form to add a new item to the list)

## Shopping List Component
See `src/ShoppingListForm.jsx` and `src/ShoppingList.jsx`.

The `ShoppingList` contains the `ShoppingListForm`. When the `ShoppingListForm` is submitted, `ShoppingList` should display the new item on the list. This can be done by passing the `ShoppingList` state to `ShoppingListForm` so that `ShoppingListForm` may add the new item to it.

Note
- Ensure to use `event.preventDefault()` on a forms `onSubmit` callback to prevent the forms default automatic re-routing. 

### Passing Data Up to a Parent Component
In React, we generally have downward data flow-a "smart" parent component with "simpler" child components.
- It's common for *form* components (the child component) to manage their own state.
- Smarter parent components usually have a `doSomethingOnSubmit` method to update its state after the form submission.
  - The parent passes its `doSomethingOnSubmit` method as a prop to its child form.
  - The form component (child component) then calls this method and updates the parent's state.
  - The child is "dumber"-all it knows is to invoke that function with its data.

## Form Validation From Scratch
See `src/ValidatedShoppingListForm.jsx` for full example on form validation for the shopping list form.

Currently shopping list has no validations allowing `null` items to be added to the list and invalid quantities. Form validations can be used to prevent this. The `ValidatedShoppingListForm` demos validation for only the product name.

To validate form data, use state for each input that contains a boolean value such as `productIsValid`.
```jsx
const [productIsValid, setProductIsValid] = useState(false);
```

Then check if the input is valid when a change event occurs.
```jsx
const handleChange = (evt) => {
    if (evt.target.name === "product") {
        evt.target.value.length !== 0 ? setProductIsValid(true) : setProductIsValid(false);
    }

    setFormData(currentData => {
        return {
            ...currentData,
            [evt.target.name]: evt.target.value,
        }
    })
}
```

Note
- In general, for larger apps, use objects for state similar to the example in the previous section [A Better Signup Form](#a-better-signup-form).

## Validations using React Hook Form
[React Hook Form](https://react-hook-form.com/) (RHF) is a third-party library that offers performant, flexible and extensible forms with easy-to-use validation.

Install React Hook Form using npm.
```bash
$ npm install react-hook-form
```

See [Quick start](https://react-hook-form.com/get-started#Quickstart) in the RHF docs to get started and `src/FormValidation.jsx` for a full example demoing validation using RHF on text, email, password, and number input fields.

### Apply validation
React Hook Form makes form validation easy by aligning with the existing [HTML standard for form validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation).

List of validation rules supported:
- required
- min
- max
- minLength
- maxLength
- pattern
- validate

Read more on each rule in the [register section](https://react-hook-form.com/docs#register) of the docs.

See also another option for form validations using [Formik](https://formik.org/docs/overview).