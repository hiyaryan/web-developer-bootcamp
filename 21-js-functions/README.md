# Section 21: Functions

- [Function Scope](#function-scope)
- [Block Scope](#block-scope)
- [Lexical Scope](#lexical-scope)
- [Function Expressions](#function-expressions)
- [Higher Order Functions](#higher-order-functions)
- [Returning Functions](#returning-functions)
- [Defining Methods](#defining-methods)
- [The Keyword `this`](#the-keyword-this)
- [`try...catch`](#trycatch)

## Function Scope
Function scope describes variable "visibility". The location where a variable is defined dictates where we have access to that variable.

`msg` is scoped to the `helpMe` function
```
function helpMe() {
    let msg = "I'm on fire!";

    msg // "I'm on fire!"
}

msg // NOT DEFINED
```

`bird` is scoped to the `birdWatch` function
```
let bird = "mandarin duck";

function birdWatch() {
    let bird = "golden pheasant";
    bird // "golden pheasant"
}

bird; // "mandarin duck"
```

## Block Scope
`let` and `const` keywords narrow the scope of variables to a block of code surrounded by curly braces. `var` keyword broadens the scope of variables to the namespace.

`PI` and `circ` are scoped to the block
```
let radius = 8;

if (radius > 0) {
    const PI = 3.14;
    let circ = 2 * PI * radius;
}

console.log(radius) // 8
console.log(PI)) // undefined
console.log(circ) // undefined
```

`PI` and `circ` are scoped to the namespace
```
let radius = 8;

if (radius > 0) {
    var PI = 3.14;
    var circ = 2 * PI * radius;
}

console.log(radius) // 8
console.log(PI)) // 3.14
console.log(circ) // 50.24
```

## Lexical Scope
Obtaining visibility to some of the variables of a child function through the parent function. 

```
function outer() {
    let hero = "Black Panther";

    function inner() {
        let cryForHelp = `${hero}`, please save me!;
        console.log(cryForHelp);
    }

    inner();
}
```

## Function Expressions
Functions are values that can be stored and passed around. A function expression is a function assigned to a variable.

```
const square = function (num) {
    return num * num;
}

square(7); // 49
```

## Higher Order Functions
Higher order functions are functions that operate on or with other functions. They can,
- Accept other functions as arguments
- Return a function

### Accepting Functions as an Argument
Functions can be passed to functions and called within its scope.

```
function callTwice(func) {
    func();
    func();
}

function laugh() {
    console.log("HAHAHAHAHAHAHAHAHAHAHAHHAHA")
}

callTwice(laugh) // pass a function as an arg
// "HAHAHAHAHAHAHAHAHAHAHAHHAHA"
// "HAHAHAHAHAHAHAHAHAHAHAHHAHA"
```

### Returning Functions
Functions can return other functions. Factory functions are functions that return a new function based on arguments defined before it is returned.

```
function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}
```

## Defining Methods
Functions added as properties on objects are called methods. Note that all methods are functions but not all functions are methods.


```
const math = {
    multiply: function(x, y) {
        return x * y;
    },
    divide: function(x, y) {
        return x / y;
    },
    square: function(x) {
        return x * x;
    },
};
```

Example of a string method
```
"hello".toUpperCase()
```

Example of an array method
```
[1,2,3].indexOf(2)
```

Contrasted by a function
```
function add(x, y) {return x + y;}
```

Access methods using dot notation or bracket notation
```
math.multiply(3, 4); // 12

math["square"](4); // 16
```

Shorthand Method Notation
```
const math = {
    blah: "Hi!",
    // create a method with using the keyword `function`.
    add(x, y) {
        return x + y;
    },
    multiply(x, y) {
        return x * y;
    },
};

math.add(50, 60) // 110 
```

## The Keyword [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
`this` gives you access to other properties on the same object.

```
const person = {
    first: 'Robert',
    last: 'Herjavec',
    fullName() {
        return `${this.first} ${this.last}`,
    }
}

person.fullName() // "Robert Herjavec"
person.last = "Plant"
person.fullName(); // "Robert Plant"
```

The value of `this` depends on the invocation context of the function it is used in. `this` refers to the object it is invoked in.
- If `this` is invoked in an object called `cat`, the `cat` object's properties will be exposed.
- If `this` is invoked on the top layer, the `window` object's properties will be exposed.
  - Note that every object on the top layer can be invoked with `window.object`.

## [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
The `try...catch` statement is comprised of a try block and either a catch block, a finally block, or both. The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed. The code in the finally block will always be executed before control flow exits the entire construct.

```
try {
    nonExistentFunction();

} catch (error) {
    console.error(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
}
```