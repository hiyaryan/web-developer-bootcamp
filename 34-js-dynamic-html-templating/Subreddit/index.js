const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    res.render("subreddit", { subreddit })
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})