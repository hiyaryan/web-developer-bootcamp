const express = require("express");
const morgan = require("morgan");
const AppError = require("./AppError");

const app = express();

// Use morgan to log connection info on every request
app.use(morgan("dev"));

// rewriting morgan middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
});

// decorating the request object with the time
app.use((req, res, next) => {
    req.requestTime = Date.now()
    next();
});

app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS!");
    next();
});

// basic authentication
// errors can be thrown within a callback middleware function
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next()
    }

    // res.send("SORRY YOU NEED A PASSWORD!")

    // res.status(401);
    // throw new Error("Password required!")

    // using the custom AppError class
    throw new AppError(401, "Password required!");
}

app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${ req.requestTime }`);
    res.send("Home page")
});

app.get("/error", (req, res) => {
    chicken.fly();
});

app.get("/dogs", (req, res) => {
    res.send(`Woof Woof! It's ${ req.requestTime }`)
});

app.get("/secret", verifyPassword, (req, res) => {
    res.send("HERE IS THE SECRET CODE: 1011")
})

app.get("/admin", (req, res) => {
    throw new AppError(403, "You are not an admin!");
})

// 404 route
app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
});

// error middleware
// app.use((err, req, res, next) => {
//     console.log("***************************************");
//     console.log("*****************ERROR*****************");
//     console.log("***************************************");

//     // deal with the error here
//     // res.status(500).send("We have an error!!");

//     console.log(err);

//     // pass the error to the default error handler
//     next(err);
// })

// errors can be thrown within middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log("App is running on localhost:3000");
});