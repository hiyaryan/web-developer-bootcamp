const User = require("../models/user");

// get registration form
module.exports.renderRegisterForm = (req, res) => {
    res.render("users/register");
};

// register a new user
module.exports.register = async (req, res) => {
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
};

// get login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

// login a user
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");

    const redirectUrl = res.locals.returnTo || "/campgrounds";
    delete res.locals.returnTo;

    res.redirect(redirectUrl);
};

// logout a user
module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
};