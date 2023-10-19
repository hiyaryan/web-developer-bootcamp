# Section 45: Mongo Relationships with Express

- [Defining Farm and Product Models](#defining-farm-and-product-models)
- [Creating New Farms](#creating-new-farms)
- [Farms Show Page](#farms-show-page)
- [Creating Products for a Farm](#creating-products-for-a-farm)
- [Finishing Touches](#finishing-touches)
- [Deletion Mongoose Middleware](#deletion-mongoose-middleware)

## Defining Farm and Product Models
This section exports code from section 38, `ProductApp`. It extends it to demonstrate Mongo relationships with Express between multiple farms and the products they have.

Added to `ProductApp` is a route to add new farms and an updated new `Product` model. Both collections will reference each other with Products referencing a single farm and any Farm referencing multiple products for a two way relationship from both directions.

Farm schema
```js
const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm must have a name!"]
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});
```

Product schema
```js
const productSchema = new Schema({
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
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: "Farm"
    }
})
```

## Creating New Farms
All farms can be viewed at `/farms` with a corresponding `index.ejs` view.
```js
app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
});
```

New farms can be created at the following routes with a corresponding `new.ejs` view.
```js
app.get("/farms/new", (req, res) => {
    res.render("farms/new");
})

app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
});
```

## Farms Show Page
A single farm can be viewed at `/farms/:id` with a corresponding `show.ejs` view.
```js
app.get("/farms/:id", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("farms/show", { farm });
});
```

## Creating Products for a Farm
Create a product for a specific farm at the following routes.
- Get the new product form for a specific farm served from `products/new.ejs`: `/farms/:farm_id/products/new`
```js
app.get("/farms/:farm_id/products/new", (req, res) => {
    const { farm_id } = req.params;
    res.render("products/new", { categories, farm_id });
})
```
- Post the product to a specific farm: `/farms/:farm_id/products`
```js
app.post("/farms/:farm_id/products", async (req, res) => {
    const { farm_id } = req.params;
    const farm = await Farm.findById(farm_id);
    const product = new Product(req.body);

    // creates a two way relationship between the farm and product
    farm.products.push(product);
    product.farm = farm;

    await farm.save();
    await product.save();

    res.redirect(`/farms/${ farm_id }`);
});
```

## Finishing Touches
- Adds the ability to add products to a farm on the farm show page using an `<a>` to the farm specific product form.
- Uses `populate()` on a farm object from its index page to show all products for a given farm on its show page.
```js
const farm = await Farm.findById(id).populate("products");
```
- Updates the new product page at `/farms/:farm_id/products/new` to show which farm the product is being added to.
- Adds the ability to click an `<a>` on the product of a farm and view the products show page.
- Uses `populate()` on a product object from its show page to show the name of the farm that has that product.
```js
const product = await Product.findById(id).populate("farm", "name");
```

## Deletion Mongoose Middleware
When a deletion occurs between documents that have a relationship, it has to be determined what happens to the documents if one of them are deleted. This should be on a case-by-case basis.

For the ProductApp, if a farm is deleted, all of the products associated with that farm should be deleted. If a product is deleted, nothing should happen to the farm.

[Mongoose Middleware](https://mongoosejs.com/docs/middleware.html) can be used to trigger a particular event in an Express app after an action occurs. In this case, after a deletion of a farm occurs, Mongoose middleware should trigger additional deletions.

The [`findByIdAndDelete`](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()) method used to delete a farm triggers the [`findOneAndDelete`](https://mongoosejs.com/docs/api/query.html#Query.prototype.findOneAndDelete()) middleware that should be added to the farm schema.

A deletion route to a specific farm.
```js
app.delete("/farms/:id", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect("/farms");
});
```

The Mongoose middleware triggered on a farm after a `findByIdAndDelete` method is executed.
```js
farmSchema.post("findOneAndDelete", async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } });
        console.log(res);
    }
});
```