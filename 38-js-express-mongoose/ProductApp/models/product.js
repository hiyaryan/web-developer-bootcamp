const mongoose = require("mongoose");

// create the schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ["fruit", "vegetable", "dairy"]
    }
})

// create the model from the schema
const Product = mongoose.model("Product", productSchema);

// give the project access to the model
module.exports = Product;