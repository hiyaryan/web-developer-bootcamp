const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

// show all campgrounds
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
};

// get the new campground form
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

// create a new campground
module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!")
    res.redirect(`/campgrounds/${ campground._id }`);
};

// show one campground
module.exports.showCampground = async (req, res) => {
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
};

// get the edit campground form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
};

// edit an existing campground
module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });

    // add new images
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();

    // delete selected images
    if (req.body.deleteImages) {
        // delete from cloud
        await req.body.deleteImages.forEach(img => {
            cloudinary.uploader.destroy(img);
        })
        // delete from database
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }

    req.flash("success", "Successfully updated the campground!")
    res.redirect(`/campgrounds/${ campground._id }`);
};

// delete a campground
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted the campground!")
    res.redirect("/campgrounds");
};