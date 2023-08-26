# Section 19: Repeating Stuff with Loops

- [`for` Loops](#for-loops)
- [Infinite Loops](#infinite-loops)
- [Looping Over Arrays](#looping-over-arrays)
- [Nested Loops](#nested-loops)
- [`while` Loops](#while-loops)
- [`break` Keyword](#break-keyword)
- [Guessing Game](#guessing-game)
- [`for...of` Loop](#forof-loop)
- [Iterating Over Objects](#iterating-over-objects)
- [Todo List Project](#todo-list-project)

## [`for` Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
Syntax
```
for ([initialExpression]; [condition]; [incrementExpression]) {}
```

Example
```
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
```

## Infinite Loops
Infinite loops are loops that do not stop until all allocated memory has been consumed.

```
for (let i = 20; i >= 0; i++) {
    console.log(i);
}
```

## Looping Over Arrays
To loop over an array, start at index 0 and continue looping to the last index (length - 1).

```
const animals = ['lions', 'tigers', 'bears'];

for (let i = 0; i < animals.length; i++) {
    console.log(i, animals[i])
}

// 0 'lions'
// 1 'tigers'
// 2 'bears'
```

## Nested Loops
Putting the body of a loop (inner loop) inside of another loop (outer loop). For every iteration of the outer loop, the inner loop performs a full cycle. The total number of outer loop cycles determines how many full cycles the inner loop performs.

```
let str = 'LOL';
for (let i = 0; i <= 4; i++) {
    console.log("Outer:", i);
    for (let j = 0; j < str.length; j++) {
        console.log('   Inner:', str[j]);
    }
}
```

## [`while` Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
`while` loops continue running as long as the test condition is true.

```
let num = 0;
while (num < 10) {
    console.log(num);
    num++;
}
```

## [`break` Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
`break` provides the ability to break out of an unfinished loop.

```
let targetNum = Math.floor(Math.random() * 10);
let guess = Math.floor(Math.random() * 10);

while (true) {
    guess = Math.floor(Math.random() * 10);
    if (guess === targetNum) {
        console.log(`CORRECT! Guessed: ${guess} & target was: ${targetNum}`);
        break;
    }
    else {
        console.log(`Guessed ${guess}...Incorect!`);
    }
}
```

## Guessing Game
See `app.js` in WhileLoops directory.

Note
- `parseInt()` returns either an integer or `NaN`. 
- A bug in the initial version of the game overrode the option to quit the game with 'q' updating the variable with `NaN` because `parseInt` was used too early.
- See video "201. Writing a Guessing Game"

## [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) Loop
The `for...of` statement executes a loop that operates on a sequence of values sourced from an [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol). Iterable objects include instances of built-ins such as Array, String, TypedArray, Map, Set, NodeList (and other DOM collections), as well as the arguments object, generators produced by generator functions, and user-defined iterables.

```
for (variable of iterable) {
    statement
}
```

## Iterating Over Objects
### [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
The `for...in` statement iterates over all [enumerable string properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of an object (ignoring properties keyed by [symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)), including inherited enumerable properties.

```
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}

// Expected output:
// "a: 1"
// "b: 2"
// "c: 3"
```

### [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
The `Object.keys()` static method returns an array of a given object's own enumerable string-keyed property names.

```
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```

### [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
The `Object.values()` static method returns an array of a given object's own enumerable string-keyed property values.

```
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]
```

### [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
The `Object.entries()` static method returns an array of a given object's own enumerable string-keyed property key-value pairs.

```
const object1 = {
  a: 'somestring',
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"
```

## Todo List Project
See `todo.js` in TodoListApp directory.

Course solution
```
let input = prompt('what would you like to do?');
const todos = ['Collect Chicken Eggs', 'Clean Litter Box'];
while (input !== 'quit' && input !== 'q') {
    if (input === 'list') {
        console.log('*****************')
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log('*****************')
    } else if (input === 'new') {
        const newTodo = prompt('Ok, what is the new todo?');
        todos.push(newTodo);
        console.log(`${newTodo} added to the list!`)
    } else if (input === 'delete') {
        const index = parseInt(prompt('Ok, enter an index to delete:'));
        if (!Number.isNaN(index)) {
            const deleted = todos.splice(index, 1);
            console.log(`Ok, deleted ${deleted[0]}`);
        } else {
            console.log('Unknown index')
        }
    }
    input = prompt('what would you like to do?')
}
console.log('OK QUIT THE APP!')
```