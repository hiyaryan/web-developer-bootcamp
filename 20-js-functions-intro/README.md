# Section 20: Introducing Functions

- [Intro to Functions](#intro-to-functions)
  - [First Function](#first-function)
- [Arguments](#arguments)
  - [Multiple Arguments](#mutiple-arguments)
- [`return` Keyword](#return-keyword)

## Intro to [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
Functions are reusable procedures.
- They allow us to write reusable, modular code.
- A "chunk" of code is code that can be reused at a later point.

Before functions
```
let die1 = Math.floor(Math.random() * 6) + 1;
let die2 = Math.floor(Math.random() * 6) + 1;
let die3 = Math.floor(Math.random() * 6) + 1;
let die4 = Math.floor(Math.random() * 6) + 1;
let die5 = Math.floor(Math.random() * 6) + 1;
let die6 = Math.floor(Math.random() * 6) + 1;
```

After functions
```
let die1 = rollDie();
let die2 = rollDie();
let die3 = rollDie();
let die4 = rollDie();
let die5 = rollDie();
let die6 = rollDie();
```

### First Function
Using functions is a two step process:
1. Define the function
2. Run (or call) the functions

Syntax
```
function funcName() {
    // do something
}
```

Example
```
function grumpus() {
    console.log('ugh...you again...');
    console.log('for the last time...');
    console.log('LEAVE ME ALONE!!!');
}
```

## [Arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
Arguments are inputs to a function.

```
// `person` is the argument
function greet(person) {
    console.log(`Hi, ${person}!`);
}

// `Elvis` is the argument.
greet('Elvis');
```

### Mutiple Arguments
Provide functions multiple parameters to pass multiple arguments.

```
function findLargest(x, y) {
    if (x > y) {
        console.log(`${x} is larger!`);

    } else if (x < y) {
        console.log(`${y} is larger!`);

    } else {
        console.log(`${x} and ${y} are equal!`);
    }
}

findLargest(-2, 77); // "77 is larger!"
findLargest(33, 33); // "33 and 33 are equal"
```

## [`return`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) Keyword
Built-in methods return values when called which can be stored in a variable.

```
const yell = "I will end you.".toUpperCase();
yell // "I WILL END YOU"

const idx = ['a', 'b', 'c'].indexOf('c');
idx // 2
```

A function with no `return` statement only prints the value to the console and returns `undefined`.
```
function add(x, y) {
    console.log(x + y);
}

const sum = add(10, 16);
sum; // undefined
```

The `return` statement allows values to be captured in a variable.
```
function add(x, y) {
    return x + y; // RETURN!
}

const sum = add(10, 16);
sum // 26

const answer = add(100 ,200)
answer // 300
```

The `return` statement ends function execution and specifies the value to be returned by that function.