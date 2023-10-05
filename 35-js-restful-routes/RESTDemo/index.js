const express = require("express");
const path = require("path");

const app = express();
app.set("views", path.join(__dirname, "views"));

// tell express to parse incoming data as urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/tacos", (req, res) => {
    res.send("GET TACOS")
})

app.post("/tacos", (req, res) => {
    const { meat, qty } = req.body;
    res.send(`POST TACOS. Here are you ${qty} ${meat} tacos!`);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

