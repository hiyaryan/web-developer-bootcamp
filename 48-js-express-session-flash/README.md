# Section 48: Express Session & Flash

- [Sessions Intro](#sessions-intro)
- [Express Session](#express-session)
  - [Installation](#installation)
  - [Usage](#usage)
- [More Express Session](#more-express-session)
- [Flash Intro](#flash-intro)
  - [Installation](#installation-1)
  - [Usage](#usage-1)
- [`res.locals` & Flash](#reslocals--flash)
  - [res.locals](#reslocals)

## Sessions Intro
It is not very practical, or secure, to store a lot of data **client-side** using cookies. Sessions store data on the server-side, cookies store data on the client-side, or in the browser. If there is a lot of data that needs to be stored per session, cookies cannot support that due to the [limited space in the browser](https://stackoverflow.com/questions/2093793/what-is-the-maximum-size-of-a-cookie-and-how-many-can-be-stored-in-a-browser-fo).

Sessions are a **server-side** data store that we use to make HTTP stateful. Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data. 

Sessions are useful for keeping track of non-persistent data such as who is logged in, their username, what's in their shopping cart, etc. They make the data persistent so that the server can keep track of the user even after they make several other requests.

A cookie can be used as a key to unlock session data. The server can store a cookie on the client-side, then when the client makes a request, the cookie is sent to the server with the key to unlock session data that is then sent back to the client. 

For example, the key could be the id for a shopping cart. 
- If the client navigates away or makes another request, the client can send a cookie with the request containing the id of the shopping cart of which the server can use to retrieve data from the session store. 
- The response from the server can then include all of the items in the user's shopping cart in addition to whatever they requested. This can be done using an in-memory data store, like [Redis](https://redis.io/).

## Express Session
[`express-session`](https://expressjs.com/en/resources/middleware/session.html) is a Node module that can be used to create a session middleware.

### Installation
Install [`express-session`](https://www.npmjs.com/package/express-session) using npm.
```bash
$ npm install express-session
```

### Usage
See [docs](https://expressjs.com/en/resources/middleware/session.html) for a list of properties accepted in the options object.

Notes
- Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
- Since version 1.5.0, the [`cookie-parser` middleware](https://www.npmjs.com/package/cookie-parser) no longer needs to be used for this module to work. This module now directly reads and writes cookies on `req`/`res`. Using `cookie-parser` may result in issues if the `secret` is not the same between this module and `cookie-parser`.
- The default server-side session storage, `MemoryStore`, is ***purposely*** not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

Example setting up `express-session` as middleware.
```js
const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
```

Note that the only option required is `secret`. With this, a cookie will automatically be sent to the client's browser with the name `connect.sid` and a value signed with the secret.

Example using sessions along a `get` route that counts how many times a page has been viewed by the client.
```js
app.get("/viewcount", (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${ req.session.count } times.`);
});
```

In the above example `count` is incremented only for the client associated with the `connect.sid` cookie. If another browser is opened, the count will restart. Recall that this data is stored in the `MemoryStore` which is not to be used in production. Instead use an alternative session store, e.g. [`redis`](https://www.npmjs.com/package/connect-redis) or [`mongo`](https://www.npmjs.com/package/connect-mongo).

## More Express Session
If `secret` is the only option passed to `express-session` the following `express-session deprecated` warnings will be returned on the server side.
```
express-session deprecated undefined resave option; provide resave option index.js:5:9
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option index.js:5:9
```

These can be acknowledged by including the following options.
```js
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
```

Example of registering a username at a `/register` endpoint and retrieving it from the session store to greet the user at a `/greet` enpoint.
```js
app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    const { username } = req.session;
    res.send(`Hi, ${ username }!`);
});
```

Note that as soon as the server is restarted the session store refreshes and the session data is lost.

## Flash Intro
The `flash` is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.

### Installation
Install flash with npm.
```bash
$ npm install connect-flash
```

### Usage
Flash messages are stored in the session. First, setup sessions as usual by enabling `cookieParser` and `session` middleware. Then, use flash middleware provided by connect-flash.
```js
var flash = require('connect-flash');
var app = express();
 
app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});
```

With the `flash` middleware in place, all requests will have a `req.flash()` function that can be used for flash messages.
```js
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
});
 
app.get('/', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  res.render('index', { messages: req.flash('info') });
});
```

## `res.locals` & Flash
The following example flashes a message to the user on the `products` page when the user successfully creates a new `product`.
```js
// all products route
app.get("/products", async (req, res) => {
    const { category } = req.query;
    const products = await Product.find({});
    res.render("products/index", { products, category: "All", messages: req.flash("success") });
});

// new product creation
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', "Successfully made a new product!");
    res.redirect(`/products/${ newProduct._id }`);
});
```

The flash message can then be displayed on the following `index.ejs` template using the `messages` key.
```html
<%= messages %>
<h1><%= category %> Products</h1>
<ul>
    <% for (let product of products) { %>
    <li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
    <% } %>
</ul>
<a href="products/new">New Product</a>
<% if (category !== "All") { %>
<a href="/products">All Products</a>
<% } %>
```

If the same flash message was required to be sent to multiple routes, every route would have to be manually updated with `req.flash`. To prevent this form of duplication, use middleware to add on to the response object, `res`, such that every view will have access to messages. This can be done using the response object property [locals](#reslocals)

### [res.locals](https://expressjs.com/en/api.html#res.locals)
Use this property to set variables accessible in templates rendered with [`res.render`](https://expressjs.com/en/api.html#res.render). The variables set on `res.locals` are available within a single request-response cycle, and will not be shared between requests.

In order to keep local variables for use in template rendering between requests, use [`app.locals`](https://expressjs.com/en/api.html#app.locals) instead.

This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on to templates rendered within the application.

```js
app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})
```

Note that in order to use this middleware with `flash`, the view displaying the message must be redirected to. This is because *the variables set on `res.locals` are available within a single request-response cycle, and will not be shared between requests*.

Example using flash with middleware using `res.locals` that accesses `locals` displaying a success message every time a successful post request is made to `/products`.
```js
// flash and res.locals middleware
app.use(function (req, res, next) {
    res.locals.messages = req.flash("success")
    next()
})

// setting success flash message for post request
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', "Successfully made a new product!");
    res.redirect("/products");
});
```