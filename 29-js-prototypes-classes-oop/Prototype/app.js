// Prototype
// Array Prototype
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr));

// The new function is added to `arr` and not the Prototype
arr.sing = function () {
    console.log("LA LA LA!");
}

console.dir(arr);
arr.push(5);

console.dir(arr);

// HTMLBodyElement Prototype
const body = document.body
console.log(Object.getPrototypeOf(body));


// String Prototype
const hello = "hello"

console.log(Object.getPrototypeOf(hello));

// Adding a new functions to the String prototype
String.prototype.grumpus = () => alert("GO AWAY!!!");
hello.grumpus()

String.prototype.yell = function () {
    return `OMG! ${this.toUpperCase()}!!!!!! AGHGHG`;
}

hello.yell();

// Overriding a method of the Array prototype
Array.prototype.pop = function () {
    return "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF";
}

console.log(Object.getPrototypeOf(arr));
console.log(arr.pop());

// 
const nums = [7, 8, 9];
