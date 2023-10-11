const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => {
        console.log("Connected to MongoDB port 27017.");
    })
    .catch((e) => {
        console.log("Error", e);
    });

/*
Schema shape example

{
    title: "Amadeus",
    year: 1986,
    score: 9.2,
    rating: 'R';
}
*/

// Defining a schema based on the desired shape above
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// Mongoose will take the first argument "Movie" and pluralize it to "movies"
const Movie = mongoose.model("Movie", movieSchema);

// inserting a single document
// const amadeus = new Movie({ title: "Amadeus", year: 1986, score: 9.2, rating: 'R' });
// amadeus.save();

// Inserting several documents
// Movie.insertMany([
//     { title: "Amelie", year: 2001, score: 8.3, rating: 'R' },
//     { title: "Alien", year: 1979, score: 8.1, rating: 'R' },
//     { title: "The Iron Giant", year: 1999, score: 7.5, rating: 'PG' },
//     { title: "Stand By Me", year: 1986, score: 8.6, rating: 'R' },
//     { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: 'PG-13' },
// ]).then((data) => {
//     console.log("IT WORKED!");
//     console.log(data);
// }).catch(e => {
//     console.log("Error", e);
// });

// returns the query object
Movie.find({})

// returns the data inside the query object
Movie.find({}).then(data => {
    console.log(data);
})

// find movie with particular rating
Movie.find({ rating: "PG-13" }).then(data => { console.log(data) })

// find movie where year is greater than or equal to 2010
Movie.find({ year: { $gte: 2010 } }).then(data => {
    console.log(data);
})

// find movie where year is less than or equal to 1990
Movie.find({ year: { $lte: 1990 } }).then(data => {
    console.log(data);
})

// find the first movie in the movies collection
Movie.findOne({}).then(m => {
    console.log(m);
})

// find a movie by id using find
Movie.find({ _id: "6525be93d4867e05f09eb25e" }).then(m => {
    console.log(m);
})

// find movie by id using findById
Movie.findById("6525be93d4867e05f09eb25e").then(m => {
    console.log(m);
})

// updateOne
Movie.updateOne({ title: "Amadeus" }, { year: 1984 }).then(res => {
    console.log(res);
});

// updateMany
Movie.updateMany({ title: { $in: ["Amadeus", "Stand By Me"] } }, { score: 10 }).then(res => {
    console.log(res);
});

// findOneAndUpdate
Movie.findOneAndUpdate({ title: "The Iron Giant" }, { score: 7.8 }, { new: true }).then(m => {
    console.log(m);
});

Movie.deleteOne({ title: "Amelie" }).then(res => {
    console.log(res);
})

Movie.deleteMany({ year: { $gte: 1999 } }).then(res => {
    console.log(res);
})

Movie.findOneAndDelete({ title: "Alien" }).then(res => {
    console.log(res);
})