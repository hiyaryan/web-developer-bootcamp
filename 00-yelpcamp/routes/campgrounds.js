const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, validateCampground, isAuthorized } = require("../middleware")

const catchAsync = require("../utils/catchAsync");

const Campground = require("../models/campground");

// show all
router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}));

// get post new form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// post new
router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!")
    res.redirect(`/campgrounds/${ campground._id }`);
}));

// show one
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}));

// get edit one form
router.get("/:id/edit", isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}));

// put edit
router.put("/:id", isLoggedIn, isAuthorized, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash("success", "Successfully updated the campground!")
    res.redirect(`/campgrounds/${ campground._id }`);
}));

// delete
router.delete("/:id", isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted the campground!')
    res.redirect("/campgrounds");
}));

module.exports = router;