// functions can be called before or after the function definition
// calling before is a JavaScript quark called "hoisting"
singSong()

// first function
function singSong() {
    console.log("DO");
    console.log("RE");
    console.log("MI");
}

singSong()

// Arguments
function greet(firstName) {
    console.log(`Hi, ${firstName}!`);
}

greet('George');

// Two arguments
function greetFullName(firstName, lastName) {
    console.log(`Hey there, ${firstName} ${lastName[0]}.`);
}

greetFullName('George', 'Clooney');


function repeat(str, numTimes) {
    let result = "";
    for (let i = 0; i < numTimes; i++) {
        // console.log(`${str}`);
        result += str;
    }
    console.log(`${result}`);
}


// `return` keyword
// without return
function addPrint(x, y) {
    console.log(x + y);
}

// with return
function addReturn(x, y) {
    return x + y;

    console.log("WILL NOT PRINT"); // function ends at `return`
}

function add(x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
        return false
    }

    let sum = x + y;
    return sum
}