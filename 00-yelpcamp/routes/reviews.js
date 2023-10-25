const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

const catchAsync = require("../utils/catchAsync");

const Campground = require("../models/campground");
const Review = require("../models/reviews");

// post a new review
router.post("/", isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);

    review.author = req.user._id;

    campground.reviews.push(review);

    await review.save();
    await campground.save();

    req.flash('success', 'Created a new review!')
    res.redirect(`/campgrounds/${ id }`);
}));

// delete campground review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // retrieve a campground and pull the review from it
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // delete the review
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Deleted the review!')
    res.redirect(`/campgrounds/${ id }`);
}));

module.exports = router;