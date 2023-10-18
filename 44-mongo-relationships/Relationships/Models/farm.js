// getting-started.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipsDemo');
}

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"]
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// seeding product data
// Product.insertMany([
//     { name: "Goddess Melon", price: 4.99, season: "Summer" },
//     { name: "Sugar Baby Watermelon", price: 4.99, season: "Summer" },
//     { name: "Asparagus", price: 3.99, season: "Spring" }
// ]);

// seeding farm data
const makeFarm = async () => {
    const farm = new Farm({ name: "Full Belly Farms", cit: "Guinda, CA" });
    const melon = await Product.findOne({ name: "Goddess Melon" });
    farm.products.push(melon);
    const res = await farm.save();
    console.log(res);
}

// After having defined a reference to Product in the Schema, adding a product to the farm returns a reference to the product in the Products collection
/*
{ "_id" : ObjectId("6530253046f0146bdb21a6f7"), "name" : "Full Belly Farms", "products" : [ ObjectId("653021ebab63ac2a7c9bc02a") ], "__v" : 0 }
*/

// makeFarm();

// adding all products to the farm as references
const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Full Belly Farms" });

    const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
    farm.products.push(watermelon);

    const asparagus = await Product.findOne({ name: "Asparagus" });
    farm.products.push(asparagus);

    const res = await farm.save();
    console.log(res);
}

// addProduct();

// result
/*
{
  _id: new ObjectId("6530253046f0146bdb21a6f7"),
  name: 'Full Belly Farms',
  products: [
    new ObjectId("653021ebab63ac2a7c9bc02a"),
    new ObjectId("653021ebab63ac2a7c9bc02b"),
    new ObjectId("653021ebab63ac2a7c9bc02c")
  ],
  __v: 1
}
*/

// populating Farm with products
Farm.findOne({ name: 'Full Belly Farms' })
    .populate("products")
    .then(farm => console.log(farm));