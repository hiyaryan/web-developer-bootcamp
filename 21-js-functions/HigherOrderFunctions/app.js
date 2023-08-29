let greet = function () {
    console.log("HI!");
}

// Accepting other functions as arguments 

// accepts a function
function callTwice(func) {
    func();
    func();
}

// accepts a function
function callTenTimes(f) {
    for (let i = 0; i < 10; i++) {
        f()
    }
}


function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
}

// Returning functions

function makeMysteryFun() {
    const rand = Math.random();
    if (rand > 0.5) {
        return function () {
            console.log("CONGRATS I AM A GOOD FUNCTION!");
            console.log("YOU WIN A MILLION DOLLARS");
        }
    } else {
        return function () {
            alert("YOU HAVE BEEN INFECTED BY A COMPUTER VIRUS!!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
        }
    }
}

// capture return function from `makeMysteryFun`
const mystery = makeMysteryFun();

// creating a function that creates functions aka a factory function

// as separate functions
function isBetween() {
    return num >= 50 && num <= 100;
}

function isBetween2() {
    return num >= 1 && num <= 10;
}

// factory function returns a function that accepts an argument defined by its parents arguments
function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}