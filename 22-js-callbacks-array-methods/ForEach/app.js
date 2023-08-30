const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

function print(element) {
    console.log(element);
}

// `forEach` called on `numbers` object with `print` function
console.log("Passing a prebuilt callback function.");
numbers.forEach(print)

// functions are more commonly defined within `forEach` parenthesis as an argument
console.log("Creating a function in the method argument.");
numbers.forEach(function (n) {
    console.log(n);
})

// contrast with for loop
console.log("Using a for...of loop");
for (let n of numbers) {
    console.log(n);
}

// print only the even elements
console.log("Printing only the even numbers.");
numbers.forEach(function (el) {
    if (el % 2 === 0) console.log(el);
});


// iterating over an array of objects
console.log("Iterating over a movies array");

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

movies.forEach(function (movie) {
    console.log(`${movie.title} - ${movie.score}/100`);
})