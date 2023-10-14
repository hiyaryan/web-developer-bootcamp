const express = require("express");
const morgan = require("morgan");

const app = express();

// Use morgan to log connection info on every request
app.use(morgan("dev"));

// rewriting morgan middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
});

// make every request a GET request
// app.use((req, res, next) => {
//     req.method = "GET";
//     next();
// })

// decorating the request object with the time
app.use((req, res, next) => {
    req.requestTime = Date.now()
    next();
});

// run middleware only on specific paths
// note: runs for any HTTP verb
app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS!");
    next();
});

// basic authentication called on every path
// app.use((req, res, next) => {
//     const { password } = req.query;
//     if (password === "chickennugget") {
//         next()
//     }

//     res.send("SORRY YOU NEED A PASSWORD!")
// })

// basic authentication called on a specific path
// app.use((req, res, next) => {
//     if (req.path === "/secret") {
//         const { password } = req.query;
//         if (password === "chickennugget") {
//             next()
//         }

//         res.send("SORRY YOU NEED A PASSWORD!")
//     }
// })

// basic authentication stored as a callback that can be passed to a particular route
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next()
    }

    res.send("SORRY YOU NEED A PASSWORD!")
}

// hijacking the response using middleware
// app.use((req, res, next) => {
//     // only one response can be sent
//     res.send("HIJACKED BY MY APP.US");
//     // does not execute because send ends the cycle above
//     next();
// })

// Runs on every request
// app.use(() => {
//     console.log("HEYYY!");
// })

// Chaining middleware 
// app.use((req, res, next) => {
//     console.log("This is my first middleware!");
//     next();
//
//     console.log("Prints after all next middleware are executed");
// })

// app.use((req, res, next) => {
//     console.log("This is my second middleware!");
//     return next();
//
//     return next above to ensure other code doesn't execute below
//     console.log("Will not print.");
// })

// app.use((req, res, next) => {
//     console.log("This is my third middleware!");
//     return next();
// })

app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${ req.requestTime }`);
    res.send("Home page")
});

app.get("/dogs", (req, res) => {
    res.send(`Woof Woof! It's ${ req.requestTime }`)
});

// does not run for /dogs because it is defined after GET from /dogs
// app.use((req, res, next) => {
//     req.requestTime = Date.now()
//     next();
// });

// get route with callback verifyPassword middleware function that is automatically ran in between request and response
// note that `next()` is required inside of the middleware function in order for this get request to execute
app.get("/secret", verifyPassword, (req, res) => {
    res.send("HERE IS THE SECRET CODE: 1011")
})

// last ditch effort 404 not found middleware
app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
});

app.listen(3000, () => {
    console.log("App is running on localhost:3000");
});