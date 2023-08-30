# Section 22: Callbacks and Array Methods

- [`forEach`](#foreach)
- [`map`](#map)
- [Arrow Functions](#arrow-functions)
  - [Implicit Returns](#implicit-returns)
  - [Arrow Functions and `this`](#arrow-functions-and-this)
- [`setTimeout` & `setInterval`](#settimeout--setinterval)
- [`filter`](#filter)
- [`some` & `every`](#some--every)
- [`reduce`](#reduce)

## [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
`forEach` accepts a callback function then calls the function once per element in the array.

```
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];

nums.forEach(function (n) {
    console.log(n * n); // 81, 64, 49, 36, 25, 16, 9, 4, 1
});

nums.forEach(function (el) {
    if (el % 2 === 0) {
        console.log(el); // [8, 6, 4, 2] 
    }
});
```

## [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
`map` creates a new array with the results of calling a callback on every element in the array.

```
const texts = ["rofl", "lol", "omg", "ttyl"];
const caps = texts.map(function (t) {
    return t.toUpperCase();
});

texts // ["rofl", "lol", "omg", "ttyl"]
caps // ['ROFL', 'LOL', 'OMG', 'TTYL']
```

## [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
Arrow functions are a syntactically compact alternative to a regular function expression.

```
const square = (x) => {
    return x * x;
}

const sum = (x, y) => {
    return x + y;
}

// parenthesis are optional if there is only one parameter
const cube = x => {
    return x ** 3
}

// use empty parenthesis for functions with no parameters
const singASong = () => {
    return "LALALALALALA"
}
```

### Implicit Returns
Arrow functions return a value without using the `return` keyword. The body of these functions are wrapped in parenthesis if on multiple lines or no parenthesis for one-liners. 

All of these functions do the same thing.
```
const isEven = function (num) { // regular function expression
    return num % 2 === 0;
}

const isEven = (num) => { // arrow function with parenthesis around parameter
    return num % 2 === 0;
}

const isEven = num => { // arrow function with no parenthesis around parameter
    return num % 2 === 0;
}

const isEven = num => ( // implicit return
    num % 2 === 0;
);

const isEven = num => num % 2 === 0; // one-liner implicit return
```

Implicit returns only work on single expressions.

```
const rollDieImplicit = () => (
    let msg = "ASDSA"; // SyntaxError: Unexpected identifier
    Math.floor(Math.random() * 6) + 1
);
```

Note: Arrow functions are often used for functions that accept another function as a parameter.

```
const newMovies = movies.map(movie => (
    `${movie.title} - ${movie.score / 10}`
))
```

### Arrow Functions and `this`
`this` behaves very differently inside of an arrow function. While `this` in a regular function refers to the object it is called in, `this` in an arrow function refers to the `window` object.

See example in ArrowFunctions folder.

In [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), `this` retains the value of the enclosing lexical context's `this`. In other words, when evaluating an arrow function's body, the language does not create a new `this` binding.

See **Arrow functions** section in [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) documentation for more information.

## [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) & [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

`setTimeout` is a global method that sets a timer which executes a function or specified piece of code once the timer expires. 

`setInterval` is a method, offered on the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) interfaces, that repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.

This method returns an interval ID which uniquely identifies the interval, so you can remove it later by calling `clearInterval()`. 

## [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
`filter` is an Array method that creates a new array with all elements that pass the test implemented by the provided function.

```
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];

const odds = nums.filter(n => n % 2 === 1); // if true, returns odd number to filtered array

const smallNums = nums.filter(n => n < 5); // [4, 3, 2, 1] // returns all numbers less than 5
```

## [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) & [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

The `some()` method of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array. 

`some` returns `true` if any of the array elements pass the test function.
```
const words = ["dog", "jello", "log", "cupcake", "bag", "wag"];

// Are there words longer than 4 characters?
words.some(word) => {
    return word.length > 4;
} // true

// Do any words start with a 'Z'?
words.some(word => word[0] === 'Z') // false

// Do any words contain "cake"?
words.some(w => w.includes("cake")) // true
```

The `every()` method of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. 

`every` tests whether all elements in the array pass the provided function returning a boolean value.
```
const words = ["dog", "dig", "log", "bag", "wag"];

words.every(word => {
    return word.length === 3;
}) // true

words.every(word => word[0] === 'd') // false

words.every(w => {
    let lastLetter = w[w.length - 1];
    return lastLetter === 'g';
}); // true
```

## [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
`reduce` executes a reducer function on each element of the array resulting in a single value. Condenses an array to a single value.

Summing an array
```
[3, 5, 7, 9, 11].reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
});
```

Walking through each iteration
- first call: accumulator: 3, currentValue: 5, return value: 8
- second call: accumulator: 8, currentValue: 7, return value: 15
- first call: accumulator: 15, currentValue: 9, return value: 24
- first call: accumulator: 24, currentValue: 11, return value: 35