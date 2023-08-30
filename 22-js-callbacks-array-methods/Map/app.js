const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

// capture all of the numbers doubled into an array
const doubles = numbers.map(function (num) {
    return num * 2;
});

console.log(doubles); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

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

// capture all of titles into an array
const titles = movies.map(function (movie) {
    return movie.title
});

console.log(titles); // ['Amadeus', 'Stand By Me', 'Parasite', 'Alien'] 