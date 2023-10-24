# Section 50: Authentication from "Scratch"

- [Authentication vs. Authorization](#authentication-vs-authorization)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
- [How to (not) Store Passwords](#how-to-not-store-passwords)
  - [Rule #1](#rule-1)
  - [Hashing Functions](#hashing-functions)
- [Cryptographic Hashing Functions](#cryptographic-hashing-functions)
- [Password Salts](#password-salts)
- [Intro to Bcrypt](#intro-to-bcrypt)
  - [`bcrypt`](#bcrypt)
  - [`bcryptjs`](#bcryptjs)
- [Authentication Demo](#authentication-demo)
  - [Setup](#setup)
  - [Registering](#registering)
  - [Login](#login)
  - [Staying Logged in with Session](#staying-logged-in-with-session)
  - [Logout](#logout)
  - [Require Login Middleware](#require-login-middleware)
  - [Refactoring to Model Methods](#refactoring-to-model-methods)

## Authentication vs. Authorization
### [Authentication](https://en.wikipedia.org/wiki/Authentication)
Authentication is the process of verifying who a particular user is.

We typically authenticate with a username/password combo, but we can also use security questions, facial recognition, etc.

### [Authorization](https://en.wikipedia.org/wiki/Authorization)
Authorization is verifying what a specific user has to access to.

Generally, we authorize after a user has been authenticated. "Now that we know who you are, here is what you are allowed to do and NOT allowed to do."

## How to (not) Store Passwords
### Rule #1
*Never store passwords in text or as is in a database*

Example of how to not store passwords.
```
{
    username: "kittycatluvr",
    password: "meowmeow999!"
},
{
    username: "geckGuy",
    password: "lizard987"
}
```

Instead, use hashing. Rather than storing a password in the database, we run the password through a **hashing function** first and then store the result in the database.

### [Hashing Functions](https://en.wikipedia.org/wiki/Hash_function)
Hashing functions are functions that map input data of some arbitrary size to fixed-size output values.

Example using sha256 hashing algorithm.
- "I LOVE CHICKENS" -> `sha256()` ->  "5a21c314b6b4153ecba242b5089197aaf1e01f614e41322440c2d116b4b60e2e"
- "LOL" -> `sha256()` -> "6e0290d62f6db1779d6318df50209de8c9b93adb29b7dd46e7b563f044103b40"

Example of how to safely store passwords.
```
{
    username: "kittycatluvr",
    password: "d2d59a4bfd06a9b9de90b6f769d7e16d61372e7bb62c0c276ccb2a59fba0a350"
},
{
    username: "geckGuy",
    password: "87e2dee95ae5b2c38db118146b5381f6263642f1373711fabb3075482123e4b7"
}
```

The hashed password is stored in the database, then when the user inputs their password, it runs through the hashing function, and is then compared with the hashed password stored in the database. If the password the user inputs after it runs through the hashing function matches the hashed password stored in the database then the user is authenticated.

## Cryptographic Hashing Functions
A [hash function](https://en.wikipedia.org/wiki/Hash_function) is any function that can be used to map data of arbitrary size to fixed-size values, though there are some hash functions that support variable length output. The values returned by a hash function are called *hash values*, *hash codes*, *digests*, or simply *hashes*. The values are usually used to index a fixed-size table called a [hash table](https://en.wikipedia.org/wiki/Hash_table). Use of a hash function to index a hash table is called *hashing* or *scatter storage addressing*. 

<p><a href="https://commons.wikimedia.org/wiki/File:Hash_table_4_1_1_0_0_1_0_LL.svg#/media/File:Hash_table_4_1_1_0_0_1_0_LL.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Hash_table_4_1_1_0_0_1_0_LL.svg" alt="Hash table 4 1 1 0 0 1 0 LL.svg" width="300" height="230"></a>

Cryptographic hash functions are hash functions with the following characteristics.
1. One-way function which is infeasible to invert
2. Small change in input yields large change in the output
3. Deterministic-same input yields same output
4. Unlikely to find 2 outputs with same value
5. Password hash functions are deliberately slow

## Password Salts
Passwords salts provide an extra safeguard to hashing passwords.

The idea of using password salts comes from the fact that many users reuse the same password for multiple accounts. See [List of the most common passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords).

Hash values returned from hashing functions have a signature look that one can use to determine what hashing function was used to hash the password. If the password being used was one in the list of the most common passwords, bad actors could easily compare hash values to a table of common passwords and authenticate themselves.

Password salts add an additional layer to passwords so that even the common ones are harder to steal.

A salt is a random value added to the password before we hash it. It helps ensure unique hashes and mitigate common attacks.

Example salting a simple password with the word "DOG".
```
password: "password",
hashed: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
salted: "2b8d402155fa801a3833ebcab1ad9eb780ad2cf4c04d5a8e38530a181557648d"
```

[SHA-256 hash calculator](https://xorbin.com/tools/sha256-hash-calculator) was used to hash the password in the above example.

Salts are useful but they must be remembered, thus taking up extra space in memory.

## Intro to Bcrypt
[bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password hashing function. Besides incorporating a [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) to protect against [rainbow table](https://en.wikipedia.org/wiki/Rainbow_table) attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to [brute-force search](https://en.wikipedia.org/wiki/Brute-force_search) attacks even with increasing computation power. 

### [`bcrypt`](https://www.npmjs.com/package/bcrypt)
Server-side password encryption.

`bcrypt` is a library to help you hash passwords.

#### Installation
Install `bcrypt` using npm.
```bash
$ npm i bcrypt
```

#### Techniques
1. (async) Generate a salt and hash on separate function calls [ref](https://github.com/kelektiv/node.bcrypt.js#to-hash-a-password)
```js
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

`saltRounds` is the difficulty of hashing, the higher the number of [rounds](https://www.npmjs.com/package/bcrypt#a-note-on-rounds) the harder it is to hash thus increasing the amount of time.

[To check a password](https://github.com/kelektiv/node.bcrypt.js#to-check-a-password)
```js
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
```

1. (sync) Generate a salt and hash on separate function calls [ref](https://github.com/kelektiv/node.bcrypt.js#to-hash-a-password-1)
```js
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
// Store hash in your password DB.
```

[To check a password](https://github.com/kelektiv/node.bcrypt.js#to-check-a-password-1)
```js
// Load hash from your password DB.
bcrypt.compareSync(myPlaintextPassword, hash); // true
bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
```

### [`bcryptjs`](https://www.npmjs.com/package/bcryptjs)
Server-side and client-side password encryption.

`bcryptjs` provides optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ [`bcrypt`](https://www.npmjs.com/package/bcrypt) *binding on node.js **and** also working in the browser*.

#### Installation
Install `bcryptjs` using npm.
```bash
$ npm i bcryptjs
```

#### Synchronous Usage
To hash a password.
```js
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.
```

To check a password.
```js
// Load hash from your password DB.
bcrypt.compareSync("B4c0/\/", hash); // true
bcrypt.compareSync("not_bacon", hash); // false
```

Auto-gen a salt and hash.
```js
var hash = bcrypt.hashSync('bacon', 8);
```

#### Asynchronous Usage
To hash a password.
```js
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

To check a password.
```js
// Load hash from your password DB.
bcrypt.compare("B4c0/\/", hash, function(err, res) {
    // res === true
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
});
 
// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("B4c0/\/", hash).then((res) => {
    // res === true
});
```

Auto-gen a salt and hash.
```js
bcrypt.hash('bacon', 8, function(err, hash) {
});
```

## Authentication Demo
See `AuthDemo` directory for a demo of an application using authentication.

### Setup
- Initialize a new npm package.
- Install Express
- Install EJS
- Install Mongoose
- Install Bcrypt
- Make views directory with a `register.ejs` view
- Make models directory with a `User` model
- Touch `index.js`
  - Require `express`
  - Setup server on port 3000
  - Setup ejs
  - Import `User`
  - Create a GET `/secret` route to protect
  - Create a GET `/register` route to register a user using a form
- Build form in `register.ejs`
  - Add `input` text for username
  - Add `input` text for password
  - Add a `button` for form submission

### Registering
- Use `urlencoded` format to parse URL-encoded incoming requests
- Add action to `/register` and method of `POST` to `register.ejs` `form`.
- Create an async POST route to `/register` and redirect to `/`
  - Require `bcrypt`
  - Destructure `username` and `password`
  - Hash the password
  - Create a new `User` form the username and hash
  - Save the user to the database

Example of user document in database.
```json
{ "_id" : ObjectId("6536d71d846e89f7410dc13f"), "username" : "ryan", "password" : "$2b$12$k5LJhXV46t6ugYxhEyJhmer4f22c.M0RmPBu69efudJZv2D58fKOu", "__v" : 0 }
```

### Login
- Create a GET `/login` route
- Create a POST `/login` route
  - Destructure `username` and `password`
  - Find one user by `username`
  - Compare the `req.body` password to the hashed password retrieved from the database
  - If the response returns `true` redirect to `/secret` otherwise respond with `"Invalid username or password."`
- Create a `login.ejs` view
  - Add `input` text for username
  - Add `input` text for password
  - Add a `button` for form submission
  - Add action to `/secret` and method of `POST` to `login.ejs` `form`

### Staying Logged in with Session
- Install Express session
- Require `express-session`
- Use session middleware and set a secret using the secret property
- Add a `user_id` to the session for a successful login and user registration
  - Assign `user_id` to the `user._id` retrieved from the database or on registration
  - Redirect to `/secret`
- For an unsuccessful login, redirect to `/login`

### Logout
- Create a `/logout` route
  - Set `user_id` in the session to `null`
  - Redirect to `/login`
- Create a `secret.ejs` view
  - Add a simple `h1` to display a "secret"
  - Add a form with method `POST` to `/logout`

At a minimum setting `user_id` in the session to `null` is enough to log the user out. The `session` object also includes a `destroy()` method to completely remove all session cookies if there is more than just the `user_id` to be removed.

### Require Login Middleware
- Protect multiple endpoints with login requirements using middleware
  - Create a `requireLogin` callback function
  - Pass `requireLogin` as middleware to the `/secret` route
- Create a new `/topsecret` route to test `requireLogin` middleware

### Refactoring to Model Methods
- Add a method, `findAndValidate`, to the user model, `userSchema.statics`, to group the authentication logic under the `User` schema
  - Remove validation logic from the `/login` route and instead use `findAndValidate` from `User`
- Let mongoose set the hash password when a new user registers
  - Add a `pre` middleware that triggers on `save`
    - If the password has not been modified go `next()`—useful for updating passwords
    - Otherwise update `this.password` to the same password, hashed using `bcrypt`, then call the `next()` middleware