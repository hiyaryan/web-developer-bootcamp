# Section 15: JavaScript Strings and More

- [Strings](#strings)
  - [Indices & Length](#indices--length)
  - [Methods](#methods)
  - [Template Literals](#template-literals)
- [Undefined & Null](#undefined--null)
- [Random Numbers & The Math Object](#random-numbers--the-math-object)

## [Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
The String object is used to represent and manipulate a sequence of characters. 

Single and double quotes
```
let firstName = "Ziggy"; // double quotes work 
let msg = "Please do not feed the chimps!";
let animal = 'Dumbo Octopus'; // single quotes work
// let bad = "this is wrong' // mixing single and double does not work

"I told her, 'go away'."
"She said, 'I hate you'."
```

### Indices & Length
Strings are indexed.

C H I C K E N
0 1 2 3 4 5 6

Each character has a corresponding index (a positional number)

Get a character from a String.
```
let animal = "Dumbo Octopus";

animal[0] // "D"
animal[1] // "u" 
animal[6] // "O" 
animal[99] // undefined

let phone = "(231)345-1344";
phone[0] // "("
```

Length of a String.
```
animal.length // 13
animal[12] // 

"lol".length // 3
"lol"[0] // l
"lol" + "lol" // "lollol"

let firstName = "River";
let lastName = "Phoenix"
firstName + lastName; // "RiverPhoenix"

let fullName = firstName + " " +  lastName; // "River Phoenix"
let result = 1 + "hi" // "1hi" numbers are converted to String

typeof result // "string"
typeof 1 // "number"
```

### [Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
Built-in actions that can be performed on individual strings that
- Help search within the string
- Replace part a pat of the string
- Change the casing of a string.

Syntax
```
thing.method()
```

Recall that strings are immutable. Methods called on strings do not update the object in memory.

Casing
```
let msg = "I am king"; // 'I AM KING'
let yellMsg = msg.toUpperCase();

let angry = 'LeAvE Me aLoNe!' // 'leave me alone!'
angry.toLowerCase();

// value is unchanged in memory
angry // 'LeAvE Me aLoNe!'
```

[`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

The `trim()` method of String values removes whitespace from both ends of this string and returns a new string, without modifying the original string.

To return a new string with whitespace trimmed from just one end, use trimStart() or trimEnd().

```
let greeting = '    leave me alone plz    ';
greeting.trim() // 'leave me alone plz'
```

#### Methods with Arguments
Some methods accept arguments to modify their behavior.

Syntax
```
thing.method(arg)
```

[`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

The 'indexOf()' method of String values searches this string and returns the index of the first occurrence of the specified substring. It takes an optional starting position and returns the first occurrence of the specified substring at an index greater than or equal to the specified number.

```
let tvShow = 'catdog'

tvShow.indexOf('cat'); // 0
tvShow.indexOf('dog'); // 3
tvShow.indexOf('z'); // -1 (not found)
```

[`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

The `slice()` method of String values extracts a section of this string and returns it as a new string, without modifying the original string. 

```
let str = 'supercalifragilisticexpialidocious'

str.slice(0,5); // 'super'
str.slice(5); // 'califragilisticexpialidocious'
```

[`replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

The `replace()` method of String values returns a new string with one, some, or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function called for each match. If pattern is a string, only the first occurrence will be replaced. The original string is left unchanged.

```
let annoyingLaugh = 'teehee so funny! teehee!';

annoyingLaugh.replace('teehee', 'haha') // 'haha so funny! teehee!'
```

### Template Literals
Building a string using concatenation.
```
let product = 'Artichoke';

let price = 3.99;
price = 2.25;

let qty = 5;

// You bought 5 Artichoke. Total is 11.25.
"You bought " + qty + " " + product + ". Total is: " + price * qty"
```

Template literals are strings that allow embedded expressions that will be evaluated and then turned into a resulting string.

```
`I counted ${3 + 4} sheep`; // "I counted 7 sheep"
```

Building a string using template literals, back-ticks " ` " are required instead of quotes " " " or " ' ":

```
`You bought ${qty} ${product}. Total is: $${price * qty}.`
```

## Undefined & Null
Recall JavaScript primitive types:
- Number
- String
- Boolean
- Null
- Undefined

### [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
The `null` value represents the intentional absence of any object value. It is one of JavaScript's primitive values and is treated as falsy for boolean operations. 

```
null // null

let loggedInUser = null; // no one is logged in yet

loggedInUser = 'Alan Rickman';
```

### [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
The `undefined` global property represents the primitive value undefined. It is one of JavaScript's primitive types. 

```
'hello'[99] // undefined

let x;
x // undefined
```

## Random Numbers & The [Math Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
The Math Object contains properties and methods for mathematical constants and functions.

```
Math.PI // 3.14159...

Math.round(4.9) // 5

Math.abs(-456) // 456

Math.pow(2,5) // 32

Math.floor(3.999) // 3
```

### [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) gives a random decimal between 0 and 1 (non-inclusive).

```
Math.random(); // 0.14597962716373456
Math.random(); // 0.88716374134137647
Math.random(); // 0.91343214817466765
```

#### Random Integers
Generate random integers between 1 and 10.

```
const step1 = Math.random(); // 0.51288716374134137
const step2 = step1 * 10; // 5.1288716374134137
const step3 = Math.floor(step2); // 5
const step4 = step3 + 1; // 6

// all steps on a single line
Math.floor(Math.random() * 10) + 1
```