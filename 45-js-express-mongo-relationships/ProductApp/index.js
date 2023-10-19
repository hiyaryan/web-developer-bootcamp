const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");

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

// FARM ROUTES
// ------------------------
// get all farms
app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
});

// new farm form
app.get("/farms/new", (req, res) => {
    res.render("farms/new");
})

// post new farm
app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
});

// delete a farm and all of its products
app.delete("/farms/:id", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect("/farms");
});

// show a single farm
app.get("/farms/:id", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate("products");
    res.render("farms/show", { farm });
});

// new product form for a specific farm
app.get("/farms/:farm_id/products/new", async (req, res) => {
    const { farm_id } = req.params;
    const farm = await Farm.findById(farm_id)
    res.render("products/new", { categories, farm });
})

// post new product for specific farm
// create a two way relationship between the farm and product
app.post("/farms/:farm_id/products", async (req, res) => {
    const { farm_id } = req.params;
    const farm = await Farm.findById(farm_id);
    const product = new Product(req.body);

    farm.products.push(product);
    product.farm = farm;

    await farm.save();
    await product.save();

    res.redirect(`/farms/${ farm_id }`);
});

// PRODUCT ROUTES
// ------------------------
const categories = ["fruit", "vegetable", "dairy"];

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
    res.redirect(`/products/${ newProduct._id }`);
});

// single product route
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
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