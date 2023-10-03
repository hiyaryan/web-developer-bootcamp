# Section 33: Creating Servers with Express

- [Intro to Express](#intro-to-express)
  - [Overview](#overview)
  - [Libraries vs. Frameworks](#libraries-vs-frameworks)
- [First Express App](#first-express-app)
- [`request` & `response` Objects](#request--response-objects)
- [Express Routing Basics](#express-routing-basics)
- [Express Path Parameters](#express-path-parameters)
- [Query Strings](#query-strings)
- [Auto-Restart with `nodemon`](#auto-restart-with-nodemon)

## Intro to Express
### Overview
[Express](https://expressjs.com/) is a special node package called a framework. It is a "fast, unopinionated, minimalist web framework for Node.js" that helps you build web apps.

Express is an NPM package which comes with a bunch of methods and optional plugins that we can use to build web applications and API's.

Express helps,
- Start up a server to listen for requests.
- Parse incoming requests.
- Match those requests to particular routes.
- Craft an http response and associated content.

### Libraries vs. Frameworks
Both libraries and frameworks are code that other developers have written. However, difference between the two lies in the scope of control, or [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control), that they maintain in your application.

- Library
  - You are in charge.
  - You control the flow of the application code, and decide when to use the library.
- Frameworks
  - The control is inverted.
  - The framework is in charge and you are a participant.
  - The framework tells you where to plug in the code. 

## First Express App
Install Express with `npm i express`.

To get a server running using Express, Express must be required then executed. Assign its return value to a variable then use its `listen` method with a port number to access the server at the designated port. Then use Express's `use` method to assign a callback that is executed when a client accesses the server.
```
const express = require("express");

const app = express();

app.use(() => {
    console.log("We got a new request!");
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})
``` 

Note: Add the `-y` tag when initializing a new npm project to skip the questionnaire `npm init -y`.

## `request` & `response` Objects
In the `use` method, there are two parameters that may be accessed, `request` and `response`.
```
app.use((req, res) => {
    ...
})
```

`request` is the request from the client to the server, and `response` is the response to the client from the server which is returned immediately after the request is made.

### [Request](https://expressjs.com/en/api.html#req)
The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In this documentation and by convention, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you’re working.

### [Response](https://expressjs.com/en/api.html#res)
The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

In this documentation and by convention, the object is always referred to as `res` (and the HTTP request is `req`) but its actual name is determined by the parameters to the callback function in which you’re working.

Example 1 using standard naming.
```
app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})
```

Example 2 using variable naming.
```
app.get('/user/:id', function (request, response) {
  response.send('user ' + request.params.id)
})
```

To send a response from the server, use the `response` object [`send`](https://expressjs.com/en/api.html#res.send) method.

```
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
```

## Express [Routing Basics](https://expressjs.com/en/starter/basic-routing.html)
[Routing](https://expressjs.com/en/guide/routing.html) refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Route definition takes the following structure:
```
app.METHOD(PATH, HANDLER)
```

- `app` is an instance of express.
- `METHOD` is an HTTP request method, in lowercase.
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

Respond with **Hello World!** on the homepage:
```
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Respond to `POST` request on the root route (/), the application’s home page:
```
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Respond to a `PUT` request to the /user route:

```
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Respond to a `DELETE` request to the /user route:

```
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Paths are accessible in the order they are defined. If the catch all path, `*`, is defined first, all other paths defined after are unreachable.

## Express Path Parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

## Query Strings
A query string is part of the url containing the `?` operator followed a string. It contains query information used to search for data at a particular url's endpoint.

To access the query string in Express, use the `req.query` object. 

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books?genre=SciFi
req.query: { genre: "SciFi" }
```

## Auto-Restart with `nodemon`
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for `node`. To use `nodemon`, replace the word `node` on the command line when executing your script.

### Installation
Using npm and installing globally to your system path:

```
npm install -g nodemon # or using yarn: yarn global add nodemon
```

Or install nodemon as a development dependency:

```
npm install --save-dev nodemon # or using yarn: yarn add nodemon -D
```

### Usage
To use nodemon, run a Node application using the `nodemon` command. After changing a file, save it, then the server will automatically restart.

Run a Node app with the `node` command.
```
node index.js
```

Run the same app with the `nodemon` command.
```
nodemon index.js
```