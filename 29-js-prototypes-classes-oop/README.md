# Section 29: Prototypes, Classes, & OOP

- [Prototypes](#prototypes)
- [Intro to OOP](#intro-to-oop)
  - [Factory Functions](#factory-functions)
  - [Constructor Functions](#constructor-functions)
- [Classes](#classes)
  - [Class body](#class-body)
  - [`extends` Keyword](#extends-keyword)
  - [`super` Keyword](#super-keyword)

## [Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
Prototypes are the mechanism by which JavaScript objects inherit features from one another.

### [The Prototype Chain](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes#the_prototype_chain)

```
const myObject = {
  city: "Madrid",
  greet() {
    console.log(`Greetings from ${this.city}`);
  },
};

myObject.greet(); // Greetings from Madrid
```

This is an object with one data property, `city`, and one method, `greet()`. If you type the object's name *followed* by a period into the console, like `myObject`., then the console will pop up a list of all the properties available to this object. You'll see that as well as `city` and `greet`, there are lots of other properties!

```
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
city
constructor
greet
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf
```

Every object in JavaScript has a built-in property, which is called its **prototype**. The prototype is itself an object, so the prototype will have its own prototype, making what's called a **prototype chain**. The chain ends when we reach a prototype that has `null` for its own prototype.

If myObject.toString() is called, the browser:
- looks for toString in myObject
- can't find it there, so looks in the prototype object of myObject for toString
- finds it there, and calls it.

To find the prototype of `myObject` use the function `Object.getPrototypeOf()`:

```
Object.getPrototypeOf(myObject); // Object { }
```

New functions can be added to or old function can be override an Object's (e.g. Array, String) prototype allowing new functionality to be shared across all Objects.

Adding a new function to the `String` prototype.
```
String.prototype.yell = function () {
    return `${this.toUpperCase()}`;
}

"hello".yell() // "HELLO"
```

Overriding the `pop` method of the `Array` prototype.
```
Array.prototype.pop = function() {
  return "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF";
}

[1,2,3].pop() // "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF"
```

The difference between `prototype` and `__proto__` is that, `prototype` is the actual `prototype` object and `__proto__` is a reference to the `Prototype` object.

```
Array.prototype // is the Prototype for the Array object

let arr = [1, 2, 3];
arr.__proto__ // is a reference to the Prototype of the Array object
```

## Intro to [OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)
Object-oriented programming is about modeling a system as a collection of objects, where each object represents some particular aspect of the system. Objects contain both functions (or methods) and data. An object provides a public interface to other code that wants to use it but maintains its own private, internal state; other parts of the system don't have to care about what is going on inside the object.

### [Factory Functions](https://www.javascripttutorial.net/javascript-factory-functions/)
A factory function is a function that returns a new object.

Creates a new person object.
```
function createPerson(firstName, lastName) {
  return {
    firstName: firstName,
    lastName: lastName,
    getFullName() {
      return firstName + ' ' + lastName;
    },
  };
}

let person1 = createPerson('John', 'Doe');
let person2 = createPerson('Jane', 'Doe');

console.log(person1.getFullName());
console.log(person2.getFullName());
```

Factory functions are not commonly used because every time one creates a new object the objects functions are duplicated and stored separately as different reference types.
```
person1.getFullName() === person2.getFullName() // false
```

On the contrary, a methods used on any String object are the same method.
```
"hi".slice === "bye".slice // true
```

### Constructor Functions
Constructor functions are capitalized functions with no return value consisting of variables, or fields, assigned to the arguments passed to the function using the `this` keyword.

```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```

The `new` operator lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function. The `new` operator,
1. Creates a blank, plain JavaScript object
2. Links (sets the constructor of) this object to another object
3. Passes the newly created object from *Step 1* as the `this` context
4. Returns `this` if the function doesn't return its own object 
```
const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// Expected output: "Eagle"
```

In order to add functions as properties to a constructor function, the Prototype property should be used.
```
Car.prototype.print = function () {
  return `${this.make} ${this.model} ${this.year}`
}
```

Unlike factory functions, functions added using the Prototype property are shared across all objects made by the same constructor function.
```
const car2 = new Car('Honda', 'Civic', 2018);

car1.print === car2.print // true
```

The [classes](#classes) syntax is used to group an objects fields and functions into the same block.

## [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on [prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) but also have some syntax and semantics that are unique to classes.

Classes are "special [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)", and just as you can define [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) and [function declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), a class can be defined in two ways: a [class expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) or a [class declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class).

```
// Declaration
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

// Expression; the class is anonymous but assigned to a variable
const Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// Expression; the class has its own name
const Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

### [Class body](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#class_body)
The body of a class is the part that is in curly brackets `{}`. This is where you define class members, such as methods or constructor.

The body of a class is executed in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) even without the `"use strict"` directive.

A class element can be characterized by three aspects:
- Kind: [Getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get), [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set), [method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions), or [field](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
- Location: [Static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) or instance
- Visibility: Public or [private](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

In addition, there are two special class element syntaxes: [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#constructor) and [static initialization blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#static_initialization_blocks), with their own references.

### [`extends` Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#inheritance)
The `extends` keyword is used in [class declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) or [class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) to create a class that is a child of another class.

Syntax
```
class ChildClass extends ParentClass { /* … */ }
```

Example creating a `Dog` class that inherits from an `Animal` class.
```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.
```

### [`super` Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
The `super` keyword is used to access properties on an object literal or class's `[[Prototype]]`, or invoke a superclass's constructor.

The `super.prop` and `super[expr]` expressions are valid in any [method definitio](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)n in both [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). The `super(...args)` expression is valid in class constructors.

For classes, if there is a constructor present in a subclass, it needs to first call `super()` before using `this`. The [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword can also be used to call corresponding methods of super class.

Using `super` to call a parent class' method first before the child class'.
```
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}

const l = new Lion("Fuzzy");
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```