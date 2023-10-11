const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/personApp')
    .then(() => {
        console.log("Connected to MongoDB port 27017.");
    })
    .catch((e) => {
        console.log("Error", e);
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String,
});

personSchema.virtual("fullName")
    .get(function () {
        return `${ this.first } ${ this.last }`;
    })
    .set(function (v) {
        this.first = v.substr(0, v.indexOf(' '));
        this.last = v.substr(v.indexOf(' ') + 1);
    });

// applying pre middleware that runs before save()
personSchema.pre("save", async function () {
    this.first = "YO";
    this.last = "MAMA";
    console.log("ABOUT TO SAVE!");
})

// applying post middleware that runs after save()
personSchema.post("save", async function () {
    console.log("JUST SAVED!");
})

const Person = mongoose.model("Person", personSchema);

const tammy = new Person({ first: "Tammy", last: "Chow" });
// tammy.save();

// using virtual getter to get the full name using the fullName property
console.log(tammy.fullName);

// using virtual setter to update name using the fullName property
tammy.fullName = "Tammy Xiao";
tammy.save().then((p) => { console.log(p); });

const kristen = new Person({ first: "Kristen", last: "Sun" });
kristen.save().then((p) => { console.log(p); });