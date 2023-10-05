# Section 35: Defining RESTful Routes

- [`get` vs. `post` Requests](#get-vs-post-requests)
  - [`get` request](#get-request)
  - [`post` request](#post-request)
- [Defining Express `post` Routes](#defining-express-post-routes)
- [Parsing the `request` Body](#parsing-the-request-body)
- [Intro to REST](#intro-to-rest)
- [RESTful Comments Overview](#restful-comments-overview)
- [RESTful Comments Index](#restful-comments-index)
- [RESTful Comments New](#restful-comments-new)
- [Express Redirects](#express-redirects)
- [RESTful Comments Show](#restful-comments-show)
- [The `uuid` Package](#the-uuid-package)
  - [UUID Installation](#uuid-installation)
  - [Creating a UUID](#creating-a-uuid)
- [RESTful Comments Update](#restful-comments-update)
- [Express Method Override](#express-method-override)
  - [`method-override`](#method-override)
- [RESTful Comments Delete](#restful-comments-delete)

## `get` vs. `post` Requests
### `get` request
- used to retrieve information
- data is sent via query string
- information is plainly visible in the URL
- limited amount of data can be sent

HTML form with method of `get`.
```
<form action="/tacos" method="get">
    <input type="text" name="meat" id="">
    <input type="number" name="qty" id="">
    <button>Submit</button>
</form>
```

Example of a query string of a `get` request in URL.
```
localhost:3000/tacos?meat=carnitas&qty=3
```

### `post` request
- used to post data to the server
- used to write/create/update
- data is sent via request body, not a query string
- can send any sort of data (e.g. JSON)

HTML form with method of `post` no query string returned in URL.
```
<form action="/tacos" method="post">
    <input type="text" name="meat" id="">
    <input type="number" name="qty" id="">
    <button>Submit</button>
</form>
```

## Defining Express `post` Routes
`post` routes in express are defined using [`app.post`](https://expressjs.com/en/4x/api.html#app.post.method).

Example defining a `post` route to the home page.
```
// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

## Parsing the `request` Body
Data from a `post` request can be retrieved through the `req.body` object. Before it can be accessed however, Express must know how it should parse the data. This depends on how the data is formatted (e.g. JSON, raw text, binary, etc.) with the default being `undefined`. This can be done using the [`app.use`](https://expressjs.com/en/4x/api.html#app.use) method.

Example telling Express to parse the data as `urlencoded` data.
```
app.use(express.urlencoded({extended: true}));
```

Example telling Express to parse the data as `json` data.
```
app.use(express.json());
```

## Intro to REST
[REST](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style) stands for Representational State Transfer. It is an "architectural style for distributed hypermedia systems". In other words, it's a set of guidelines for how a client + server should communicate and perform CRUD operations on a given resource.

The main idea of REST is treating data on the server-side as resources that can be "CRUDed". This in turn makes the route to the resource RESTful. The most common way of approaching REST is in formatting the URLs and HTTP verbs in your applications.

CRUD stands for create, read, update, delete. It describes the actions that should be available on a RESTful web application.

For more information see [dissertation](https://ics.uci.edu/~fielding/pubs/dissertation/top.htm) by Roy Fielding, and [REST Architectural constraints](https://en.wikipedia.org/wiki/REST#Architectural_constraints) on Wikipedia.

Most important architectural constraint in this section is of [**Uniform interface**](https://en.wikipedia.org/wiki/REST#Uniform_interface). From Wikipedia,
    
    The uniform interface constraint is fundamental to the design of any RESTful system.[1] It simplifies and decouples the architecture, which enables each part to evolve independently. The four constraints for this uniform interface are:

    Resource identification in requests: Individual resources are identified in requests, for example using URIs in RESTful Web services. The resources themselves are conceptually separate from the representations that are returned to the client. For example, the server could send data from its database as HTML, XML or as JSON—none of which are the server's internal representation.
    
    Resource manipulation through representations: When a client holds a representation of a resource, including any metadata attached, it has enough information to modify or delete the resource's state.
    
    Self-descriptive messages: Each message includes enough information to describe how to process the message. For example, which parser to invoke can be specified by a media type.[1]
    
    Hypermedia as the engine of application state (HATEOAS) - Having accessed an initial URI for the REST application—analogous to a human Web user accessing the home page of a website—a REST client should then be able to use server-provided links dynamically to discover all the available resources it needs. As access proceeds, the server responds with text that includes hyperlinks to other resources that are currently available. There is no need for the client to be hard-coded with information regarding the structure of the server.[10]

## RESTful Comments Overview
Comments is a RESTful API demo that demonstrates how to create CRUD web applications. See the `CommentsAPI` directory in this section.

A comment will contain a `username` and some `text`. The API should allow some form of the following,
- GET /allcomments
- GET /all
- GET /showmeallcommentsnow
- POST /newcomment
- POST /makecomment

In a RESTful context, instead of creating different endpoints for every service, HTTP verbs can be used on the same endpoint with different functionality.

The base path to all comment resources is `/comments`. A GET request to this path will list all comments. A POST request will create a new comment.

Comments will be associated with an ID, and can be accessed at `/comments/:id`. A GET request at this endpoint will retrieve one comment. A PATCH request allows the comment to be edited, or updated. A DELETE request will remove, or destroy, a comment.

## RESTful Comments Index
The index, `/comments`, of the Comments API provides the following,

The API below lists NAME, PATH, VERB, PURPOSE.
- Index, `/comments`, GET, Display all comments

## RESTful Comments New
From the index, `/comments`, of the Comments API provides access to a form at `/new` and the ability to create a resource.

The API below lists NAME, PATH, VERB, PURPOSE.
- New, `/comments/new`, GET, Form to create new comment
- Create, `/comments`, POST, Creates new comment on server

## Express Redirects
When a post request is made through a form, if the page is not redirected, the form could be resubmitted, duplicating the data, if the user refreshes the page. 

To prevent this from happening, and to create a more natural flow after submission, the user should be redirected to the index, `/comments`, page. In other words, after a `post` request, a `get` request should be automatically made for the index page.

To redirect the user to some other page after they submit a post request, use the [`res.redirect`](https://expressjs.com/en/api.html#res.redirect) method.

In the Chrome dev tools network tab, a redirect is denoted with a 302 status code. If the redirect is successful it will be followed by a 200, OK, status code. If the page does not exist, then that will be denoted by a 404. 

## RESTful Comments Show
From the index, `/comments`, of the Comments API provides the ability to GET the *details*, or *show* a specific resource at `/:id`.

The API below lists NAME, PATH, VERB, PURPOSE.
- Show, `/comments/:id`, GET, Details for one specific comment

## The `uuid` Package
[UUID](https://www.ietf.org/rfc/rfc4122.txt), Universally Unique IDentifier, is 128 bits long, and can guarantee uniqueness across space and time.

The [UUID npm package](https://www.npmjs.com/package/uuid) provides access to the creation of a UUID that can be used to create unique IDs for resources such as an individual Comment.

### UUID Installation
```
$ npm install uuid
```

### Creating a UUID
```
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

## RESTful Comments Update
From the index, `/comments`, of the Comments API provides access to a form at `id:/edit` and the ability to update a resource.

The API below lists NAME, PATH, VERB, PURPOSE.
- Edit, `/comments/:id/edit`, GET, Form to edit specific comment
- Update, `/comments/:id`, PATCH, Updates specific comment on server

Alongside `post` and `get` requests, are several other methods such as `patch`, `put`, `delete`, etc ([see MDN for all methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)).

`patch` and `put` are analogous to the *update* concept in CRUD. `put` is used to update the entire resource, and `patch` is used to update a portion of the resource.

To update a comment, the [`patch` method](https://expressjs.com/en/api.html#app.METHOD) should be used.
```
app.patch("comments/:id", (req, res) => {
    const { id } = req.params;
    const { comment } = comments.find(c => c.id === id);
});
```

## Express Method Override
HTML forms can only send GET or POST requests. In order to send other types of requests, the normal functionality of these requests must be overridden.

To override a method, use the npm package [`method-override`](https://expressjs.com/en/resources/middleware/method-override.html). 

### [`method-override`](https://www.npmjs.com/package/method-override)
`method-override` lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

#### `method-override` Installation
To install `method-override` use the node package manager.
```
$ npm install method-override
```

#### `method-override` Usage
Override using a header.
```
var express = require('express')
var methodOverride = require('method-override')
var app = express()
 
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
```

Override using a query value.
```
var express = require('express')
var methodOverride = require('method-override')
var app = express()
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
```

## RESTful Comments Delete
From the index, `/comments`, of the Comments API provides the ability to delete, or destroy, a resource at `id:`.

The API below lists NAME, PATH, VERB, PURPOSE.
- Destroy, `/comments/:id`, DELETE, Deletes specific item on server

Deleting a comment by filtering the comments from the comment to delete.
```
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
});
```

Note. It is generally good practice to not mutate an array, hence creating a new array from the comments, excluding the comment to delete using the `filter` method, in the example above.