# YelpCamp
YelpCamp is a massive project spanning multiple sections marking the culmination of having learned all web development fundamentals in the course. It is an application similar to Yelp but for ranking and reviewing camp sites.

In between sections are additional topics such as middleware, error handling, data validation, authorization and authentication smoothing the edges for a more well-rounded web application that can be found on the main branch of this repository.

While other sections pushed to GitHub take a more Gist approach for academic purposes, YelpCamp has some form of version control where each section can be found in its own branch with its own Git history. The main branch contains all of the merged sections where the complete application can be found.

**Table of Contents**
- [Section 39: Campgrounds CRUD](#section-39-campgrounds-crud)
  - [System Information](#system-information)
  - [Requirements](#requirements)
- [Section 41: Adding Basic Styles](#section-41-adding-basic-styles)
  - [Packages](#packages)
- [Section 43: Errors & Validating Data](#section-43-errors--validating-data)
  - [Packages](#packages-1)
- [Section 46: Adding the Reviews Model](#section-46-adding-the-reviews-model)
- [Section 49: Restructuring & Flash](#section-49-restructuring--flash)
  - [Packages](#packages-2)
- [Section 51: Adding in Authentication](#section-51-adding-in-authentication)
  - [Packages](#packages-3)
- [Section 52: Basic Authorization](#section-52-basic-authorization)
- [Section 53: Controllers & Star Ratings](#section-53-controllers--star-ratings)
- [Section 54: Image Upload](#section-54-image-upload)
  - [Packages](#packages-4)
- [Section 55: Adding Maps](#section-55-adding-maps)
  - [Packages](#packages-5)
- [Section 56: Cluster Map](#section-56-cluster-map)
- [Section 57: Styles Clean Up](#section-57-styles-clean-up)
- [Section 58: Common Security Issues](#section-58-common-security-issues)
- [Section 59: Deploying](#section-59-deploying)

## Section 39: Campgrounds CRUD
This section performs the initial setup of the YelpCamp app. This includes,
- Setting up a new npm package
- Requiring initial packages
- Establishing the Express server connection
- Establishing the MongoDB connection
- Setting up ejs
- Seeding the database
- Creating basic CRUD functionality
  - GET all campgrounds, index route `/campgrounds`
  - GET a campground, show route `/campgrounds/:id`
  - GET a form for a new campground, new route `campgrounds/new`
    - POST a new campground and redirect back to index `/campgrounds`
      - Use middleware to read `urlencoded` data
  - GET an edit form for a campground, edit route `campgrounds/:id/edit`
    - PUT edited campground data and redirect back to campground `/campgrounds/:id`
      - Require `method-override` to use other methods than GET and POST in HTML forms
  - DELETE a campground from show page, delete route `campgrounds/:id/delete` and redirect back to `/campgrounds`.

### System Information
This application was setup on macOS 10.13.6 High Sierra.

Note that in order to run this application on High Sierra, Node v16.20.2 and MongoDB 4.4.25 are required. 

### Requirements
- ejs ^3.1.9
- express ^4.18.2
- mongoose ^7.6.2 
- node 16.20.2
- npm 8.19.4
- method-override ^3.0.0
- ejs-mate ^4.0.0
- joi ^17.11.0
- express-session ^1.17.3
- connect-flash ^0.1.1
- passport ^0.6.0
- passport-local ^1.0.0
- passport-local-mongoose ^8.0.0
- multer ^1.4.5-lts.1
- dotenv ^16.3.1
- cloudinary ^1.41.0
- multer-storage-cloudinary ^4.0.0
- @mapbox/mapbox-sdk ^0.15.3

## Section 41: Adding Basic Styles
This section adds basic styles to the YelpCamp app. This includes,
- Requiring `ejs-mate` to extend `ejs` functionality
  - Registering the `ejs` callback function for the Express `app.engine` to `ejs-mate`
  - Creating a layouts folder in the views directory with a `boilerplate.ejs` file
  - Updating all `.ejs` files in the views directory to use the boilerplate code in `boilerplate.ejs`
- Quick starting [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/#js-components) in `boilerplate.ejs` with CDN links and JS [Popper](https://popper.js.org/) scripts
  - Wrapping the body in a `<main>` container
    - Adding margin to the main container `mt-5` 
- Adding a simple [navbar](https://getbootstrap.com/docs/5.3/components/navbar/#nav) to `boilerplate.ejs`
  - Changing the color to `navbar-dark` and background to `bg-dark`
  - Making the navbar sticky
  - Updating the navbar items to Home, Campgrounds, New Campground
- Making a partials folder in the views directory to hold reusable components
  - Creating a `navbar.ejs` partial
  - Creating a `footer.ejs` partial
- Adding flex to the body of `boilerplate.ejs` with `d-flex` and `flex-column`
  - Adjusting the viewport height with `vh-100`
  - Moving the footer to the bottom with `mt-auto`
- Adding images from Unsplash [In the woods](https://unsplash.com/collections/483251/in-the-woods) collection
  - Updating model to include `image`
- Reseeding campgrounds database to include `image` url, `description` of lorem text, and `price` of a random amount between $10 and $30
- Updating `show` page to include `image`
- Refactoring the `index` page to show a list of [bootstrap cards](https://getbootstrap.com/docs/5.3/components/card/#example)
- Styling the `new` page with bootstrap styles and adding ability to add image url add price, and add description.
- Styling the `edit` page with bootstrap styles and adding ability to edit image url, edit price, and edit description.
- Styling the `show` page and adding the image, description, price and updating the footer to display recently added, "2 days ago", text.

### Packages
- [EJS Mate](https://www.npmjs.com/package/ejs-mate) - Express 4.x `layout`, `partial` and `block` template functions for the EJS template engine.

## Section 43: Errors & Validating Data
This section adds error handling and data validation. This includes,
- Inserting [bootstrap validation](https://getbootstrap.com/docs/5.3/forms/validation/) for client side error handling
  - Adding `novalidate` to forms and `required` input of `new.ejs` and `edit.ejs`
  - Adding validation feedback text with `invalid-feedback` and `valid-feedback` classes
  - Adding script for bootstrap validation to `boilerplate.js` accessible via `validated-form` class added to `new.ejs` and `edit.ejs`
- Adding a generic error handler to the bottom of `app.js`
  - Setting a generic `500` status code destructured from `err` and `"Something went wrong message"` if no message is sent from other middleware handlers
- Creating a utils directory for utility functions and classes
  - Creating a generic `ExpressError` class in utils that can be created when an error is caught
  - Creating a `catchAsync` function in utils that can be used to generalize the actions taken when an error is caught
- Adding a catch-all path for all undefined routes with `404` status code and message `"Page not found"`
- Adding server side error handling
  - Handling invalid form submissions via Postman/Hopscotch or cURL commands with JOI error messages and `400` status code
  - Creating a `schemas.js` file to export schemas
  - Handling data validation with JOI
    - Creating a JOI `campgroundSchema` to validate data before the data is modeled through the Mongoose `campgroundSchema` in `schemas.js`
    - Requiring `schema.js` in `app.js` and destructuring from it `campgroundSchema`
    - Creating a callback function `validateCampground` that validates data using the JOI `campgroundSchema`, throwing an error if invalid, or calling next otherwise
    - Passing `validateCampground` to `app.post` and `app.put` methods as middleware
- Creating an production `error.ejs` view page to respond with when an error is caught showing the error message, stack trace, and status code.

### Packages
- [JOI](https://www.npmjs.com/package/joi) - [`joi`](https://joi.dev/api/?v=17.9.1) lets you describe your data using a simple, intuitive, and readable language.

## Section 46: Adding the Reviews Model
This section adds a new feature to add reviews to a campground. This includes,
- Defining the reviews model
  - Composing the reviews of a `body` and `rating`
  - Adding a reference to the reviews using the `ObjectId` on the campground schema 
- Adding a form to leave reviews
  - Updating the campground show page with a form to submit a review and rating to a reviews object
    - Adding a `range` input from 1 to 5 for a rating
    - Adding a `textfield` input for a review body
- Creating reviews
  - Submitting the reviews form to `/campground/<%= campground._id %>/reviews`
  - Adding a new reviews route to create a new review on a specific campground in the database
- Validating reviews
  - Adding client-side validation to the campground show page using bootstrap
  - Adding server-side validation using JOI
- Displaying reviews
  - Retrieving reviews for a campground using the `populate("reviews")` method along `/campground/:id`
  - Displaying the reviews on the campground show page
- Adding styles to the reviews
  - Placing each review in a bootstrap card to more easily distinguish between reviews
  - Removing the `offset-3` from the campground card
  - Evenly distributing space with `col-6` to both the campground and reviews cards so that they can be viewed side-by-side
- Deleting reviews
  - Adding a new delete route for a single review on a specific campground at `/campgrounds/:campgroundId/reviews/:reviewId`
  - Adding a delete `button` to each review card on the campground show age directed to the delete route
  - Removing the review using the Mongo [`$pull`](https://www.mongodb.com/docs/manual/reference/operator/update/pull/) operator
  - Redirecting to the campground show page
- Adding campground delete middleware to the `CampgroundSchema`
  - Deleting all reviews associated with a campground when the campground is deleted
    - Using the [`findOneAndDelete`](https://mongoosejs.com/docs/api/query.html#Query.prototype.findOneAndDelete()) middleware triggered when [`findByIdAndDelete`](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()) is called
    - Querying all reviews by `_id` `$in` the deleted campground to remove using `deleteMany`.

## Section 49: Restructuring & Flash
This section adds some restructuring to the project and incorporates flash. This includes,
- Restructuring the routes from `app.js` into their own files in a `routes` directory
  - Breaking out the `/campgrounds` routes and moving its corresponding validation middleware, `validateCampgrounds`, into a `campgrounds.js` file
  - Breaking out the `/reviews` routes and moving its corresponding validation middleware, `validateReviews`, into a `reviews.js` file
  - Using `"/campgrounds"` and `"/campgrounds/:id/reviews"` in `app.js` as middleware to the routing resources broken out
  - Resolving new breaking out errors
    - Ensuring redirects include the root `/campgrounds` in its url
    - Ensuring path params from `app.js` middleware are sent to the routers with the option `{ mergeParams: true }` passed to the Express Router on import
- Serving static assets
  - Adding a public directory to the project for images, custom style sheets, and JavaScript scripts to respond with
    - Moving the form validation script from `boilerplate.ejs` into its own file, `validateForm.js`, in public to be served on every view
  - Telling Express to use the public directory to serve static assets 
- Configuring session
  - Requiring `express-session` in `app.js`
  - Using `session` with `secret`, `resave`, `saveUninitialized`, and `cookie` `expires`, `maxAge`, and `httpOnly` configurations
- Setting up Flash
  - Requiring `connect-flash` in `app.js`
  - Storing `success` and `error` properties in the flash
  - Creating a `flash.ejs` partial
- Adding a flash success alert to `flash.ejs`
  - Inserting a [dismissible](https://getbootstrap.com/docs/5.2/components/alerts/#dismissing) bootstrap success alert 
  - Storing flash success message for successful POST, PUT, and DELETE requests on campground and review routes
- Adding a flash error alert to `flash.ejs`
  - Inserting a [dismissible](https://getbootstrap.com/docs/5.2/components/alerts/#dismissing) bootstrap danger alert 
  - Storing flash error message for errors on show one and edit GET routes requesting a specific campground that does not exist
### Packages
- [Express Session](https://www.npmjs.com/package/express-session) - [`express-session`](https://expressjs.com/en/resources/middleware/session.html) creates a session middleware.
- [Flash](https://github.com/jaredhanson/connect-flash#readme) - [`connect-flash`](https://www.npmjs.com/package/connect-flash?activeTab=readme) - writes messages to the flash which are cleared after being displayed to the user.

## Section 51: Adding in Authentication
This section adds authentication. This includes,
- Installing `passport`, `passport-local`, and `passport-local-mongoose`
- Creating a user model exported from model/user.js
  - Requiring `passport-local-mongoose`
  - Adding a required and unique email field
  - Setting `passportLocalMongoose` plugin on the `userSchema`
- Configuring passport
  - Requiring `passport`, `passport-local`, and `user.js` from models in `app.js`
  - Initializing `passport`
  - Executing `session` on `passport`
  - Passing `passport-local` to `passport` as the `LocalStrategy`
    - Authenticating `User` and passing it to the `LocalStrategy`
  - Register serialize and deserialize passport functions with the plugin functions added to `User` from `passport-local-mongoose` adding cookies to the session 
- Creating a view user `register.ejs` form
  - Adding required `username`, `email`, and `password` fields 
  - Creating a `users.js` router to the views in users
    - Adding a GET route to the register form
  - Requiring routes to users in `app.js`
    - Setting user router the root url `/`
- Adding register route logic to `users.js` in routes
  - Setting up the POST route that accepts a `username`, `email`, and `password`
    - Creating a new user
    - Registering the new user with the password to hash
    - Returning a `success` flash and redirect to `/campgrounds` or error message with a redirect to `/register`.
- Adding login route logic to `users.js` in routes
  - Requiring `passport`
  - Creating a login form in a new `login.ejs` view with `username` and `password` fields
  - Creating a GET route to the login view
  - Creating a POST route to `/login` using `passport` middleware to authenticate login
    - Flashes an error message if username or password are invalid
    - Otherwise redirects to `/campgrounds`
- Checking that a user `isLoggedIn` using middleware
  - Creating a `middleware.js` file in the route directory with the `isLoggedIn` callback middleware
  - Requiring `isLoggedIn` in `campground.js` and `reviews.js` routes
  - Passing `isLoggedIn` to all creation, updating, and deletion routes along `/campgrounds` and `/reviews` including the retrieval of their associated forms
- Adding logout route logic to `users.js` in routes
  - Calling [`logout()`](https://www.passportjs.org/concepts/authentication/logout/) on `req` (added to `req` by `passport`) and passing it a callback to either return an error to the `next` middleware or flash success and redirect to `/campgrounds`
  - Adding `Login`, `Register`, and `Logout` `nav-links` to the navbar
- Adding a `user` helper to `res.locals`
  - Updating the navbar such that if a user is not `undefined` the `Logout` link is displayed, otherwise the `Login` and `Register` links are displayed
- Updating register route so that when a user registers they are logged in
  - Using [`req.login`](https://www.passportjs.org/concepts/authentication/login/) (added to `req` by `passport`) in the `/register` route and passing it a callback to either return an error or create a session login, flash success, and redirect to `/campgrounds`
- Adding `returnTo` behavior to redirect a user to the page they were viewing before logging in
  - Adding a new `storeReturnTo` middleware in `middleware.js` to pass to users `/login` before `password.authenticate` deletes the session cookie `req.session.originalUrl`
  - Saving `req.session.originalUrl` to a new `res.locals.returnTo` cookie
  - Redirecting on users `/login` endpoint to url in `returnTo` or `/campgrounds` if `returnTo` is undefined
  - Deleting `res.locals.returnTo` to clear session space
 
### Packages
- [Passport](https://www.passportjs.org/) - [`passport`](https://www.npmjs.com/package/passport) is [Express](http://expressjs.com/)-compatible authentication middleware for [Node.js](http://nodejs.org/). 
- [Passport local](https://www.passportjs.org/packages/passport-local/) - [`passport-local`](https://www.npmjs.com/package/passport-local) is a [Passport](http://passportjs.org/) strategy for authenticating with a username and password.
- Passport local Mongoose - [`passport-Local-mongoose`](https://www.npmjs.com/package/passport-local-mongoose) is a [Mongoose plugin](https://mongoosejs.com/docs/plugins.html) that simplifies building username and password login with [Passport](http://passportjs.org/).

## Section 52: Basic Authorization
This section adds basic authorization. This includes,
- Adding an author to a campground
  - Adding a new `author` field to the campground schema and updating the `index.js` file in the seeds directory
    - Connecting the campground schema to the `User` database
  - Reseeding the campground database with campgrounds including an author
  - Populating a campground from the show campground route with the author
  - Adding a `Submitted by` section to the show `card` of a campground
  - Updating the POST route for a new campground to include the author making the request from `req.author._id`
- Showing and hiding Edit and Delete buttons on the campground card based on the current user
  - Adding conditional to campgrounds show page to see Edit and Delete buttons on the campground
    - Requiring a user to be signed in (user is not undefined) and the user is the author 
- Updating the server-side campgrounds POST, PUT, and DELETE routes and their associated GET routes for their forms to prevent unauthorized users from using postman or cURL commands to perform the actions
  - Creating middleware `isAuthorized` to check that a user can POST, PUT, or DELETE a campground along `/campgrounds` routes if they are the author
- Adding more reviews authorization
  - Updating the server-side reviews POST, and DELETE routes to prevent unauthorized users from using postman or cURL commands to perform the actions
    - Adding an `author` field to the reviews schema
    - Setting the `author` on a POST request for a new review
    - Creating middleware `isReviewAuthor` to authorize a user deleting a review if they are the review author
  - Updating the review card
    - Adding the review author name to the card as a subtitle
    - Hiding Delete button on campgrounds show view based on the current user
      - Adding logic to render the Delete button if the current user logged in is the review author
- Refactoring all middleware from `campgrounds.js` and `reviews.js` in routes to `middleware.js` in root directory.

## Section 53: Controllers & Star Ratings
This section performs some route refactoring and adding a new review system. This includes,
- Refactoring `campgrounds.js` CRUD methods into a campgrounds controller
  - Making a new controllers directory
  - Making a `campgrounds.js` file in controllers
  - Moving the bodies of all CRUD methods in `campgrounds.js` from routes to `campgrounds.js` in controllers
- Refactoring `reviews.js` CRUD methods into a campgrounds controller
  - Making a `reviews.js` file in controllers
  - Moving the bodies of all CRUD methods in `reviews.js` from routes to `reviews.js` in controllers
- Refactoring `users.js` CRUD methods into a campgrounds controller
  - Making a `users.js` file in controllers
  - Moving the bodies of all CRUD methods in `users.js` from routes to `users.js` in controllers
- Restructuring routes to chain routes (see [`router.route(path)`](https://expressjs.com/en/4x/api.html#router.route)) with different verbs that are along the same path
  - Grouping routes in `campground.js` 
  - Grouping routes in `users.js` 
- Adding a star review system using [starbility](https://github.com/LunarLogic/starability)
  - Updating the reviews section header
  - Adding a `stars.css` sheet to sheets in the public directory
  - Importing `stars.css` into campgrounds `show.ejs`
  - Updating campgrounds `show.ejs` to display the total number of stars for the rating
  - Moving username as the review card subtitle to the card title
  - Updating the rating mechanism from a slider to clicking on the total number of stars.

## Section 54: Image Upload
This section adds the ability to upload images. This includes,
- Setting up [Cloudinary](https://cloudinary.com/) free tier to store photos
  - Storing urls to photos in Cloudinary in MongoDB making them directly accessible using `<img>` tags in the views
- Updating `enctype` of new campground view to `multipart/form-data`
  - Replacing image url `text` input to `file` input
  - Using [Multer](https://github.com/expressjs/multer#readme) to parse `multipart/form-data`
    - Installing `multer`
    - Requiring multer in `campgrounds.js` route
- Setting up environment variables with `dotenv`
  - Storing Cloudinary name, key, and secret in `.env` file in the root directory of the project
  - Storing environment variables in `process.env` only if the `NODE_ENV` is in development (not production)
- Uploading to Cloudinary
  - Creating a cloudinary directory in the root directory of the project
    - Creating an `index.js` and requiring `cloudinary` and `multer-storage-cloudinary`
    - Setting the cloudinary config with the values in `.env` to associate the app with your Cloudinary account
    - Configuring CloudinaryStorage with the cloudinary config, which `folder` to store the images in, and the `allowed_formats` of the images
    - Exporting cloudinary and storage 
    - Requiring storage in routes where image uploads occur
      - Passing `upload` multer function as middleware to campground index POST endpoint
-  Storing uploaded image links in Mongo
   -  Setting the campground image field on new campground creation to the image url and filename pulled from Cloudinary
   -  Updating the campground schema `image` field to `images` with two subfields, `url` and `filename`
      -  Removing JOI image validation
   - Displaying all images on a campground show page and only the first image on the campgrounds index page
- Displaying images in a carousel
  - Adding aa basic bootstrap [carousel](https://getbootstrap.com/docs/5.3/components/carousel/#basic-examples) to campground show page
  - Setting the first image with `active` class and all others with `""`
  - Showing next and previous buttons only if there are more than one images
- Updating database seeds
  - Updating `image` field to `images`, an array of images
  - Adding two image urls with their associated filenames
  - Reseeding the database
- Adding upload to edit page
  - Updating campground edit controller to spread new images onto existing campground images before saving to database
  - Adding upload middleware to PUT method along the campgrounds `/:id` route
  - Updating the edit campground form to accept `multipart/form-data` 
    - Updating `input` type to `file` allowing `multiple`
- Customizing file `input`
  - Replacing file input with bootstrap's [file input](https://getbootstrap.com/docs/5.3/forms/form-control/#file-input)
- Deleting images
  - Updating edit campground form to delete images
    - Adding `img-thumbnail`s for each image in the campground selectable by checkbox
      - Setting each selected checkbox with a value `img.filename` to a `deleteImages` array passed to the `req.body`
    - Making a query to campground database to pull all images in `deleteImages` from `req.body`
  - Deleting images on the backend
  - Requiring `cloudinary` in campgrounds controller
  - Calling `destroy` on `cloudinary.uploader` for each image in `deleteImages`
- Adding a thumbnail virtual property
  - Using cloudinary url [image transformations](https://cloudinary.com/documentation/image_transformations) to reduce the image to an appropriate thumbnail size of 200px
  - Updating the campground mongoose schema
    - Creating an ImageSchema with a virtual that creates a thumbnail field with the value of an image's transformed cloudinary url 
    - Nesting ImageSchema in the CampgroundSchema images field
    - Updating the campground edit form to use the new `img.thumbnail` field.

### Packages
- [Multer](https://github.com/expressjs/multer#readme) - [`multer`](https://www.npmjs.com/package/multer) is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- [Dotenv](https://github.com/motdotla/dotenv#readme) - [`dotenv`](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
- [Cloudinary](https://cloudinary.com/documentation/node_integration) - [`cloudinary`](https://www.npmjs.com/package/cloudinary) allows you to quickly and easily integrate your application with Cloudinary.
- [Multer Storage Cloudinary](https://github.com/affanshahid/multer-storage-cloudinary) - [`multer-storage-cloudinary`](https://www.npmjs.com/package/multer-storage-cloudinary) is a multer storage engine for Cloudinary.

## Section 55: Adding Maps
This section adds the ability to display a campground on a map. This includes,
- Registering for Mapbox
  - Adding `MAPBOX_TOKEN` to env
- Geocoding the campground location
  - Using [forwardGeocode](https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#forwardgeocode) to search for the latitude and longitude for a campground location 
  - Retrieving latitude and longitude from the returned object from forwardGeocode `body.features[0].geometry.coordinates`
- Working with [GeoJSON](https://geojson.org/)
  - Updating campground schema with GeoJSON following Mongoose [Point Schema](https://mongoosejs.com/docs/geojson.html)
  - Adding GeoJSON to `campground.geometry` in the campground controller to create a new campground with geo data
- Displaying a Map
  - Adding CDN links to mapbox stylesheets and scripts to `boilerplate` view
  - Adding map `div` to show page above the carousel
  - Retrieving the mapToken from `.env` in the campground show page
  - Creating a new `showPageMap.js` public script to create a new Map from `mapboxgl` with the `mapToken` 
- Centering the Map on a Campground
  - Passing the campground `coordinates` to `showPageMap.ejs` from the campground show page 
  - Updating public `showPageMap.ejs` mapboxgl Map's center field with coordinates from the campground
  - Adding a mapboxgl Marker on the Map at the campground coordinates
- Fixing seeds
  - Adding geometry to seeds with default coordinates `[-113.1331, 47.0202]`
  - Reseeding database
- Customizing Map Popup
  - Adding a clickable [popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#setpopup) to the map
  - Passing the campground `title` and `location` to `showPageMap.ejs` from the campground show page to display on the popup
  - Updating the map style to `light-v10`.

### Packages
- [Mapbox SDK](https://github.com/mapbox/mapbox-sdk-js#readme) - [`@mapbox/mapbox-sdk`](https://www.npmjs.com/package/@mapbox/mapbox-sdk) is a JS SDK for working with [Mapbox APIs](https://docs.mapbox.com/api/).

## Section 56: Cluster Map
This section adds the ability to search for a campground using a cluster map. This involves,
- Adding an earthquake [cluster map](https://docs.mapbox.com/mapbox-gl-js/example/cluster/)
  - Adding a map `div` to the top of the campground index page
  - Adding a new public `clusterMap.js` script taken from the mapbox earthquake cluster map example
  - Setting the `MAPBOX_TOKEN` from `.env` to be used in `clusterMap.js`
- Reseeding the database
  - Updating coordinates with longitude and latitude provided in the cities dataset
- Updating the earthquake cluster map to display campgrounds
  - Adding `clusterMap.js` as a script to campgrounds index page
  - Setting a new campgrounds object to `{features: campgrounds}` to pass to `clusterMaps.js`
  - Updating all sources in `clusterMap.js` from `earthquakes` to `campgrounds`
  - Updating the data in `addSource` to `campground`
- Changing cluster styles
  - Changing the color and size for points on the map where there are more campgrounds
    - Higher density points are larger and darker
    - Lower density points are smaller and lighter
  - Updating map style to `light-v10`
- Adding custom popups
  - Adding a virtual to the campground schema to construct `properties.popupMarkup` html
    - Creating an anchor tag to the campground show page and paragraph with a partial description of 30 characters
  - Setting options for the campground schema to allow virtual fields to be displayed on the client side
  - Removing earthquake information regarding tsunamis from `clusterMap.js`
  - Setting a new `popupMarkup` in `map.on` to the `popupMarkup` from the CampgroundSchema virtual
    - Retrieving `popupMarkup` from GeoJSON `e.features[0].properties`
    - Tagging onto `mapboxgl.Popup` `setHTML` method with `popupMarkup` as its argument.

## Section 57: Styles Clean Up


## Section 58: Common Security Issues


## Section 59: Deploying

