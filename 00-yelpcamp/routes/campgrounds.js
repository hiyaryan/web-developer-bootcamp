const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, validateCampground, isAuthorized } = require("../middleware")

const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthorized, validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthorized, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthorized, catchAsync(campgrounds.renderEditForm));

module.exports = router;