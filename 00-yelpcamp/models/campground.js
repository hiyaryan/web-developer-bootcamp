const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

// required to include virtuals in response object
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

// created for cluster map
CampgroundSchema.virtual("properties.popupMarkup").get(function () {
    return `
    <strong><a href="/campgrounds/${ this._id }">${ this.title }</a></strong>
    <p>${ this.description.substring(0, 30) }...</p>
    `
});

CampgroundSchema.post("findOneAndDelete", async function (campground) {
    if (campground) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);