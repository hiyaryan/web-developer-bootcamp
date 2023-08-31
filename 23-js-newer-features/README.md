# Section 23: Newer JavaScript Features

- [Default Params](#default-params)
- [Spread](#spread)
  - [In Function Calls](#in-function-calls)
  - [With Array Literals](#with-array-literals)
  - [With Objects](#with-objects)
- [Rest Params](#rest-params)
- [Destructuring](#destructuring)
  - [Arrays](#arrays)
  - [Objects](#objects)
  - [Params](#params)

## [Default Params](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
To ensure that an argument is valid, the function should check it. If it is not, then it should assign a default value.

```
function multiply(a, b) {
    b = typeof b !== 'undefined' ? b : 1;
    return a * b
}

multiply(7) // 7
multiply(7, 3) // 21
```

JavaScript provides the ability to provide a default value in the function signature.

```
function multiply(a, b = 1) {
    return a * b
}

multiply(4); // 4
multiply(4, 5); // 20
```

Always have the default parameter come last in the function signature. This ensures that the required parameters are defined.

## [Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
The `spread (...)` syntax allows an iterable, such as an array or string, to be **expanded** in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.

### In Function Calls
Expand an iterable (array, string, etc.) into a list of arguments.

```
const nums = [9, 3, 2, 8];
Math.max(nums); // NaN

// Use spread
Math.max(...nums); // 9

// Same as
Math.max(9, 3, 2, 8); // 9
```

### With Array Literals
Create a new array using an existing array. Spreads the elements from one array into a new array.

```
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

[...nums1, ...nums2] // [1, 2, 3, 4, 5, 6]

['a', 'b', ...nums2] // ["a", "b", 4, 5, 6]

[...nums1, ...nums2, 7, 8, 9] // // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### With Objects
Copies properties from one object into another object literal. If the same key is found, the value of the last key is used.

```
const feline = { legs: 4, family: "Felidae" };
const canine = { family: "Caninae", furry: true };

// { family: "Caninae", furry: true, isPet: true }
const dog = { ...canine, isPet: true };

// { legs: 4, family: "Felidae", genus: "Panthera" }
const lion = { ...feline, genus: "Panthera" };

// { legs: 4, family: "Caninae", furry: true }
const catDog = { ...feline, ...canine };
```

## [Rest Params](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
The **rest parameter** syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent [variadic functions](https://en.wikipedia.org/wiki/Variadic_function) in JavaScript.

The [arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) is available inside every function and is an **array-like* object, having a length property but does not have array methods like `push`/`pop`. It contains all of the the arguments passed to the function. It is not available inside of arrow functions.

```
function sumAll() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total
}
```

Rest params collects all remaining arguments into an actual array that contains array methods.
```
function sumAll(...nums) {
    let total = 0;
    for (let n of nums) total += n;
    return total;
}

sumAll(1, 2); // 3
sumAll(1, 2, 3, 4, 5) // 15
```

## [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
Destructuring provides a short, clean syntax to "unpack":
- Values from an array
- Properties from objects into distinct variables.

The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

### Arrays
Assigning an array of variables to an array of values destructures the array into a set of variables that can be called individually.

```
const raceResults = ["Eliud Kipchoge", "Feyisa Lelisa", "Galen Rupp"];

const [gold, silver, bronze] = raceResults;
gold // "Eliud Kipchoge"
silver // "Feyisa Lelisa"
bronze // "Galen Rupp"

const [fastest, ... everyoneElse] = raceResults;
fastest // "Eliud Kipchoge"
everyoneElse // "Feyisa Lelisa", "Galen Rupp"
```

### Objects
Assigning an object of key-value pairs to an object of key-value pairs destructures the object into a set of key-value pairs that can be called individually.

```
const runner = {
    first: "Eliud",
    last: "Kipchoge",
    country: "Kenya",
    title: "Elder of the Order of the Golden Heart of Kenya",
}

const {first, last, country} = runner;

first // "Eliud"
last // "Kipchoge"
country // "Kenya"
```

### Params
Passing an object to a function with parameters the same name as the keys of the object destructures the object as arguments passed to the function.

```
const fullName = ({first, last}) => {
    return `${first} ${last}`
}

const runner = {
    first: "Eliud",
    last: "Kipchoge",
    country: "Kenya",
}

fullName (runner); "Eliud Kipchoge"
```