const express = require("express");
const passport = require("passport");

const { storeReturnTo } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");

const router = express.Router();

router.route("/register")
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

// logout a user
router.get("/logout", users.logout);

module.exports = router;