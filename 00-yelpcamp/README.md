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
- [Section 51: Adding in Authentication](#section-51-adding-in-authentication)
- [Section 52: Basic Authorization](#section-52-basic-authorization)
- [Section 53: Controllers & Star Ratings](#section-53-controllers--star-ratings)
- [Section 54: Image Upload](#section-54-image-upload)
- [Section 55: Adding Maps](#section-55-adding-maps)
- [Section 56: Cluster Map](#section-56-cluster-map)
- [Section 57: Styles Clean Up](#section-57-styles-clean-up)
- [Section 58: Common Security Issues](#section-58-common-security-issues)
- [Section 59: Deploying](#section-59-deploying)

## Section 39: Campgrounds CRUD
This section performs the initial setup of the YelpCamp app. This includes 
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
- ejs-mate ^4.0.0
- joi ^17.11.0

## Section 41: Adding Basic Styles
This section adds basic styles to the YelpCamp app. This includes
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


## Section 51: Adding in Authentication


## Section 52: Basic Authorization


## Section 53: Controllers & Star Ratings


## Section 54: Image Upload


## Section 55: Adding Maps


## Section 56: Cluster Map


## Section 57: Styles Clean Up


## Section 58: Common Security Issues


## Section 59: Deploying

