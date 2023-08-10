# Section 14: JavaScript Basics

Examples of JavaScript used in CodePen projects:
- [Africa Map Quiz](https://codepen.io/tinku134/pen/KKVeGMe)
- [Airplanes](https://codepen.io/ste-vg/pen/GRooLza)

Contents
- [Primitive Types](#primitive-types)
  - [Number](#number)
  - [`typeof`](#typeof)
  - [Boolean](#boolean)
  - [Variables and Naming Conventions](#variables-and-naming-conventions)
- [Variables](#variables)
  - [Increment](#increment)
  - [Const](#const)
  - [Var](#var)

## Primitive Types
- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- BigInt

[REPL (read-eval-print loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) - interactive environment used in the Chrome dev tools console that allows code to be written.

### [Number](https://udn.realityripple.com/docs/Web/JavaScript/Reference/Global_Objects/Number)
Number is a primitive wrapper object used to represent and manipulate numbers like 37 or -9.25. The Number constructor contains constants and methods for working with numbers. Values of other types can be converted to numbers using the Number() function.

```
// numbers
1
89
324.5234
-2
-2.123123123213
1.9999999999999999 // 2

// basic operations
4 + 8 
3.5 * 2
2 / 5
3 + 1 * 9 // 12
(3 + 1) * 9 // 36

// modulo
9 % 2 // 1
19 % 4 // 3

// is even or odd
217637 % 2 // 1, is odd
217636 % 2 // 0, is even

// powers
2 ** 4 // 16
9 ** 3 // 729
```

### [NaN (Not a Number)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
The NaN global property is a value representing Not-A-Number.

```
0 / 0 // NaN
1 + NaN // NaN
NaN * 3 // NaN
```

### [`typeof()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
The typeof operator returns a string indicating the type of the operand's values.

```
typeof 4 // number
typeof 4.3123245 // number
typeof NaN // number
```

`NaN` is considered a part of the number family.

### [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
The Boolean object represents a truth value: `true` or `false`.

```
let isLoggedIn = true;
let gameOver = false;
const isWaterWet = true;

let isActiveGame = true;
isActiveGame = false;

let isLoggedIn = false;
isLoggedIn = true;
```

#### Note
Variables can change types.

```
ket numPuppies = 23; // Number
numPuppies = false; // Boolean
numPuppies = 100; // Number
```

### Variables and Naming Conventions
An [identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier) is a sequence of characters in the code that identifies a variable, function, or property.

In JavaScript, identifiers are case-sensitive and can contain Unicode letters, $, _, and digits (0-9), but may not start with a digit.

An identifier differs from a string in that a string is data, while an identifier is part of the code. In JavaScript, there is no way to convert identifiers to strings, but sometimes it is possible to parse strings into identifiers.

```
// let 1user = 45; // error
let _age = 9; // ok
```

camelCase is the naming convention for JavaScript. Ensure name explains what the variable is.

```
let currentYear = 1999;
let userInputNum = 10;

let isLoggedIn = true;
let isGameOver = true;
```

## [Variables](https://developer.mozilla.org/en-US/docs/Glossary/Variable)
A variable is a named reference to a value. That way an unpredictable value can be accessed through a predetermined name.

Syntax and Basic Usage
```
// Syntax
// let someName = value;

// Make a variable called "year" and give it the value of 1985.
let year = 1985;

let numHens = 5;
let numRoosters = 1;

numHens + numRoosters // 6
numHens // 5
numRoosters // 1

let totalChickens = numHens + numRoosters;

numHens = 6;
numHens // 6

numHens = numHens + 1;
numHens // 7
```

Updating Variables
```
let score = 0;
score // 0

score = 5; // 5
score = score + 5; // 10
score = score + 5; // 15
score = score + 5; // 20

score += 5; // 25
score += 5; // 30

score -= 50; // -20
score *= 2; // -40
score /= 2; // -20

// Shorthand increment/decrement
let numLives = 9;
numLives -= 1; // 8
numLives--; // 7
numLives--; // 6
numLives++; // 7
numLives++; // 8
```

### [Increment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)
The increment (++) operator increments (adds one to) its operand and returns the value before or after the increment, depending on where the operator is placed.

```
i++ // returns i then increments
++i // increments i then returns i
```

### [Const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
The const declaration declares block-scoped local variables. The value of a constant can't be changed through reassignment using the assignment operator, but if a constant is an object, its properties can be added, updated, or removed.

```
const hens = 4;
hens = 20; // Error

const age = 17;
age = age + 1; // Error

// commonly used for mathematical constants
var feetInMile = 5280; 
```

### [Var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
The `var` statement declares function-scoped or globally-scoped variables, optionally initializing each to a value.

`var` is an old variable declaration keyword used before `let` and `const`. 
```
var runDistance = 26.2;
runDistance // 26.2

runDistance += 1 // 27.2
```

