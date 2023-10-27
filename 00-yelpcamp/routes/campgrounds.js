const express = require("express");
const multer = require("multer");

const { isLoggedIn, validateCampground, isAuthorized } = require("../middleware")

const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");

const { storage } = require("../cloudinary");

const router = express.Router({ mergeParams: true });
const upload = multer({ storage });

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthorized, upload.array("image"), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthorized, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthorized, catchAsync(campgrounds.renderEditForm));

module.exports = router;