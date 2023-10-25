const express = require("express");
const passport = require("passport");

const { storeReturnTo } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });

        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to Yelp Camp!");
            res.redirect("/campgrounds");
        });

    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/register");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login");
})

router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash("success", "Welcome back!");

    const redirectUrl = res.locals.returnTo || "/campgrounds";
    delete res.locals.returnTo;

    res.redirect(redirectUrl);
})

router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
});

module.exports = router;