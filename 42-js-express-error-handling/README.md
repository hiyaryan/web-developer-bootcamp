# Section 42: Handling Errors in Express Apps

- [Express' Built-In Error Handler](#express-built-in-error-handler)
  - [The default error handler](#the-default-error-handler)
- [Defining Custom Error Handlers](#defining-custom-error-handlers)
  - [Writing error handlers](#writing-error-handlers)
- [Custom Error Class](#custom-error-class)
- [Handling Async Errors](#handling-async-errors)
- [Handling More Async Errors](#handling-more-async-errors)
- [Defining An Async Utility](#defining-an-async-utility)
- [Differentiating Mongoose Errors](#differentiating-mongoose-errors)

## Express' Built-In Error Handler
When an error occurs, if there is no custom error handling defined, Express will respond with a [default error handler](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler) returning an HTML error message to the client.

Example of an Express default error handler response for a 500 internal server error.
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>ReferenceError: chicken is not defined<br> &nbsp; &nbsp;at /Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/index.js:42:5<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/route.js:144:13)<br> &nbsp; &nbsp;at Route.dispatch (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/route.js:114:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/index.js:284:15<br> &nbsp; &nbsp;at Function.process_params (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/index.js:346:12)<br> &nbsp; &nbsp;at next (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/index.js:280:10)<br> &nbsp; &nbsp;at /Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/index.js:18:5<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ryan/Dev/web-developer-bootcamp/42-js-express-error-handling/ErrorHandling/node_modules/express/lib/router/layer.js:95:5)</pre>
</body>
</html>
```

### [The default error handler](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler)
Anytime Express encounters and error, whether or not Express catches it itself, or a `new Error` is thrown, if a custom handler is not defined, Express will handle it with its default error handler.

Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to `next()` and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.

When an error is written, the following information is added to the response:
- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

## Defining Custom Error Handlers
Express allows custom error handlers to be defined using middleware functions.

### [Writing error handlers](https://expressjs.com/en/guide/error-handling.html#writing-error-handlers)

Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: `(err, req, res, next)`.
```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

You define error-handling middleware last, after other `app.use()` and routes calls.
```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

Responses from within a middleware function can be in any format, such as an HTML error page, a simple message, or a JSON string.

For organizational (and higher-level framework) purposes, you can define several error-handling middleware functions, much as you would with regular middleware functions. 

Define an error-handler for requests made by using XHR and those without.
```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// write request and error information to stderr
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

// when not calling “next” in an error-handling function, you are responsible for writing (and ending) the response, otherwise those requests will “hang” and will not be eligible for garbage collection
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

// the “catch-all” errorHandler function
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions you can use the route parameter to skip to the next route handler.

Example where the `getPaidContent` handler will be skipped but any remaining handlers in `app` for `/a_route_behind_paywall` would continue to be executed.
```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

Note the difference between `next()` and `next(arg)`. `next()` refers to the next middleware to be called between the request and response, `next(arg)` refers to the next *error* handler middleware to be called.

## Custom Error Class
A custom error class provides a way to structure your code such that the class, provided an error status code and message, can handle each error distinctly.

Using a custom `AppError` class that takes a status code and message and throws a distinct error.
```js
throw new AppError(401, "Password required!");
```

Structure of the `AppError` class.
```js
class AppError extends Error {
    constructor(status, message) {
        super()
        this.status = status;
        this.message = message;
    }
}

module.exports = AppError;
```

Express will use whatever custom error class that `extends` the built-in JS [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) class. Since `AppError` above extends `Error`, Express will use `AppError`.

Defining middleware with `app.use` and a default status code of 500 where the custom `AppError` class that `extends Error` is required in `index.js`.
```js
const AppError = require("./AppError");

// ...

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message)
})
```

## Handling Async Errors
Along routes that interact with the database take time. Because of this, these routes must be asynchronous. In `async` callbacks, if an error is thrown, an `UnhandledPromiseRejectionWarning` error may occur if not handled correctly.

For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the `next()` function, where Express will catch and process them.
```js
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

See [Catching Errors](https://expressjs.com/en/guide/error-handling.html#catching-errors) in the Express docs for more information.

Note that a separate error, e.g. ejs error: `Cannot read properties of null (reading 'name')`, may be returned if no `else` block is used and `next` is not returned. This is because it is trying to access a null value.

Handling async errors without an `else` block requires returning `next`.
```js
app.get("/products/:id", async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError(404, "Product not found"));
    }

    res.render("products/show", { product });
});

// custom error handler middleware errors are passed to using `next`
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
})
``` 

## Handling More Async Errors
To handle other async errors related to Node, Mongoose, etc., such as a `UnhandledPromiseRejectionWarning` due to a `ValidationError` thrown if part of a form that is required was not included, wrap the section of code in a try-catch block.

Passing any error from an async post function to the error handler middleware using a try-catch block.
```js
app.post("/products", async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${ newProduct._id }`);
    } catch (e) {
        next(e);
    }
});
```

## Defining An Async Utility
The example shown in the section above [Handling More Async Errors](#handling-more-async-errors) shows wrapping an async function of a post request in try-catch blocks. Since there are many async requests of this kind, instead of wrapping them all in try-catch blocks, a utility function can be used that takes the body of the function tries to execute it dealing with any errors.

Example of an async utility function `wrapAsync` taking the body of an async get request and chaining on error handling.
```js
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

// single product route
app.get("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError(404, "Product not found");
    }

    res.render("products/show", { product });
}));
```

## Differentiating Mongoose Errors
Some common Mongoose errors includes validation errors and cast errors. To find which errors are Mongoose specific and what to do if a specific error is caught, use middleware. Mongoose errors have a `name` attribute that can be used to determine the type of error that was caught.

Intercepting a Mongoose validation error then dealing with it separately.
```js
const handleValidationError = err => {
    console.dir(err);
    return new AppError(400, `Validation failed...${ err.message }`);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationError(err)
    next(err);
});
```

See Mongoose [Error](https://mongoosejs.com/docs/api/error.html) docs for a comprehensive list of Mongoose errors.