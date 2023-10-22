const express = require("express");
const session = require("express-session");

const app = express();
// app.use(session({ secret: "thisisnotagoodsecret" }));

app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true
}));

app.get("/viewcount", (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${ req.session.count } times.`);
});

app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    const { username } = req.session;
    res.send(`Hi, ${ username }`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});