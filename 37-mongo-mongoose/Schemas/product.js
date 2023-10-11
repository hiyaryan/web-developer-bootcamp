const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log("Connected to MongoDB port 27017.");
    })
    .catch((e) => {
        console.log("Error", e);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive.']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String], // array of only String
    // categories: {
    //     type: [String],
    //     default: ["cycling"]
    // }
    qty: {
        online: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

// custom instance methods
productSchema.methods.greet = function () {
    console.log("HELLO!! HI!! HOWDY!!");
    console.log(`- from ${ this.name }`);
};

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    this.save();
}

// instance methods
productSchema.statics.fireSale = function () {
    this.updateMany({}, { onSale: true, price: 0 })
        .then(res => {
            console.log("Fire Sale!!");
        }).catch(e => {
            console.log("Error", e);
        });
}

const Product = mongoose.model("Product", productSchema);
const bike = new Product({ name: "Mountain Bike", price: 599 });
const bikeHelmet = new Product({ name: "Bike Helmet", price: 29.50, categories: ["Cycling", "Safety"] });
const tirePump = new Product({ name: "Tire Pump", price: 19.50, categories: ["Cycling"] });

// ValidatorError: `XS` is not a valid enum value for path `size`
// const cyclingJersey = new Product({ name: "Cycling Jersey", price: 28.50, categories: ["Cycling"], size: 'XS' });
const cyclingJersey = new Product({ name: "Cycling Jersey", price: 28.50, categories: ["Cycling"], size: 'S' });

// Invalid documents caught by validation
// const bike = new Product({ price: 599 }); // Error: Path `name` is required.

// const bike = new Product({ name: "Mountain Bike", price: "Hello" }); // Error: Cast to Number failed.

// Invalid document caught by schema outline
// const bike = new Product({ name: "Mountain Bike", price: 999, color: red }); // Works but excludes key-values not included in Schema

bike.save()
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(e => {
        console.log("Error", e);
    })

bikeHelmet.save()
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(e => {
        console.log("Error", e);
    })

tirePump.save()
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(e => {
        console.log("Error", e);
    })

cyclingJersey.save()
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(e => {
        console.log("Error", e);
    })


Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 100 }, { new: true, runValidators: true })
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(e => {
        console.log("Error", e);
    })

// Error: Validation failed: price: Path `price` (-100) is less than minimum allowed value (0).
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -100 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("It worked!");
//         console.log(data);
//     })
//     .catch(e => {
//         console.log("Error", e);
//     })

// using an instance method
// findProduct()