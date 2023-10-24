const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/authDemo")
    .then(() => {
        console.log("Serving authDemo MongoDB on port 27017");
    })
    .catch(e => {
        console.log("MongoDB Error!")
        console.log(e);
    });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login");
    }

    next();
}

app.get("/", (req, res) => {
    res.send("INDEX");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    req.session.user_id = user._id;
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        return res.redirect("/secret");
    }

    res.redirect("/login");
});

app.post("/logout", (req, res) => {
    // set user_id to null to logout
    // req.session.user_id = null;

    // or destroy all session variables
    req.session.destroy();

    res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res) => {
    res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
    res.send("TOP SECRET!");
});

app.listen(3000, () => {
    console.log(("Serving app on port 3000"));
});