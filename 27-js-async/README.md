# Section 27: Async JavaScript

- [The Call Stack](#the-call-stack)
- [WebAPIs & Single Threaded](#webapis--single-threaded)
- [Callback Hell](#callback-hell)
- [Demos](#demos)
  - [fakeRequest using Callbacks](#fakerequest-using-callbacks)
  - [fakeRequest using Promises](#fakerequest-using-promises)
- [Promises](#promises)
  - [Overview](#overview)
  - [Creating Promises](#creating-promises)
- [The `async` Keyword](#the-async-keyword)
- [The `await` Keyword](#the-await-keyword)
- [Handling Errors in Async Functions](#handling-errors-in-async-functions)

## The [Call Stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
The call [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) (LIFO data structure) is the mechanism the JS interpreter uses to keep track of its place in a script that calls multiple functions. It is how JS "knows" what function is currently being run and what functions are called from within that function, etc.

- When a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function.
- Any functions that are called by that function are added to the call stack further up, and run where their calls are reached.
- When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing.
- If the stack takes up more space than it was assigned, a "stack overflow" error is thrown.

**Visualization tool**: [Loupe](http://latentflip.com/loupe/)

**Chrome Debugger**: Click `app.js` in `Source`, add *breakpoint* on line to inspect, and view `Call Stack` dropdown while using step controls.

Example
```
function greeting() {
  // [1] Some code here
  sayHi();
  // [2] Some code here
}
function sayHi() {
  return "Hi!";
}

// Invoke the `greeting` function
greeting();

// [3] Some code here
```

The code above would be executed like this:
1. Ignore all functions, until it reaches the greeting() function invocation.
2. Add the greeting() function to the call stack list.
3. Execute all lines of code inside the greeting() function.
4. Get to the sayHi() function invocation.
5. Add the sayHi() function to the call stack list.
6. Execute all lines of code inside the sayHi() function, until reaches its end.
7. Return execution to the line that invoked sayHi() and continue executing the rest of the greeting() function.
8. Delete the sayHi() function from our call stack list. 
9. When everything inside the greeting() function has been executed, return to its invoking line to continue executing the rest of the JS code.
10. Delete the greeting() function from the call stack list. 

## WebAPIs & Single Threaded
JavaScript is single threaded. This means that at any point in time, a single JS thread is running at most one line of JS code.

If something takes a long time such as saving data to a database,
```
const newTodo = input.value; // get user input
saveToDatabase(newTodo); // could take a while
input.value = '';
```
certain techniques are used so that the rest of the code may run while waiting for this line of code. For instance,
```
console.log("I print first!");
setTimeout(() => {
    console.log("I print after 3 seconds");
}, 3000);
console.log("I print second!");
```
the last print statement prints second while the program waits for the callback in the timeout method which executes last.

JavaScript can seemingly prevent a single line of code with a long execution time from taking up all of the resources through the browser.
- Browsers come with Web APIs that are able to handle certain tasks in the background (like making requests or setTimeout).
- The JS call stack recognizes these Web API functions and passes them off to the browser to take care of.
- Once the browser finishes those tasks, they return and are pushed onto the stack as a callback.

The `setTimeout` function tells the browser to remind it in 3 seconds to add its callback to the stack.  

## Callback Hell
Callbacks are often nested inside of callbacks.

```
function doStep1(init, callback) {
  const result = init + 1;
  callback(result);
}

function doStep2(init, callback) {
  const result = init + 2;
  callback(result);
}

function doStep3(init, callback) {
  const result = init + 3;
  callback(result);
}

function doOperation() {
  doStep1(0, (result1) => {
    doStep2(result1, (result2) => {
      doStep3(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperation();
```
Because there are call callbacks inside callbacks, the `doOperation()` function becomes deeply nested, which is much harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation looks like a pyramid on its side).

When callbacks are nested like this, it can also get very hard to handle errors: often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Demos
Preview: a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the eventual completion or failure of an asynchronous operation.

A `promise` is a returned object to which you attach callbacks, instead of passing callbacks into a function. 

A common pattern using callbacks that is prone to callback hell is,
```
makeRequest(() => {

}, () => {

})
```

### fakeRequest using Callbacks
Demo making a request using callbacks.

Function to make requests using callbacks.
```
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;

    setTimeout(() => {
        if (delay > 4000) {
            failure("Connection Timeout :(");
        } else {
            success(`Here is your fake data from ${url}`);
        }
    }, delay);
}
```

To make a series of requests results in callback hell.
```
fakeRequestCallback("books.com/page1",
    function (response) {
        console.log(response);

        fakeRequestCallback("books.com/page2",
            function (response) {
                console.log(response);

                fakeRequestCallback("books.com/page3",
                    function (response) {
                        console.log(response);

                    }, function (err) {
                        console.log(err);
                    })
            }, function (err) {
                console.log(err);
            })
    }, function (err) {
        console.log(err);
    })
```

### fakeRequest using Promises
Demo making a request using Promises.

Function to make requests using promises.
```
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;

        setTimeout(() => {
            if (delay > 4000) {
                reject("Connection Timeout :(");
            } else {
                success(`Here is your fake data from ${url}`);
            }
        }, delay);
    })
}
```

In contrast to making a request using callbacks, promises do not require callbacks to be passed as they automatically return either a success or failed request.
```
fakeRequestPromise("books.com/page1")
    .then((response) => {
        console.log(response);

        fakeRequestPromise("books.com/page2")
            .then((response) => {
                console.log(response);

                fakeRequestPromise("books.com/page3")
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .catch((err) => {
        console.log(err);
    });
```

## Promises
In the previous section there does not seem to be an improvement over using callbacks. However call backs can be returned which improves, or flattens, the request, with a single catch statement handling all error cases.

```
fakeRequestPromise("books.com/page1")
    .then((response) => {
        console.log(response);
        return fakeRequestPromise("books.com/page2")
    })
    .then((response) => {
        console.log(response);
        return fakeRequestPromise("books.com/page3")
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Overview
The [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

A `Promise` is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

#### `Promise` States
- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation was completed successfully.
- rejected: meaning that the operation failed.

The *eventual* state of a pending promise can either be *fulfilled* with a value or *rejected* with a reason (error). When either of these options occur, the associated handlers queued up by a promise's `then` method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached. 

### Creating Promises
There are three [states](#promise-states) to a promise.

```
// fulfilled state  
new Promise((resolve, reject) => {
    resolve();
})

// rejected state
new Promise((resolve, reject) => {
    reject();
})

// pending state
new Promise((resolve, reject) => {
    // returns nothing
})
```

To create a promise
1. Create a callback function that returns a `new Promise` and data to be returned.
```
const request = (url) => {
    return new Promise((resolve, reject) => {
        // if (...) {
            resolve("Success");
        } else {
            reject("Error");
        }
    })
} 
```

2. Call the callback function and handle the promise's `then`, `catch`, or `finally` methods.
```
request("/dogs/1")
    .then((data) => {
        console.log(data) // returns "Success"
    })
    .catch((err) => {
        console.log(data) // returns "Error"
    });
```

## The [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) Keyword
Async functions offer new and cleaner syntax for working with `async` code. It is syntactic sugar for promises. 

The `async function` declaration creates a [binding](https://developer.mozilla.org/en-US/docs/Glossary/Binding) of a new async function to a given name. The `await` keyword is permitted within the function body, enabling asynchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.

Async functions always return a `Promise`. If the function returns a value, the `Promise` will be resolved with that value. If the function throws an exception, the promise will be rejected. 

```
async function hello() {
    return "Hey guy!";
}

hello(); // Promise {<resolved>: "Hey guy!"}

async function uhOh() {
    throw new Error("oh no!"); 
}

uhOh(); // Promise {<rejected> Error: oh no!}
```

You can also define async functions using the [`async function` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function).

Syntax
```
async function name(param0) {
    statements
}
async function name(param0, param1) {
    statements
}
async function name(param0, param1, /* …, */ paramN) {
    statements
}
```

Example
```
function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();
```

## The [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) Keyword
The `await` operator is used to wait for a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and get its fulfillment value. It can only be used inside an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) or at the top level of a [module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

- The `await` keyword can only be used inside of functions declared with `async.`
- `await` will pause the execution of the function, waiting for a `Promise` to be resolved.

Syntax
```
await expression
```

Parameters
- `expression` - A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), a [thenable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables), or any value to wait for.

Data can be captured from within an async function by assigning what is being awaited to a variable.
```
async function makeTwoRequests() {
    // stops program if rejected and prints Uncaught (in promise) Connection Timeout :(
    let data1 = await fakeRequest("/page1");

    // prints `Here is your fake data from /page1`
    console.log(data1);
}
```

## Handling Errors in Async Functions 
Handle errors in async functions in `try...catch` blocks.

The error `e` in the catch block is the error defined in the `Promise`.
```
async function makeTwoRequests() {
    try {
        const data1 = await fakeRequest("/page1");
        // prints "Here is your fake data from /page1"
        console.log(data1);

        const data2 = await fakeRequest("/page2");
        // prints "Here is your fake data from /page2"
        console.log(data2);

    } catch (e) {
        // print Connection Timeout :(
        console.log(e);
    }
}
```