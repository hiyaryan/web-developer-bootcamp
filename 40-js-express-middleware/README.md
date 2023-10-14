# Section 40: Express Middleware

- [Express Middleware Intro](#express-middleware-intro)
- [Logger Middleware: Morgan](#logger-middleware-morgan)
- [Defining Custom Middleware](#defining-custom-middleware)
- [Middleware Practice](#middleware-practice)
- [Setting Up a 404 Route](#setting-up-a-404-route)
  - [`app.use([path,] callback [, callback...])`](#appusepath-callback--callback)
  - [404 Route](#404-route)
- [Password Middleware Demo](#password-middleware-demo)
- [Protecting Specific Routes](#protecting-specific-routes)

## Express Middleware Intro
[Express middleware](https://expressjs.com/en/guide/using-middleware.html) are functions that run during the request/response lifecycle.

- Middleware are just functions.
- Each middleware has access to the request and response objects.
- Middleware can end the HTTP request by sending back a response with methods like `res.send()`.
- Middleware can be chained together, one after another by calling `next()`.

An Express application can use the following types of middleware:
- [Application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application)
- [Router-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router)
- [Error-handling middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)
- [Built-in middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in)
- [Third-party middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.third-party)


## Logger Middleware: Morgan
[Morgan](https://www.npmjs.com/package/morgan) is an HTTP request logger middleware for node.js.

```js
morgan(format, options)
```
Create a new morgan logger middleware function using the given `format` and `options`. The `format` argument may be a string of a predefined name (see below for the names), a string of a format string, or a function that will produce a log entry.

The `format` function will be called with three arguments `tokens`, `req`, and `res`, where tokens is an object with all defined `tokens`, `req` is the HTTP request and `res` is the HTTP response. The function is expected to return a string that will be the log line, or `undefined` / `null` to skip logging.

Example of using Morgan and the `tiny` option in a server.
```js
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));
```

Example of Morgan logging after any request is made.
```bash
GET / 304 - - 2.653 ms
GET /dogs 200 10 - 1.061 ms
GET /cats 404 143 - 3.608 ms
```

## Defining Custom Middleware
Defining custom middleware simply requires inserting some function inside of the use method of an express app.

Example where every request at any endpoint has the same response.
```js
const express = require("express");
const app = express();

app.use((req, res) => {
    res.send("HIJACKED BY APP.USE!")
});
```

### [Writing middleware for use in Express apps](https://expressjs.com/en/guide/writing-middleware.html)
***Middleware*** functions are functions that have access to the [request object](https://expressjs.com/en/4x/api.html#req) (`req`), the [response object](https://expressjs.com/en/4x/api.html#res) (`res`), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

To load a middleware function, call `app.use()`, specifying the middleware function.

Standard middleware function signature.
```js
app.get("/", function(req, res, next) {...})
```
- `req` - HTTP [request](https://expressjs.com/en/4x/api.html#req) argument to the middleware function, called "req" by convention.
- `res` - HTTP [response](https://expressjs.com/en/4x/api.html#res) argument to the middleware function, called "res" by convention.
- `next` - Callback argument to the middleware function, called "next" by convention.

Example loading a `myLogger` middleware function before the route to the root path (`/`). Every time the app receives a request, it prints the message “LOGGED” to the terminal.
```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

The order of middleware loading is important: middleware functions that are loaded first are also executed first.

If `myLogger` is loaded after the route to the root path, the request never reaches it and the app doesn’t print “LOGGED”, because the route handler of the root path terminates the request-response cycle.

The middleware function `myLogger` simply prints a message, then passes on the request to the next middleware function in the stack by calling the `next()` function.

Example adding the [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) method to every request and response object using custom middleware.
```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

## Middleware Practice
Basic practices for writing middleware.
- Ensure `next()` is called after every block of middleware otherwise the request will be left hanging and a response will never be returned.
- `return next()` so that it ends the execution of the middleware, otherwise code added after it will be executed after all middleware is executed.
- Define middleware before any HTTP methods that require it otherwise the middleware will not be executed.
- Decorate the request object with more key-value pairs such as with the current Date, `req.requestTime = Date.now()`

## Setting Up a 404 Route
### [`app.use([path,] callback [, callback...])`](https://expressjs.com/en/4x/api.html#app.use)
Mounts the specified [middleware](https://expressjs.com/guide/using-middleware.html) function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <ul><li>A string representing a path.</li> <li>A path pattern.</li> <li>A regular expression pattern to match paths.</li> <li>An array of combinations of any of the above.</li></ul> For examples, see [Path examples](https://expressjs.com/en/4x/api.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | '/' (root path) |
| callback | Callback functions; can be: <ul><li>A middleware function.</li> <li>A series of middleware functions (separated by commas)</li> <li>An array of middleware functions.</li> <li>A combination of all of the above.</li></ul> You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route. <br><br> Since [router](https://expressjs.com/en/4x/api.html#router) and [app](https://expressjs.com/en/4x/api.html#application) implement the middleware interface, you can use them as you would any other middleware function. <br><br> For examples, see [Middleware callback function examples](https://expressjs.com/en/4x/api.html#middleware-callback-function-examples). | None            |

### 404 Route
Add a 404 middleware route to the end of an API for a last ditch effort to catch all invalid requests. 

A valid request will have a response ending the `next` cycle. A 404 route at the end of a file can catch all other requests and end the cycle.

404 route returning a custom message.
```js
// 404
app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
});

app.listen(3000, () => {
    console.log("App is running on localhost:3000");
});
```

Note that [status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) can be added/updated by passing a number to `res.status()`.

## Password Middleware Demo
Middleware can be used to protect routes with some authentication.

Example of *insecure* authentication using a query string.
```js
// middleware to for authentication
app.use("/secret", (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next()
    }

    res.send("SORRY YOU NEED A PASSWORD!")
});

// path to secret
app.get("/secret", (req, res) => {
    res.send("HERE IS THE SECRET CODE: 1011")
})
```

## Protecting Specific Routes
There are a few approaches to protecting specific routes.

1. (not recommended) Check the path using conditionals.
```js
app.use((req, res, next) => {
    if (req.path === "/secret") {
        const { password } = req.query;
        if (password === "chickennugget") {
            next()
        }

        res.send("SORRY YOU NEED A PASSWORD!")
    } else {
        next()
    }
})
```

2. (recommended) Define a middleware function then pass it as a callback to a specific route. If the `next()` function is called then the HTTP method on that route is executed, otherwise, it is not.
```js
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next()
    }

    res.send("Password is incorrect.")
}

app.get("/secret", verifyPassword, (req, res) => {
    res.send("HERE IS THE SECRET CODE: 1011")
})
```