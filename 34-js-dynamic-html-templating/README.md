# Section 34: Creating Dynamic HTML with Templating

- [Intro to Templating](#intro-to-templating)
- [Configuring Express for EJS](#configuring-express-for-ejs)
- [The Views Directory](#the-views-directory)
- [EJS Interpolation Syntax](#ejs-interpolation-syntax)
- [Passing Data to Templates](#passing-data-to-templates)
- [Template Demo](#template-demo)
- [Conditionals in EJS](#conditionals-in-ejs)
- [Loops in EJS](#loops-in-ejs)
- [More Complex Template Demo](#more-complex-template-demo)
- [Static Assets](#static-assets)
- [Bootstrap + Express](#bootstrap--express)
- [EJS and Partials](#ejs-and-partials)

## Intro to Templating
Templating allows us to define a preset "pattern" for a webpage that we can dynamically modify.

For example, we could define a single "Search" template that displays all the results for a given search term. We don't know what the term is or how many results there are ahead of time. The webpage is created on the fly.

Templating tools
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [pug](https://pugjs.org/api/getting-started.html)
- [handlebars](https://handlebarsjs.com/)
- [EJS](https://ejs.co/)

## Configuring Express for EJS
Before configuring express to use EJS, EJS must be added to the node modules via installation.

```
npm i ejs
```

Configuring EJS in an express app requires setting the Express view engine to EJS.

Requiring `express` then setting the `view engine` to `ejs` using the [`app.set` method](https://expressjs.com/en/api.html#app.set).
```
const express = require("express");
const app = express();

app.set("view engine", "ejs");
```

The app assumes that templates exist in a directory called `views`.

```
mkdir views
```

Note that the `app.set` method provides the ability to change where the templates are stored from the default `views` directory.

Inside of the `views` directory, create a template file that ends in `.ejs`.

Create a home template.
```
touch views/home.ejs
```

The `.ejs` file, or template, can then be passed from the server to the client for a customized rendering of the web page using the [`res.render`](https://expressjs.com/en/api.html#res.render) method.

Sending the `home` template to the client after a `get` request from the home page, or index.
```
app.get("/", (req, res) => {
    res.render("home");
})
```

## The Views Directory
If the server is launched from anywhere outside of the project directory, the app will look for the `views` directory inside of the current working directory.

This will cause the following error
```
Error: Failed to lookup view "home.ejs" in views directory "<attempted path>/views"
```

To fix this error so that running the code from anywhere correctly accesses the `views` directory in the project folder, change the `views` directory from the current working directory, `cwd`, to the path where the project is located.

Require [path](https://nodejs.org/api/path.html) and set `views` of the `express` app from the `cwd` to the project directory `__dirname` joined with the existing `views` directory.
```
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
```

## EJS Interpolation Syntax
EJS tags are used to interpolate data into a template.

- `<%` 'Scriptlet' tag, for control-flow, no output
- `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
- `<%=` Outputs the value into the template (HTML escaped)
- `<%-` Outputs the unescaped value into the template
- `<%#` Comment tag, no execution, no output
- `<%%` Outputs a literal '<%'
- `%>` Plain ending tag
- `-%>` Trim-mode ('newline slurp') tag, trims following newline
- `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it

Using the `<%=` tag, in an `.ejs` file, JavaScript can be interpolated directly into the files HTML.

Generating a random number inside the HTML of a `.ejs` file.
```
<h1>Your random number is:
    <%= Math.floor(Math.random() * 10) + 1 %>
</h1>
```

## Passing Data to Templates
JavaScript can be directly added to the HTML of a `.ejs` file, however, it is generally desired to remove as much logic as possible from a template.

Instead of writing JavaScript directly inside of the `.ejs` file, have the JavaScript be executed elsewhere then pass the data directly to the desired slot in the `.ejs` file.

Execute the JavaScript inside of the apps get method of the `index.js` file, then pass the saved value to the `.ejs` file
```
app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;

    // takes a key-value pair
    res.render("random", { num });
})
```

Passing the saved value to the `.ejs` file gives the file access to the object. These objects are accessible inside of the files namespace and can be accessed directly.
```
<h1>Your random number is:
    <%= num %>
</h1>
```

## Template Demo
See `Subreddit` directory. This demo takes a `:subreddit` parameter from a url of the form `/r/:subreddit` and passes it to an EJS template interpolating it on an `<h1>`.

## Conditionals in EJS
To add HTML elements provided a condition is met, use the scriplet, `<%`, EJS tag. Surround JavaScript code within the `<% // JavaScript here %>` tags and HTML in between the JavaScript code.

Add an `<h2>` element if a random number is even.
```
<% if (num % 2 === 0) { %>
    <h2>That is an even number!</h2>
<% } %>
```

## Loops in EJS
To add looping logic in EJS combine `<%` and `<%=` tags. First surround the loop in `<%` tags then use `<%=` within the loop to access the iterable objects values.

Creating `<li>` from a cats object.
```
<ul>
    <% for (let cat of cats) { %>
        <li>
            <%= cat %>
        </li>
    <% } %>
</ul>
```
 
## More Complex Template Demo
See `ComplexSubreddit` directory. This demo takes a `.json` file of subreddit data and serves it through an EJS template.

## Static Assets
[Serving static files](https://expressjs.com/en/starter/static-files.html) refers to serving stuff like CSS, JavaScript files, and other objects that we want to include in the response back to the client.

To serve static files such as images, CSS files, and JavaScript files, use the `express.static` built-in middleware function in Express.
```
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets. For more information on the `options` argument, see [express.static](https://expressjs.com/en/4x/api.html#express.static).

Serves images, CSS files, and JavaScript files in a directory named `public`.
```
app.use(express.static('public'))
```

Loads the files that are in the `public` directory.
```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

Similarly to the views directory, without specifying the path, the public assets will only be found if the server is launched from within the project directory. To have access to the static assets, such as one named `public`, wherever the server is launched, set the path to the static assets as follows.
```
app.use(express.static(path.join(__dirname, "public")));
```

Note that middleware is code that runs in between a request going in and the response going out. 

## Bootstrap + Express
See `BoostrapDemo` directory. This demo demonstrates how to include Bootstrap in EJS templates.

[Compiled CSS and JS](https://getbootstrap.com/docs/5.3/getting-started/download/#compiled-css-and-js) Bootstrap files can be added as static assets that are sent to the client. See `/public` directory.

Once static assets are set up to be used in the app, they can be linked to any EJS template using the `<link>` and `<script>` tags for CSS and JavaScript code respectively. When connected, Bootstrap can be applied to the file normally (see section 12-css-bootstrap).

## EJS and Partials
See `BootstrapDemo/views/partials` directory. Partials, called "includes" in EJS, are templates that can be included in other templates. They remove code duplication.

Partials are relative to the template with the `include` call. (This requires the 'filename' option.) For example if you have "./views/users.ejs" and "./views/user/show.ejs" you would use `<%- include('user/show'); %>`.

You'll likely want to use the raw output tag (`<%-`) with your include to avoid double-escaping the HTML output.

```
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```