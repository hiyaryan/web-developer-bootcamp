const myMath = {
    PI: 3.14159,
    square: function (num) {
        return num * num;
    },
    cube: function (num) {
        return num ** 3;
    },
}

// Shorthand notation
const myMathShorthand = {
    PI: 3.14159,
    square(num) {
        return num * num;
    },
    cube(num) {
        return num ** 3;
    },
}

// `this` used in methods
const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow() {
        // get access to the data in this object with `this`
        // console.log("MEOW MEOW MEOW");
        console.log("THIS IS:", this);
        console.log(`${this.name} says MEOWWWW`);
    }
}

// `this` refers to cat
cat.meow()

// `this` does not refer to cat
const meow2 = cat.meow // says MEOWWWW

// using meow2 function
meow2()