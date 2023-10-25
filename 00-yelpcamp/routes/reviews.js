const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews")

// post a new campground review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

// delete campground review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;