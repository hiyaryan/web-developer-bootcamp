const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/product");
const session = require("express-session");
const flash = require("connect-flash")

const sessionOptions = { secret: "thisisnotagoodsecret", resave: false, saveUninitialized: true };
app.use(session(sessionOptions));
app.use(flash());

mongoose.connect("mongodb://localhost:27017/flashDemo")
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

// setting up flash and res.locals middleware
app.use(function (req, res, next) {
    res.locals.messages = req.flash("success")
    next()
})

// all products route
app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, category: "All" });
    }
});

// new product form
app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
});

// new product creation
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', "Successfully made a new product!");
    // res.redirect(`/products/${ newProduct._id }`);
    res.redirect("/products");
});

// single product route
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product });
});

// edit product form
app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
})

// edit product
app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${ product._id }`);
})

// delete product
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
});