// defining functions
const add = (x, y) => x + y;
const PI = 3.14159;
const square = x => x * x;

// exporting one at a time
module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;

// adding a function directly into exports
// module.exports.add = (x, y) => x + y;
// module.exports.PI = 3.14159;
// module.exports.square = x => x * x;

// shortcut adding a function directly into exports
// // exports = "ASDASDASDAS" // this breaks the shortcut
// exports.add = (x, y) => x + y;
// exports.PI = 3.14159;
// exports.square = x => x * x;

// exporting as an object
const math = {
    add: add,
    PI: PI,
    square: square,
}

// adding math object of functions to exports
module.exports = math;