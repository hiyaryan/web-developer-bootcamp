const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "65388bc060c7fdfc8bb4cc5f",
            location: `${ cities[random1000].city }, ${ cities[random1000].state }`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dg2enaw9v/image/upload/v1698365907/YelpCamp/j0gls2tl0lrldwmmmtu6.jpg',
                    filename: 'YelpCamp/j0gls2tl0lrldwmmmtu6'
                },
                {
                    url: 'https://res.cloudinary.com/dg2enaw9v/image/upload/v1698365907/YelpCamp/l8b3odjqgdy06xw3yey6.jpg',
                    filename: 'YelpCamp/l8b3odjqgdy06xw3yey6'
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at consequatur omnis non nulla saepe illo, expedita, autem laborum maiores quod vitae asperiores deleniti iusto voluptas fuga distinctio, ipsa est.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })