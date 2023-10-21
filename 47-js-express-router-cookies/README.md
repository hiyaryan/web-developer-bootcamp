# Section 47: Express Routers & Cookies

- [Express Router Intro](#express-router-intro)
  - [Router](#router)
- [Express Router & Middleware](#express-router--middleware)
- [Cookies Intro](#cookies-intro)
- [Sending Cookies](#sending-cookies)
  - [`res.cookie(name, value [, options])`](#rescookiename-value--options)
- [Cookie Parser Middleware](#cookie-parser-middleware)
  - [`cookie-parser`](#cookie-parser)
  - [`cookieParser(secret, options)`](#cookieparsersecret-options)
- [Signing Cookies](#signing-cookies)
  - [req.signedCookies](#reqsignedcookies)
- [HMAC Signing](#hmac-signing)

## Express [Router](https://expressjs.com/en/4x/api.html#express.router) Intro
`express.Router([options])` creates a new [router](https://expressjs.com/en/4x/api.html#router) object.
```
var router = express.Router([options])
```

The optional `options` parameter specifies the behavior of the router.

| Property        | Description                                                                                                                                           | Default                                                                     | Availability |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------ |
| `caseSensitive` | Enable case sensitivity.                                                                                                                              | Disabled by default, treating “/Foo” and “/foo” as the same.                |              |
| `mergeParams`   | Preserve the `req.params` values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence. | `false`                                                                     | 4.5.0+       |
| `strict`        | Enable strict routing.                                                                                                                                | Disabled by default, “/foo” and “/foo/” are treated the same by the router. |              |

You can add middleware and HTTP method routes (such as `get`, `put`, `post`, and so on) to `router` just like an application.

### Router
A `router` object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to [`app.use()`](https://expressjs.com/en/4x/api.html#app.use) or as the argument to another router’s [`use()`](https://expressjs.com/en/4x/api.html#router.use) method.

The top-level `express` object has a [Router()](https://expressjs.com/en/4x/api.html#express.router) method that creates a new `router` object.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as `get`, `put`, `post`, and so on) to it just like an application.

```js
// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
  // ..
})
```

You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.
```js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router)
```

## Express Router & Middleware
Middleware can be route specific. To apply middleware to a specific route, use `router.use` in the router file.

Using an `/admin` route in `app.js`.
```js
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);
```

Defining middleware in an `admin.js` router file and a path accessible only if `isAdmin`.
```js
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }

    res.send("SORRY NOT AN ADMIN")
});

router.get("/topsecret", (req, res) => {
    res.send("THIS IS TOP SECRET!");
});
```

## Cookies Intro
[Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) are little bits of information that are stored in a user's browser when browsing a particular website.

Once a cookie is set, a user's browser will send the cookie on every subsequent request to the site.

**Cookies allow us to make HTTP stateful.** See [HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie#Uses) on Wikipedia for more more information on the following list of uses.
- Session management
- Personalization
- Tracking

## Sending Cookies
After setting a cookie with [`res.cookie`](#rescookiename-value--options) send it with `res.send`.

### [`res.cookie(name, value [, options])`](https://expressjs.com/en/4x/api.html#res.cookie)
Sets cookie `name` to `value`. The `value` parameter may be a string or object converted to JSON.

The `options` parameter is an object that can have the following properties.

| Property | Type              | Description                                                                                                                                             |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| domain   | String            | Domain name for the cookie. Defaults to the domain name of the app.                                                                                     |
| encode   | Function          | A synchronous function used for cookie value encoding. Defaults to `encodeURIComponent`.                                                                |
| expires  | Date              | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.                                                               |
| httpOnly | Boolean           | Flags the cookie to be accessible only by the web server.                                                                                               |
| maxAge   | Number            | Convenient option for setting the expiry time relative to the current time in milliseconds.                                                             |
| path     | String            | Path for the cookie. Defaults to “/”.                                                                                                                   |
| priority | String            | Value of the “Priority” Set-Cookie attribute.                                                                                                           |
| secure   | Boolean           | Marks the cookie to be used with HTTPS only.                                                                                                            |
| signed   | Boolean           | Indicates if the cookie should be signed.                                                                                                               |
| sameSite | Boolean or String | Value of the “SameSite” **Set-Cookie** attribute. More information at https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1. |

Example setting cookies.
```js
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
```

## Cookie Parser Middleware
To read cookies on the server requires the npm module [`cookie-parser`](https://www.npmjs.com/package/cookie-parser).

Install `cookie-parser`.
```bash
npm i cookie-parser
```

### `cookie-parser`
Parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names. Optionally you may enable [signed cookie](#signing-cookies) support by passing a `secret` string, which assigns `req.secret` so it may be used by other middleware.

Example using `cookie-parser` to read cookies sent from the client.
```js
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(8080)

// curl command that sends an HTTP request with two cookies
// curl http://127.0.0.1:8080 --cookie "Cho=Kim;Greet=Hello"
```

### [`cookieParser(secret, options)`](https://www.npmjs.com/package/cookie-parser#api)
Create a new cookie parser middleware function using the given `secret` and `options`.

- `secret` a string or array used for signing cookies. This is optional and if not specified, will not parse signed cookies. If a string is provided, this is used as the secret. If an array is provided, an attempt will be made to unsign the cookie with each secret in order.
- `options` an object that is passed to `cookie.parse` as the second option. See [cookie](https://www.npmjs.org/package/cookie) for more information.
  - `decode` a function to decode the value of the cookie

## Signing Cookies
Cookies can be signed to verify its integrity. Signing is not encryption. It is a way to ensure that the data has not been tampered with. In other words it is a way to ensure that the data being sent to the client is the same being sent back.

When using [`cookie-parser`](https://www.npmjs.com/package/cookie-parser) middleware, this method also supports signed cookies. Simply include the `signed` option set to `true`. Then `res.cookie()` will use the secret passed to [`cookieParser(secret)`](#cookieparsersecret-options) to sign the value.

```js
res.cookie('name', 'tobi', { signed: true })
```

### [req.signedCookies](https://expressjs.com/en/4x/api.html#req.signedCookies)
When using [cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware, this property contains signed cookies sent by the request, unsigned and ready for use. Signed cookies reside in a different object to show developer intent; otherwise, a malicious attack could be placed on `req.cookie` values (which are easy to spoof). Note that signing a cookie does not make it “hidden” or encrypted; but simply prevents tampering (because the secret used to sign is private).

If no signed cookies are sent, the property defaults to `{}`.

```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
console.dir(req.signedCookies.user)
// => 'tobi'
```

If a tampered cookie is sent or the integrity of the cookie is compromised, the return value is `<name>: false` where `name` is the name of the cookie.

Example of a cookie `{fruit: grape}` in signed format.
| name  | value                                                   |
| ----- | ------------------------------------------------------- |
| fruit | s%3Agrape.LMNZojp%2FiR9Tsj50P0ysA22deJjrP0awUK0S8R3lTUk |

Example of the same cookie tampered in signed format that returns `{fruit: false}` from the server.
| name  | value                                                   |
| ----- | ------------------------------------------------------- |
| fruit | s%3Aapple.LMNZojp%2FiR9Tsj50P0ysA22deJjrP0awUK0S8R3lTUk |

Example of the same cookie `{fruit: grape}` in unsigned format that returns `{}` from the server.
| name  | value |
| ----- | ----- |
| fruit | grape |

## [HMAC](https://en.wikipedia.org/wiki/HMAC) Signing
In [cryptography](https://en.wikipedia.org/wiki/Cryptography), an `HMAC` (sometimes expanded as either **keyed-hash message authentication code** or **hash-based message authentication code**) is a specific type of [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code) (MAC) involving a cryptographic hash function and a secret cryptographic key. As with any MAC, it may be used to simultaneously verify both the data integrity and authenticity of a message. An HMAC is a type of keyed hash function that can also be used in a key derivation scheme or a key stretching scheme.

See [HMAC Generator / Tester Tool](https://freeformatter.com/hmac-generator.html) to experiment computing HMAC on a value with a secret.

Example of a [function](https://github.com/tj/node-cookie-signature/blob/master/index.js#L16) that uses HMAC to encrypt a value with a secret.
```js
exports.sign = function(val, secret){
  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
  if (null == secret) throw new TypeError("Secret key must be provided.");
  return val + '.' + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');
};
```

Example of a [function](https://github.com/tj/node-cookie-signature/blob/master/index.js#L36) that uses HMAC to decrypt a value with a secret.
```js
exports.unsign = function(input, secret){
  if ('string' != typeof input) throw new TypeError("Signed cookie string must be provided.");
  if (null == secret) throw new TypeError("Secret key must be provided.");
  var tentativeValue = input.slice(0, input.lastIndexOf('.')),
      expectedInput = exports.sign(tentativeValue, secret),
      expectedBuffer = Buffer.from(expectedInput),
      inputBuffer = Buffer.from(input);
  return (
    expectedBuffer.length === inputBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, inputBuffer)
   ) ? tentativeValue : false;
};
```