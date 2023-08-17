# Section 16: JavaScript Decision Making

- [Comparison Operators](#comparison-operators)
- [Equality](#equality)
- [Console, Alert, & Prompt](#console-alert--prompt)
- [Running JavaScript From a Script](#running-javascript-from-a-script)
- [`if` Statements](#running-javascript-from-a-script)
- [`else if`](#else-if)
- [`else`](#else)
- [Nesting Conditionals](#nesting-conditionals)
- [Truth-y & False-y Values](#truth-y--false-y-values)
- [Logical `AND`](#logical-and)
- [Logical `OR`](#logical-or)
- [Logical `NOT`](#logical-not)
- [The `switch` Statement](#the-switch-statement)

## [Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators)
- `>` - greater than
- `<` - less than
- `>=` - greater than or equal to
- `<=` - less than or equal to
- `==` - equality
- `!=` - not equal
- `===` - strict equality
- `!==` - strict non-equality

## [Equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators)
- `==` (double equals)
  - Checks for equality of value, but not equality of type.
  - Coerces both values to the same type and then compares them.
  - May lead to some unexpected results.
  - `!=` (double not equals)
```
5 == 5; // true
1 == 2; // false

2 == '2' // true
false == 0; // true

10 != '10' // false
```

- `===` (triple equals)
  - Checks for equality of value and type.
  - `!==` (triple not equals)
```
5 === 5; // true
1 === 2; // false

2 === '2' // false
false === 0; // false

10 !== '10' // true
```

## Console, Alert, & Prompt
### [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

The `console.log()` method outputs a message to the web console. The message may be a single string (with optional substitution values), or it may be any one or more JavaScript objects. 

### [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
`window.alert()` instructs the browser to display a dialog with an optional message, and to wait until the user dismisses the dialog.

Under some conditions — for example, when the user switches tabs — the browser may not actually display a dialog, or may not wait for the user to dismiss the dialog.

```
alert("HI THERE!");
```

### [`prompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
`window.prompt()` instructs the browser to display a dialog with an optional message prompting the user to input some text, and to wait until the user either submits the text or cancels the dialog.

Under some conditions — for example, when the user switches tabs — the browser may not actually display a dialog, or may not wait for the user to submit text or to cancel the dialog.

```
let userInput = prompt("please enter a number");

parseInt(userInput) // returns input as an integer
```

## Running JavaScript From a Script
Import `.js` file into `.html` file. Use the `<script>` tag to import the file. The `<script>` tag can be placed into either the `head` or `body`, but since JS interacts with HTML elements, it is generally placed in the `body`.

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Demo</title>
    <!-- <script src="app.js"></script> -->
</head>
<body>

    <!-- place script at end of body -->
    <script src="app.js"></script>
</body>
</html>
```

## [`if` Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
Only runs code `if` a given condition is true.

```
let rating = 3;

if (rating === 3) {
    console.log("You are a superstar!");
}
```

## `else if`
Only runs code if the condition is true and the previous condition is false.

```
let rating = 2;

if (rating === 3) {
    console.log("You are a superstar!");
}
else if (rating === 2) {
    console.log("Meets expectations.");
} 
else if (rating === 1) {
    console.log("Needs improvement.")
}
```

## `else`
Only runs code if all other conditions are false.

```
let rating = -99;

if (rating === 3) {
    console.log("You are a superstar!");
}
else if (rating === 2) {
    console.log("Meets expectations.");
} 
else if (rating === 1) {
    console.log("Needs improvement.")
}
else {
    console.log("Invalid rating!.")
}
```

## Nesting Conditionals
```
let password = "cat dog";

if (password.length >= 6) {
    if (password.indexOf(' ') !== -1) {
        console.log("Password cannot include spaces");
    } else {
        console.log("Valid password.");
    }
} else {
    console.log("Password too short!");
}
```

## Truth-y & False-y Values
- All JS values hae an inherent truthyness or falsyness about them.
- Falsy values:
  - `false`
  - `0`
  - `""` - empty string
  - `null`
  - `undefined`
  - `NaN`
- Everything else if truthy!

## [Logical `AND`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
Both sides must be true for the entire thing to be true.

```
1 <= 4 && 'a' === 'a'; // true

9 > 10 && 9 >= 9; // false

'abc'.length === 3 && 1+1 === 4; // false
```

## [Logical `OR`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)
If one side is true, the entire thing is true.

```
1 !== 1 || 10 === 10 // true

10/2 === 5 || null // true

0 || undefined // false
```

## [Logical `NOT`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)
!expression returns true if expression is false.

```
!null // true

!(0 === 0) // false

!(3 <= 4) // false
```

## The [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) Statement
The `switch` statement is another control-flow statement that can replace multiple `if` statements.

```
const day = 2;

switch (day) {
    case 1:
        console.log("MONDAY!");
        break;
    case 2:
        console.log("TUESDAY!");
        break;
    case 3:
        console.log("WEDNESDAY!");
        break;
    case 4:
        console.log("THURSDAY!");
        break;
    case 5:
        console.log("FRIDAY!");
        break;
    default:
        console.log("INVALID NUMBER!")
}
```