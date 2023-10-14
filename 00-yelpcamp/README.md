# YelpCamp
YelpCamp is a massive project spanning multiple sections marking the culmination of having learned all web development fundamentals in the course. It is an application similar to Yelp but for ranking and reviewing camp sites.

In between sections are additional topics such as middleware, error handling, data validation, authorization and authentication smoothing the edges for a more well-rounded web application that can be found on the main branch of this repository.

While other sections pushed to GitHub take a more Gist approach for academic purposes, YelpCamp has some form of version control where each section can be found in its own branch with its own Git history. The main branch contains all of the merged sections where the complete application can be found.

**Table of Contents**
- [Section 39: Campgrounds CRUD](#section-39-campgrounds-crud)
  - [System Information](#system-information)
  - [Requirements](#requirements)
- [Section 41: Adding Basic Styles](#section-41-adding-basic-styles)
- [Section 43: Errors & Validating Data](#section-43-errors--validating-data)
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

## Section 41: Adding Basic Styles


## Section 43: Errors & Validating Data


## Section 46: Adding the Reviews Model


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

