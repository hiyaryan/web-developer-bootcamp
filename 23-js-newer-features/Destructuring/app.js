// destructing arrays
const scores = [92344, 23432, 454353, 23434, 23567, 76857];

// assigning values to variables without destructuring
const highScore = scores[0];
const secondHighScore = scores[1];

// assigning values to variables using destructuring
const [gold, silver, bronze, ...everyoneElse] = scores

// destructuring objects
const user = {
    email: "harvey@gmail.com",
    password: "sCoTt1948sMiTh",
    firstName: "Harvey",
    lastName: "Milk",
    born: 1930,
    died: 1978,
    bio: "Harvey Bernard Milk was an American politician and the first openly gay elected official in the history of California, where he was elected to the San Francisco Board of Supervisors.",
    city: "San Francisco",
    state: "California",
}

// without destructuring
// const firstName = user.firstName
// const lastName = user.lastName
// const email = user.email

// with destructuring
const { email, firstName, lastName, bio } = user;

// rename using colon followed by the new variable name
const { born: birthYear, death: deathYear = "N/A" } = user;


const user2 = {
    email: "Stacy@gmail.com",
    firstName: "Stacy",
    lastName: "Gonzalez",
    born: 1987,
    city: "Tulsa",
    state: "Oklahoma",
}

// give a default value using the `=` sign
const { city, state, died = "N/A" } = user2

// no `died` key which returns `undefined`, same as assigning a new variable to a non-existent key in an object 
const silly = user2.silly; // undefined

// destructuring parameters

// without destructuring
function fullNameBasic(user) {
    `${user.firstName} ${user.lastName}`
}

// with destructuring using object destructuring
function fullNameObject(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`
}

// with destructuring using param destructuring
function fullName({ firstName, lastName = "asdasd" }) {
    return `${firstName} ${lastName}`;
}


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

// filtering movies without destructuring
const scoresBasic = movies.filter((movie) => movie.score >= 90)

// filtering movies with destructuring
const scoresParam = movies.filter(({ score }) => score >= 90)

// mapping movies without destructuring
const moviesBasic = movies.map(movie => {
    return `${movie.title} (${movie.year}) is rated ${movie.score}`
})

// mapping movies with destructuring
const moviesParam = movies.map(({ title, year, score }) => {
    return `${title} (${year}) is rated ${score}`
})