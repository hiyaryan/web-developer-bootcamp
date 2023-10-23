const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const Campground = require("../models/campground");
const Review = require("../models/reviews");

const { reviewSchema } = require("../schemas");

// data validation for a review
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(er => er.message).join(',');
        throw new ExpressError(400, msg);
    }

    next();
}
// post a new review
router.post("/", validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);

    campground.reviews.push(review);

    await review.save();
    await campground.save();

    req.flash('success', 'Created a new review!')
    res.redirect(`/campgrounds/${ id }`);
}));

// delete campground review
router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // retrieve a campground and pull the review from it
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // delete the review
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Deleted the review!')
    res.redirect(`/campgrounds/${ id }`);
}));

module.exports = router;