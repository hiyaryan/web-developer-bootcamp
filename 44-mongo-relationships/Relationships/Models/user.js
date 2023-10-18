// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipsDemo');
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            // _id: { id: false }, // turn of Mongo ID creation
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter"
    });
    u.addresses.push({
        street: "123 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA",
    });
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "99 3rd St.",
        city: "New York",
        state: "NY",
        country: "USA",
    });
    const res = await user.save();
    console.log(res);
}

// make a new user
// makeUser();

/*
{ "_id" : ObjectId("65301da1ea6e1b6410b7cf2c"), "first" : "Harry", "last" : "Potter", "addresses" : [ { "street" : "123 Sesame St.", "city" : "New York", "state" : "NY", "country" : "USA", "_id" : ObjectId("65301da1ea6e1b6410b7cf2d") } ], "__v" : 0 }
*/

// add new address to user document above
// addAddress("65301da1ea6e1b6410b7cf2c")

/*
{ "_id" : ObjectId("65301da1ea6e1b6410b7cf2c"), "first" : "Harry", "last" : "Potter", "addresses" : [ { "street" : "123 Sesame St.", "city" : "New York", "state" : "NY", "country" : "USA", "_id" : ObjectId("65301da1ea6e1b6410b7cf2d") }, { "street" : "99 3rd St.", "city" : "New York", "state" : "NY", "country" : "USA", "_id" : ObjectId("65301df5e11b7f9021873ca8") } ], "__v" : 1 }

*/