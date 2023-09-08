# Section 28: AJAX and APIs

- [AJAX](#ajax)
- [Intro to APIs](#intro-to-apis)
- [XML](#xml)
- [JSON](#json)
- [Hoppscotch (or Postman)](#hoppscotch-or-postman)
- [HTTP](#http)
  - [Verbs](#verbs)
  - [Status Codes](#status-codes)
  - [Query Strings](#query-strings)
  - [Headers](#headers)
- [Making XHRs](#making-xhrs)
- [Using the Fetch API](#using-the-fetch-api)
- [Axios](#axios)
  - [Intro to Axios](#intro-to-axios)
  - [Setting Headers](#setting-headers)
- [TV Show Search App](#tv-show-search-app)

## [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
AJAX (Asynchronous JavaScript And XML) allows you to make requests in code similar to how the browser makes requests when you enter a url or press refresh, instead, the requests are made behind the scenes.

**Asynchronous JavaScript and XML**, or [Ajax](https://www.semanticscholar.org/paper/Ajax%3A-A-New-Approach-to-Web-Applications-Garrett/c440ae765ff19ddd3deda24a92ac39cef9570f1e?p2df), is not a technology in itself, but rather an approach to using a number of existing technologies together, including [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) or [XHTML](https://developer.mozilla.org/en-US/docs/Glossary/XHTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [XML](https://developer.mozilla.org/en-US/docs/Web/XML), [XSLT](https://developer.mozilla.org/en-US/docs/Web/XSLT), and most importantly the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object. When these technologies are combined in the Ajax model, web applications are able to make quick, incremental updates to the user interface without reloading the entire browser page. This makes the application faster and more responsive to user actions. Ajax's most appealing characteristic is its "asynchronous" nature, which means it can communicate with the server, exchange data, and update the page without having to refresh the page.

Note: To view requests being made see the `Network` tab on the Chrome dev tools

## Intro to APIs
An [API](https://developer.mozilla.org/en-US/docs/Glossary/API) (Application Programming Interface) is a set of features and rules that exist inside a software program (the application) enabling interaction with it through software - as opposed to a human user interface. The API can be seen as a simple contract (the interface) between the application offering it and other items, such as third-party software or hardware.

In Web development, an API is generally a set of code features (e.g. [methods](https://developer.mozilla.org/en-US/docs/Glossary/Method), [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property), events, and [URLs](https://developer.mozilla.org/en-US/docs/Glossary/URL)) that a developer can use in their apps for interacting with components of a user's web browser, other software/hardware on the user's computer, or third-party websites and services.

In summary APIs provide a method for separate software to access each others resources without the need for a user interface.

APIs used in this section:
- [icanhazdadjoke](https://icanhazdadjoke.com/api) - Dad Jokes
- [tvmaze](https://www.tvmaze.com/api) - TV Show Schedules
- [swapi](https://swapi.dev/) - Star Wars Characters

## [XML](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction)
XML (Extensible Markup Language) is a markup language similar to [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML), but without predefined tags to use. Instead, you define your own tags designed specifically for your needs. This is a powerful way to store data in a format that can be stored, searched, and shared. Most importantly, since the fundamental format of XML is standardized, if you share or transmit XML across systems or platforms, either locally or over the internet, the recipient can still parse the data due to the standardized XML syntax.

Example of an XML book object.
```
<book>
    <title> Learning Amazon Web Services </title>
    <author> Mark Wilkins </author>
</book>
```

Although X in Ajax stands for XML, [JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON) is preferred because it is lighter in size and is written in JavaScript. Both JSON and XML are used for packaging information in the Ajax model.

## [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
[JavaScript Object Notation](http://json.org/json-en.html) (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

Example of a JSON films object.
```
var films = [{"FilmID":"catmanbegins", "Image":"https://m.media-amazon.com/images/catmanbegins.jpg"},
  {"FilmID":"cabdriver", "Image":"https://m.media-amazon.com/images/cabdriver.jpg"},
  {"FilmID":"pulpnonfiction", "Image":"https://m.media-amazon.com/images/pulpnonfiction.jpg"},
  {"FilmID":"doctornormal", "Image":"https://m.media-amazon.com/images/doctornormal.jpg"},
  {"FilmID":"backtothepresent", "Image":"https://m.media-amazon.com/images/backtothepresent.jpg"}];
```

Example of a JSON super hero object.
```
{
    "squadName": "Super hero squad",
    "hometown": "Metro City",
    "formed": 2016,
    "secretBase": "Super Tower",
    "active": true,
    "members": [
        "Molecule Man",
        "Madame Uppercut",
        "Eternal Flame",
    ],
}
```

To view if an object has valid JSON syntax use [JSON Formatter and Validator](https://jsonformatter.curiousconcept.com/) tool.

### [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
JSON is returned as a string but it can be converted into a JavaScript object using the `JSON` object `parse()` method.

The `JSON.parse()` static method parses a JSON string, constructing the JavaScript value or object described by the string. An optional *reviver* function can be provided to perform a transformation on the resulting object before it is returned.

```
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
// Expected output: 42

console.log(obj.result);
// Expected output: true
```

### [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
An API might require that a JSON object be a string when making a request. The `JSON` object has a method `stringify()` that can convert JavaScript objects into a string.

The `JSON.stringify()` static method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

```
console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: '{"x":5,"y":6}'

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// Expected output: '[3,"false",false]'

console.log(JSON.stringify({ x: [10, undefined, function () {}, Symbol('')] }));
// Expected output: '{"x":[10,null,null,null]}'

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// Expected output: '"2006-01-02T15:04:05.000Z"'
```

## Hoppscotch (or Postman)
Tools that can make requests to APIs used to help create APIs or learn how they work.

### [Postman](https://www.postman.com/)
Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster. **Requires sign up**

### [Hoppscotch](https://hoppscotch.io/)
Hoppscotch is a lightweight, web-based API development suite. It was built from the ground up with ease of use and accessibility in mind providing all the functionality needed for API developers with minimalist, unobtrusive UI. **Does not require sign up**

Example
- A request can be sent to this url https://swapi.dev/ which returns the entire website in HTML. In general, requests will be made that do not return HTML but JSON objects.
- To access the websites API that returns a JSON object, a request can be sent to this url https://swapi.dev/api/people/1 where a JSON resource is located.
```
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/"
  ],
  "species": [],
  "vehicles": [
    "https://swapi.dev/api/vehicles/14/",
    "https://swapi.dev/api/vehicles/30/"
  ],
  "starships": [
    "https://swapi.dev/api/starships/12/",
    "https://swapi.dev/api/starships/22/"
  ],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "https://swapi.dev/api/people/1/"
}
```

Example
- Send a request to the catfact API for a cat fact https://catfact.ninja/fact 
```
{
  "fact": "Purring does not always indicate that a cat is happy. Cats will also purr loudly when they are distressed or in pain.",
  "length": 117
}
```
- Send a request to the catfact API for a list of cat breeds https://catfact.ninja/breeds
```
{
  "current_page": 1,
  "data": [
    {
      "breed": "Abyssinian",
      "country": "Ethiopia",
      "origin": "Natural/Standard",
      "coat": "Short",
      "pattern": "Ticked"
    },
    {
      "breed": "Aegean",
      "country": "Greece",
      "origin": "Natural/Standard",
      "coat": "Semi-long",
      "pattern": "Bi- or tri-colored"
    },
    {
      "breed": "American Curl",
      "country": "United States",
      "origin": "Mutation",
      "coat": "Short/Long",
      "pattern": "All"
    },
    ...
```

If the same request is made using the Chrome browser (Firefox offers Raw Data or JSON format viewing) then it returns in Raw Data format
```
{"current_page":1,"data":[{"breed":"Abyssinian","country":"Ethiopia","origin":"Natural\/Standard","coat":"Short","pattern":"Ticked"},{"breed":"Aegean","country":"Greece","origin":"Natural\/Standard","coat":"Semi-long","pattern":"Bi- or tri-colored"},{"breed":"American Curl","country":"United States","origin":"Mutation","coat":"Short\/Long","pattern":"All"},...
```

## [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
*Hypertext Transfer Protocol (HTTP)* is an [application-layer](https://en.wikipedia.org/wiki/Application_Layer) protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes. HTTP follows a classical [client-server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) model, with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a [stateless protocol](https://en.wikipedia.org/wiki/Stateless_protocol), meaning that the server does not keep any data (state) between two requests.

### [Verbs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
HTTP defines a set of **request methods** to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred to as *HTTP verbs*. Each of them implements a different semantic, but some common features are shared by a group of them: e.g. a request method can be [safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP), [idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent), or [cacheable](https://developer.mozilla.org/en-US/docs/Glossary/Cacheable).

[GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) The `GET` method requests a representation of the specified resource. Requests using `GET` should only retrieve data.

[HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) The `HEAD` method asks for a response identical to a `GET` request, but without the response body.

[POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) The `POST` method submits an entity to the specified resource, often causing a change in state or side effects on the server.

[PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) The `PUT` method replaces all current representations of the target resource with the request payload.

[DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) The `DELETE` method deletes the specified resource.

[CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT) The `CONNECT` method establishes a tunnel to the server identified by the target resource.

[OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) The `OPTIONS` method describes the communication options for the target resource.

[TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE) The `TRACE` method performs a message loop-back test along the path to the target resource.

[PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) The `PATCH` method applies partial modifications to a resource.

### [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
 HTTP response status codes indicate whether a specific [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) request has been successfully completed. Responses are grouped in five classes:
- [Informational responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses) (100 – 199)
- [Successful responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses) (200 – 299)
- [Redirection message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)s (300 – 399)
- [Client error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) (400 – 499)
- [Server error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) (500 – 599)

### [Query Strings](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)
The Star Wars API `https://swapi.dev/api/people/` returns and entire list of people, `https://swapi.dev/api/people/:id`, where `:id` is a variable that returns one person from the list. If `people` is misspelled, e.g. `peoples`, or an invalid `:id` is entered, a `404` will be returned.

Note: `:id` must be replaced by some value. It is also common to see `<id>` or `{{id}}` in documentation.

URLs contain a query string indicated by a `'?'`. A query string allows the user to search URL resources with more specificity.

The strings after the `'?'` is the query string.
```
https://www.amazon.com?k=bucatini&crid=3idufdws0da5&sprefix=bucat%2caps%2c317&ref=nb_sb_noss_2
```

Example of a more simple query string
```
?sort=desc&color=blue
```

Query strings can be flexible and may not necessarily return something. Unlike the other parts of a URL.

A nonsense query string still returns the resource at that endpoint.
```
https://swapi.dev/api/people/5?color=green&age=23&silly=yes

// returns
{
    "name": "Leia Organa",
    "height": "150",
    "mass": "49",
    "hair_color": "brown",
    "skin_color": "light",
    "eye_color": "brown",
    "birth_year": "19BBY",
    "gender": "female",
    ...
```

In Hoppscotch (or Postman), queries can be entered into the `Parameters` to more easily query the resource. When these tools send a request they automatically add the query to the end of the URL. 

### Headers
Headers are an additional way of passing information with a given request and response. They are key-value pairs, or metadata, that contain additional details about the request or response.

Headers can be viewed in the `Network` tab of Chrome dev tools.

Request and response headers from `github.com`
```
// request header
:authority:
github.com
:method:
GET
:path:
/
:scheme:
https
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding:
gzip, deflate, br
Accept-Language:
en-US,en;q=0.9,la;q=0.8
Cache-Control:
max-age=0
...


// response header
Accept-Ranges:
bytes
Cache-Control:
max-age=0, private, must-revalidate
Content-Encoding:
gzip
Content-Language:
en-US
Content-Security-Policy:
...
Content-Type:
text/html; charset=utf-8
Date:
Fri, 08 Sep 2023 18:41:52 GMT
...
```

Certain APIs require headers in order to access their resources. The `icanhazdadjoke.com` API returns the pages HTML if there are no headers supplied.

The header (found in the websites documentation) required to make a valid request requires a response format, in particular the `Accept` key-value either in `text/html`, `application/json`, or `text/plain`.
```
Accept: application/json
```

## Making [XHRs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
`XMLHttpRequest` (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing.

`XMLHttpRequest` is used heavily in [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) programming.

Despite its name, `XMLHttpRequest` can be used to retrieve any type of data, not just XML.

XHRs (XMLHttpRequest) are the original way to make requests in JavaScript code.
- They do not support promises (so there are a large number of callbacks).
- It has strange capitalization. 
- It has clunky syntax.

```
const myReq = new XMLHttpRequest();

myReq.onload = function() {
    const data = JSON.parse(this.responseText);
    console.log(data);
};

myReq.onerror = function(err) {
    console.log("ERROR", err);
};

myReq.open("get", "https://icanhazdadjoke.com/", true);
myReq.setRequestHeader("Accept", "application/json");
myReq.send();
```

## Using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

Fetch is a newer way of making requests in JavaScript code.
- It supports promises.
- Not supported in Internet Explorer.

```
fetch("https://icanhazdadjoke.com/23/2", {
    headers: { Accept: "application/json" }
})
    .then((res) => {
        if (res.status !== 200) {
            console.log("Problem!", res.status);
        }

        res.json().then((data) => {
            console.log(data);
        });
    })
    .catch(function(error) {
        console.log("Fetch Error", err);
    })
```

Here we are fetching a JSON object across the network, parsing it, and printing the data to the console. The simplest use of `fetch()` takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

The [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, we use the [`json()`](#json-1) method, which returns a second promise that resolves with the result of parsing the response body text as JSON.

### [`json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
 The `json()` method of the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface takes a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

Note that despite the method being named `json()`, the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

## [Axios](https://axios-http.com/docs/intro)
Axios is a library for making HTTP requests. It is a third party library (not native to JavaScript). Behind the scenes Axios uses fetch in the browser.

### Intro to Axios
Axios is a [promise-based](https://javascript.info/promise-basics) HTTP Client for `node.js` and the browser. It is [isomorphic](https://www.lullabot.com/articles/what-is-an-isomorphic-application) (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js `http` module, while on the client (browser) it uses `XMLHttpRequests`.

To include Axios on the client side it must be installed or imported via CDN. See documentation for all installation methods.

Using jsDelivr CDN:
```
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Unlike a normal `fetch` request where the `json()` method is required to retrieve the data, Axios fills in the data field in one go, so the `json()` method is not required.

### Setting Headers
[These](https://axios-http.com/docs/req_config) are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.

Pass the config object containing the headers as an argument to the second parameter.
```
const config = {
    headers: {
        Accept: "application/json"
    }
}
const res = await axios.get("https://icanhazdadjoke.com/", config);
```

## TV Show Search App
[TVMAZE API](https://www.tvmaze.com/api)

See TVShowSearch folder.