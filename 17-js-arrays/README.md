# Section 17: JavaScript Arrays

- [Arrays](#arrays)
- [Array Random Access](#array-random-access)
- [Push & Pop](#push--pop)
- [Shift & Unshift](#shift--unshift)
- [`concat`, `indexOf`, `includes`, & `reverse`](#concat-indexof-includes--reverse)
- [Slice & Splice](#slice--splice)
- [Reference Types & Equality Testing](#reference-types--equality-testing)
- [Arrays + Const](#arrays--const)
- [Multi-Dimensional Arrays](#multi-dimensional-arrays)

## [Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)
Arrays are ordered collections of values such as
- A list of comments on an IG post
- A collection of levels in a game
- Songs in a playlist.

Creating arrays
```
// To make an empty array
let students = [];

// An array of strings
let colors = ['red', 'orange', 'yellow'];

typeof colors // object

// An array of numbers
let lottoNums = [19, 22, 56, 12, 51];

// A mixed array
let stuff = [true, 68, 'cat', null]
```

## Array Random Access
Arrays are indexed. Each element has a corresponding index (counting starts at 0).

```
[Doc][Dopey][Bashful][Grumpy][Sneezy][Sleepy][Happy]
  0     1       2       3       4        5      6
```

Accessing elements
```
let days = ["Monday", "Tuesday", "Wednesday"]

days.length // 3

days[0] // "Monday"

days[3] // undefined

// Accessing chars from a string
"Monday"[0] // 'M'

// Accessing "Monday" from days and 'M' from "Monday"
days[0][0] // 'M'
```

Modifying Arrays
```
let colors = ['rad', 'orange', 'green', 'yellow'];

colors[0] = 'red';
colors[2] = 'yellow';
colors[3] = 'green';

colors[4] // undefined
colors[4] = 'blue';

colors // ['red', 'orange', 'yellow', 'green', 'blue']
```

Note since strings are immutable, a single char cannot be modified.
```
let name = "ryan";
name[0] = "R";

name // "ryan", no change
```

## Push & Pop
### [`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
Add an element to the end of the array.

```
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
```

### [`pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
Remove an element from the end of the array.

```
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
```

## Shift & Unshift
### [`shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
Remove an element from the beginning of the array.

```
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1
```

### [`unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
Add an element to the beginning of the array.

```
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]
```

## `concat`, `indexOf`, `includes`, & `reverse`
### [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
Merge arrays.

```
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]
```

### [`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
Returns the first index at which a given element can be found in the array, or -1 if it is not present.

```
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1
```

### [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
Look for a value.

```
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false
```

### [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
Reverses and array.

```
const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]
```

## Slice & Splice
### [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
Copies a portion of an array.

```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

### [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
Removes/replaces elements.

```
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

## Reference Types & Equality Testing
Reference types are objects referable by its location in memory.

```
// both arrays are stored in different memory locations so are different objects
[1,2,3] === [1,2,3] // false 

let array = [1,2,3]
let arrayCopy = array

arrayCopy // [1,2,3]

array.push(4); // [1,2,3,4]
array // [1,2,3,4]

// arrayCopy refers to the same array object in memory
arrayCopy // [1,2,3,4]

array === arrayCopy // true

// although the contents are the same as arrayCopy the array is different
let arrayDiff = [1,2,3,4]

arrayDiff === arrayCopy // false
```

## Arrays + Const
Creating an array using `const` preserves the object in memory. The variable cannot be reassigned. The contents of the array can still be mutated using the arrays methods.

```
const nums = [1,2,3];
nums.push(4);

nums // [1,2,3,4]

nums = 1 // TypeError: Assignment to constant variable.
nums = [1,2,3,4] // TypeError: Assignment to constant variable.
```

## Multi-Dimensional Arrays
Nested arrays are arrays stored inside other arrays.

Create a 2D array by nesting an array inside an array
```
const colors = [
  ['red', 'crimson'],
  ['orange', 'dark orange'],
  ['yellow', 'golden rod'],
  ['green', 'olive'],
  ['blue', 'navy blue'],
  ['purple', 'orchid'],
]
```

Access elements within a 2D array by chaining square brackets.
```
const board = [
  ['0', null, 'X'],
  [null, 'X', 'O'],
  ['X', 'O', null],
]

board[1] // [null, 'X', 'O']
board[1][0] // null
```

