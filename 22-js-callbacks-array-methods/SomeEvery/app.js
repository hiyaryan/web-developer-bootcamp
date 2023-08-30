const exams = [80, 98, 92, 78, 77, 90, 89, 84, 81, 77]

// Are all exams greater than 75?
const greaterThan75 = exams.every(score => score > 75);
console.log(greaterThan75);

// Are there any perfect scores?
const perfectScores = exams.some(score => score === 100);
console.log(perfectScores);

const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1984
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Jingle All The Way',
        score: 71,
        year: 1996
    },
    {
        title: 'Parasite',
        score: 95,
        year: 2019
    },
    {
        title: 'Notting Hill',
        score: 77,
        year: 1999
    },
    {
        title: 'Alien',
        score: 90,
        year: 1979
    }
]

// Are there any movies after 2015?
const moviesAfter2015 = movies.some(movie => movie.year > 2015)
console.log(moviesAfter2015);