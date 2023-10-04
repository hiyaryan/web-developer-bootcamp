const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/cats", (req, res) => {
    const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
    res.render("cats", { cats });
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;

    // takes a key-value pair
    res.render("random", { num });
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});