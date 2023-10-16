// seed data in farmStand database
const mongoose = require("mongoose");
const Product = require("../models/product")

mongoose.connect("mongodb://localhost:27017/farmStand2")
    .then(() => {
        console.log("Serving farmStand MongoDB on port 27017");
    })
    .catch(e => {
        console.log("MongoDB Error!")
        console.log(e);
    });

Product.insertMany(
    [
        {
            name: "Ruby Grapefruit",
            price: 1.99,
            category: "fruit"
        },
        {
            name: "Fairy Eggplant",
            price: 1.00,
            category: "vegetable"
        },
        {
            name: "Organic Goddess Melon",
            price: 4.99,
            category: "fruit"
        },
        {
            name: "Organic Mini Seedless Watermelon",
            price: 3.99,
            category: "fruit"
        },
        {
            name: "Organic Celery",
            price: 1.50,
            category: "vegetable"
        },
        {
            name: "Chocolate Whole Milk",
            price: 2.69,
            category: "dairy"
        },

    ])
    .then((res) => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })