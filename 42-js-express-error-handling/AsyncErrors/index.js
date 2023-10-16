const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/product");
const AppError = require("./AppError");
const { wrap } = require("module");

mongoose.connect("mongodb://localhost:27017/farmStand2")
    .then(() => {
        console.log("Serving farmStand MongoDB on port 27017");
    })
    .catch(e => {
        console.log("MongoDB Error!")
        console.log(e);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// async utility function
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

// all products route
app.get("/products", wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, category: "All" });
    }
}));

// new product form
app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
});

// new product creation
app.post("/products", wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${ newProduct._id }`);
}));

// single product route
app.get("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError(404, "Product not found");
    }

    res.render("products/show", { product });
}));

// edit product form
app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError(404, "Product not found");
    }
    res.render("products/edit", { product, categories });
}));

// edit product
app.put("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${ product._id }`);
}));

// delete product
app.delete("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
}));

const handleValidationError = err => {
    console.dir(err);
    return new AppError(400, `Validation failed...${ err.message }`);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationError(err)
    next(err);
});

// error handling middleware 
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
});