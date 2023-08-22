# Section 18: JavaScript Object Literals

- [Object Literals](#object-literals)
  - [Creating Objects](#creating-objects)
  - [Accessing Object Data](#accessing-object-data)
  - [Modifying Objects](#modifying-objects)
  - [Nesting Arrays & Objects](#nesting-arrays--objects)

## [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Literals
- Objects are collections of properties.
  - Properties are a key-value pair.
- Rather than accessing data using an index, custom keys may be used instead.

```
const fitBitData = {
    totalSteps : 308727,
    totalMiles : 211.7,
    avgCalorieBurn: 5755,
    workoutsThisWeek : '5 of 7',
    avgGoodSleep : '2:13',
}
```

### [Creating Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#creating_objects)
The advantage of the literal or initializer notation is, that you are able to quickly create objects with properties inside the curly braces. You notate a list of key: value pairs delimited by commas.

```
const comment = {
    username: 'sillyGoose420',
    downVotes: 19,
    upVotes: 214,
    netScore: 195,
    commentText: 'Tastes like chicken lol',
    tags: ['#hilarious', '#funny', '#silly'],
    isGilded: false,
};
```

### [Accessing Object Data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#accessing_properties)
Once you have created an object, you might want to read or change them. Object properties can be accessed by using the dot notation or the bracket notation. (See property accessors for detailed information.)

```
const person = {
    firstName: 'Mick',
    lastName: 'Jagger',
}

person.firstName // 'Mick'
person["firstName"] // 'Jagger'

person["age"] // undefined
```

#### Valid Keys
All keys are converted to strings except for symbols.

```
const years = {1999: 'GOOD', 2020: 'BAD'}
years // {1999: "GOOD", 2020: "BAD"}

// years.1999 // SyntaxError: Unexpected number.
years["1999"] // "GOOD"
years[1999] // "GOOD"
```

### Modifying Objects
Modify objects by accessing the key and assigning it a new value.

```
const midterms = {
    danielle: 96,
    thomas: 78,
}

midterms.thomas // 78

midterms.thomas = 79;
midterms.thomas // 79

midterms.thomas = 'C+';
midterms.thomas // "C+"

midterms.danielle = 'A+';
midterms // { danielle: "A", thomas: "C+"}
```

Add a new property by accessing the object with the new key name and assigning it a value.

```
midterms.ezra // undefined
midterms.ezra = 'B+';
midterms.ezra; // "B+"
midterms // { danielle: "A", thomas: "C+", ezra: "B+"}

midterms['antonio'] // undefined
midterms['antonio'] = 'A-';
midterms.antonio; // "A-"
midterms // { danielle: "A", thomas: "C+", ezra: "B+", antonio: "A-"}
```

### Nesting Arrays & Objects
Nest objects inside arrays.
```
const shoppingCart = [
    {
        product: 'Jenga Classic',
        price: 6.88,
        quantity: 1,
    },
    {
        product: 'Echo Dot',
        price: 29.99,
        quantity: 3,
    },
    {
        product: 'Fire Stick',
        price: 39.99,
        quantity: 2,
    },
]
```

Nest an object inside an object by assigning it to a key.
```
const student = {
    firstName: 'David',
    lastName: 'Jones',
    strengths: ['Music', 'Art'],
    exams: {
        midterm: 92,
        final: 88,
    }
}
```