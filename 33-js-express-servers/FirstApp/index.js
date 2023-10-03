// First express app
const express = require("express");
const app = express()

console.dir(app);

// `use` matches every request 
// app.use((req, res) => {
//     console.dir(req);
//     console.log("We got a new request!");
//     res.send("<h1>HELLO WE GOT YOUR REQUEST! THIS IS A RESPONSE!</h1>")
//     // res.send({ color: "red" }) // content-type: application/json
// })

// Paths
app.get("/cats", (req, res) => {
    console.log("CAT REQUEST");
    res.send("MEOW!")
})

app.post("/cats", (req, res) => {
    res.send("CAT POST REQUEST")
})

app.get("/dogs", (req, res) => {
    console.log("DOG REQUEST");
    res.send("WOOF!")
})

app.get("/", (req, res) => {
    console.log("HOME REQUEST");
    res.send("Welcome to the home page!")
})

// Path parameters
app.get("/r/:subreddit", (req, res) => {
    console.log(req.params);
    const { subreddit } = req.params
    res.send(`<h1>Browsing the subreddit ${subreddit}</h1>`)
})

app.get("/r/:subreddit/:postId", (req, res) => {
    console.log(req.params);
    const { subreddit, postId } = req.params
    res.send(`<h1>Browsing the subreddit ${subreddit} Post ID: ${postId}</h1>`)
})

// Query Strings
app.get("/search", (req, res) => {
    console.log(req.query);
    const { q } = req.query

    if (!q) {
        res.send("NOTHING FOUND")
    }

    res.send(`<h1>You searched for ${q}</h1>`)
})

// catch all for undefined paths
app.get("*", (req, res) => {
    console.log("UNDEFINED PATH");
    res.send("I don't know the route to that path!")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})