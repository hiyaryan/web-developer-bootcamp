// function expression
const addFuncExp = function (x, y) {
    return x + y;
}

// function
function addFunc(x, y) {
    return x + y;
}

// arrow function
const add = (x, y) => {
    return x + y
}

// parenthesis are optional for one parameter
const square = x => {
    return x * x
}

const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1
}

// implicit return
const rollDieImplicit = () => (
    Math.floor(Math.random() * 6) + 1
);

const addImplicit = (a, b) => a + b;


// Combining arrow functions and `forEach`
const movies = [
    {
        title: 'Amadeus',
        score: 99
    },
    {
        title: 'Stand By Me',
        score: 85
    },
    {
        title: 'Parasite',
        score: 95
    },
    {
        title: 'Alien',
        score: 90
    }
]

const newMovies = movies.map(movie => (
    `${movie.title} - ${movie.score / 10}`
))


// Arrow functions and `this`

// With a regular function, the whole name is returned
const personRegular = {
    firstName: "Viggo",
    lastName: "Mortensen",
    fullName: function () { return `${this.firstName} ${this.lastName}` },
}

// With an arrow function, undefined is returned
const personArrowUndefined = {
    firstName: "Viggo",
    lastName: "Mortensen",
    fullName: () => `${this.firstName} ${this.lastName}`,
}

// With an arrow function, undefined is returned and attempting to use it in a another method returns an error: "TypeError: this.fullName is not a function"
const personArrow = {
    firstName: "Viggo",
    lastName: "Mortensen",
    fullName: () => {
        console.log(this);
        return `${this.firstName} ${this.lastName}`
    },
    shoutName: function () {
        setTimeout(function () {
            console.log(this)
            console.log(this.fullName())
        }, 3000)
    },
}

// To use the function in another function, ensure the it is also an arrow function so that `this` refers to the `window`. Additionally, ensure that the method uses the regular function syntax so that this refers to the `person` object and not the `window`.
const person = {
    firstName: "Viggo",
    lastName: "Mortensen",
    fullName: function () {
        console.log(this);
        return `${this.firstName} ${this.lastName}`
    },
    shoutName: function () {
        setTimeout(() => {
            console.log(this)
            console.log(this.fullName())
        }, 3000)
    },
}