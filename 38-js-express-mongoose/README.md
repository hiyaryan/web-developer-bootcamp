# Section 38: Putting It All Together: Mongoose with Express

- [Basic Setup](#basic-setup)
  - [Project Directory Setup](#project-directory-setup)
  - [`index.js` Express+EJS+Mongoose Setup](#indexjs-expressejsmongoose-setup)
  - [Node and MongoDB Version Conflict](#node-and-mongodb-version-conflict)
- [Creating the Products Model](#creating-the-products-model)
- [Products Index](#products-index)
- [Product Details](#product-details)
- [Creating Products](#creating-products)
- [Updating Products](#updating-products)
- [Category Selector](#category-selector)
- [Deleting Products](#deleting-products)
- [Filtering By Category](#filtering-by-category)

## Basic Setup
See `ProductApp` for an example of a full CRUD, Express + Mongoose application, created following the instructions in this README.

### Project Directory Setup
Initialize a new npm package.
```bash
$ npm init -y
```

Install Express, EJS, and Mongoose.
```bash
$ npm i express ejs mongoose
```

Create `index.js` file.
```bash
$ touch index.js
```

Create `views` directory.
```bash
$ mkdir views
```

### `index.js` Express+EJS+Mongoose Setup
Setup `index.js` with Express, EJS Engine, using the absolute path and listening on port 3000 with a test route. 
```js
const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/dog", (req, res) => {
    res.send("WOOF!")
})

app.listen(3000, () => {
    console.log("Listening on port 3000.")
})
```

Test server with `nodemon`.
```bash
$ nodemon index.js
```

Test response to client at `http://localhost:3000/dog`.

Setup `index.js` with Mongoose and connect to new database `productApp`. 
```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/productApp")
    .then(() => {
        console.log("Serving productApp database on port 27017");
    })
    .catch(e => {
        console.log("Error! Could not connect.")
        console.log(e);
    });
```

Note that `index.js` is being used to test the server and database connections in this section. It is rewritten in the `ProductApp` directory.

### Node and MongoDB Version Conflict
If a versions of node 17.x and above are used, then newer versions of MongoDB are required. Otherwise, using `nodemon` to automatically restart the server throws a `MongooseServerSelectionError` (shown below) and refuses to connect to the MongoDB server.

```bash
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
    at _handleConnectionErrors (/Users/ryan/Dev/web-developer-bootcamp/38-js-express-mongoose/ProductApp/node_modules/mongoose/lib/connection.js:805:11)
    at NativeConnection.openUri (/Users/ryan/Dev/web-developer-bootcamp/38-js-express-mongoose/ProductApp/node_modules/mongoose/lib/connection.js:780:11) {
  reason: TopologyDescription {
    type: 'Unknown',
    servers: Map(1) { 'localhost:27017' => [ServerDescription] },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: null,
    maxElectionId: null,
    maxSetVersion: null,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined
}
```

To resolve this error, use `nvm` to downgrade the Node version, (e.g. Node v16.20.2 works with MongoDB v4.4.25) or upgrade MongoDB if operating system can support it.
```bash
$ nvm install 16.20.2
$ nvm use 16.20.2
```

## Creating the Products Model
The following schema, see `models/product.js` represents a farmers market product stand.
```js
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
        enum: ["fruit", "vegetable", "dairy"]
    }
})
```

Create a model from the schema.
```js
const Product = mongoose.model("Product", productSchema);
```

Create a document based on the model and save to database.
```js
const grapefruit = new Product({
    name: "Ruby Grapefruit",
    price: 1.99,
    category: "fruit"
});

grapefruit.save();
```

## Products Index
GET all products and list them on the index page at `/products`.
```js
app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
})
```

Show all product names on `index.ejs` page.
```html
<h1>All Products</h1>
<ul>
    <% for (let product of products) { %>
    <li><%= product.name %></li>
    <% } %>
</ul>
```

## Product Details
GET single product details on a show page at `products/:id`.
```js
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product });
})
```

Show single product details on `show.ejs` page.
```html
<h1><%= product.name %></h1>
<ul>
    <li>Price: $<%= product.price %></li>
    <li>Category: <%= product.category %></li>
</ul>
```

Update `index.ejs` adding anchor tags on each product to their show page.
```html
<h1>All Products</h1>
<ul>
    <% for (let product of products) { %>
    <li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
    <% } %>
</ul>
```

## Creating Products
Create a `products/new` route to serve a new product form.
```js
app.get("/products/new", (req, res) => {
    res.render("products/new");
});
```

Create a `new.ejs` page containing the new product form.
```html
<h1>Add a Product</h1>
<form action="/products" method="POST">
    <label for="name">Product Name</label>
    <input type="text" name="name" id="name" placeholder="product name">
    <label for="price">Price (Unit)</label>
    <input type="number" name="price" id="price" placeholder="price">
    <label for="category">Select Category</label>
    <select name="category" id="category">
        <option value="fruit">fruit</option>
        <option value="vegetable">vegetable</option>
        <option value="dairy">dairy</option>
    </select>
    <button>Submit</button>
</form>
```

POST a new product from the `products/new` endpoint to add a new product to the database and redirect to the product show page `products/:id`.
```js
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${ newProduct._id }`);
});
```

Ensure Express middleware is used to access POST data.
```js
app.use(express.urlencoded({ extended: true }));
```

Update `index.ejs` adding anchor tag to New Product page.
```html
<h1>All Products</h1>
<ul>
    <% for (let product of products) { %>
    <li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
    <% } %>
</ul>
<a href="products/new">New Product</a>
```

## Updating Products
Create an edit endpoint to a single product by id `products/:id/edit` to retrieve an edit form.
```js
app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
})
```

Create an edit form using a PUT request.
```html
<h1>Edit Product</h1>
<form action="/products/<%= product._id %>?_method=PUT" method="POST">
    <label for="name">Product Name</label>
    <input type="text" name="name" id="name" placeholder="product name" value="<%= product.name %>">
    <label for="price">Price (Unit)</label>
    <input type="number" name="price" id="price" placeholder="price" value="<%= product.price %>">
    <label for="category">Select Category</label>
    <select name="category" id="category">
        <option value="fruit">fruit</option>
        <option value="vegetable">vegetable</option>
        <option value="dairy">dairy</option>
    </select>
    <button>Submit</button>
</form>
<a href="/products/<%= product._id %>">Cancel</a>
```

Ensure that [`method-override`](https://expressjs.com/en/resources/middleware/method-override.html) is installed to use methods other than GET and POST in an HTML form.
```bash
$ npm i method-override
```

Require `method-override` and use it as middleware.
```js
const methodOverride = require("method-override");
// ...
app.use(methodOverride("_method"));
```

PUT a new product from the `products/:id` endpoint to edit an existing product in the database using [`findByIdAndUpdate`](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()) and redirect to the product show page `products/:id`.
```js
app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${ product._id }`);
})
```

Update `show.ejs` adding anchor tag to product Edit page.
```html
<h1><%= product.name %></h1>
<ul>
    <li>Price: $<%= product.price %></li>
    <li>Category: <%= product.category %></li>
</ul>
<a href="/products">All Products</a>
<a href="/products/<%= product._id %>/edit">Edit Product</a>
```

## Category Selector
To ensure the proper category is `selected` on the edit page, either add conditional logic to each category, or use a loop to display all categories with the selected category matching the same conditional logic.

Add conditional logic to each category (not recommended due to duplication and extension difficulties).
```html
<h1>Edit Product</h1>
<form action="/products/<%= product._id %>?_method=PUT" method="POST">
    <label for="name">Product Name</label>
    <input type="text" name="name" id="name" placeholder="product name" value="<%= product.name %>">
    <label for="price">Price (Unit)</label>
    <input type="number" name="price" id="price" placeholder="price" value="<%= product.price %>">
    <label for="category">Select Category</label>
    <select name="category" id="category">
        <option value="fruit" <%= product.category === "fruit" ? "selected" : "" %>>fruit</option>
        <option value="vegetable" <%= product.category === "vegetable" ? "selected" : "" %>>vegetable</option>
        <option value="dairy" <%= product.category === "dairy" ? "selected" : "" %>>dairy</option>
    </select>
    <button>Submit</button>
</form>
<a href="/products/<%= product._id %>">Cancel</a>
```

Loop over all categories and select the the category matching the conditional logic (recommended).
1. Add `categories` array to `index.js` and pass to `edit.ejs`.
```js
const categories = ["fruit", "vegetable", "dairy"];
// ...
app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
})
```

2. Refactor `edit.ejs` to add categories to the `select` menu by looping and add conditional logic to select the product category to display.
```html
<h1>Edit Product</h1>
<form action="/products/<%= product._id %>?_method=PUT" method="POST">
    <label for="name">Product Name</label>
    <input type="text" name="name" id="name" placeholder="product name" value="<%= product.name %>">
    <label for="price">Price (Unit)</label>
    <input type="number" name="price" id="price" placeholder="price" value="<%= product.price %>">
    <label for="category">Select Category</label>
    <select name="category" id="category">
            <% for (category of categories) { %>
        <option value="<%= category %>" <%= product.category === category ? "selected" : "" %>><%= category %>
        </option>
            <% } %>
    </select>
    <button>Submit</button>
</form>
<a href="/products/<%= product._id %>">Cancel</a>
```

Note that `new.ejs` was also updated to use similar looping logic to fill the `select` menu.

## Deleting Products
Add Delete button to `show.ejs` using a POST `form` overridden with a DELETE method.
```html
<h1><%= product.name %></h1>
<ul>
    <li>Price: $<%= product.price %></li>
    <li>Category: <%= product.category %></li>
</ul>
<a href="/products">All Products</a>
<a href="/products/<%= product._id %>/edit">Edit Product</a>
<form action="/products/<%= product._id %>?_method=DELETE" method="POST">
    <button>Delete</button>
</form>
```

Add DELETE route to `products/:id` in `index.js`, delete product from database using [`findByIdAndDelete`](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()), then redirect to index page.
```js
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})
```

## Filtering By Category
To filter by category requires either a url with a `/dairy` endpoint or a url with a query string `?category=:category`. In general, query strings are used to filter or search a subset of information whereas an endpoint provides access to an entire resource.

Add an anchor tag to the category value in the `show.ejs` page.
```html
<h1><%= product.name %></h1>
<ul>
    <li>Price: $<%= product.price %></li>
    <li>Category: <a href="/products?category=<%= product.category %>"><%= product.category %></a></li>
</ul>
<a href="/products">All Products</a>
<a href="/products/<%= product._id %>/edit">Edit Product</a>
<form action="/products/<%= product._id %>?_method=DELETE" method="POST">
    <button>Delete</button>
</form>
```

Update the GET route `products` to look for a `category` query, and if found pass the category to `index.ejs`, otherwise, pass `"All"`.
```js
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
```

Update the `index.ejs` page `h1` to show the category name if a category query exists and add a link to return to the All Products view only if on a specific category Products view.
```html
<h1><%= category %> Products</h1>
<ul>
    <% for (let product of products) { %>
    <li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
    <% } %>
</ul>
<a href="products/new">New Product</a>
<% if (category !== "All") { %>
<a href="/products">All Products</a>
<% } %>
```