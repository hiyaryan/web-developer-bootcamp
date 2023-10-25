const Campground = require("./models/campground");
const Review = require("./models/reviews");

const { campgroundSchema, reviewSchema } = require("./schemas");

const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed first!")
        return res.redirect("/login");
    }

    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }

    next();
}

// can perform authorized action
module.exports.isAuthorized = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${ id }`);
    }

    next();
}

// can perform authorized action
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${ id }`);
    }

    next();
}

// data validation for a campground
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(er => er.message).join(',');
        throw new ExpressError(400, msg);
    }

    next();
}

// data validation for a review
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(er => er.message).join(',');
        throw new ExpressError(400, msg);
    }

    next();
}