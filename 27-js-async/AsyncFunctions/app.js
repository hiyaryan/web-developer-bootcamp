// async functions

// a function declared with async automatically returns a promise without the necessity to include a `return` statement
async function hello() {

}

// if a `return` statement is included, the value returned is resolved into a `Promise`
const sing = async () => {
    // any type of error, like a syntax error, within an async function resolves itself into a rejected Promise
    // adsfasdf.asdf();
    throw new Error("UH OH")

    return "LA LA LA LA"
}

sing()
    .then((data) => {
        console.log(data);

    })
    .catch((err) => {
        console.log(err);
    })


const login = async (username, password) => {
    if (!username || !password) throw "Missing Credentials"
    if (password === "corgifeetarecute") return "WELCOME!"
    throw "Invalid Password"
}

// Missing Credentials
login("asdasdkf")
    .then(msg => {
        console.log("Logged in");
        console.log(msg);
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })

// Invalid Password
login("asdasdkf", "asdasdas")
    .then(msg => {
        console.log("Logged in");
        console.log(msg);
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })

// "WELCOME!"
login("asdasdkf", "corgifeetarecute")
    .then(msg => {
        console.log("Logged in");
        console.log(msg);
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })


// `await` keyword
const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay);
    })
}

// before using `await`
// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))
//     .then(() => delayedColorChange('white', 1000));

// after using `await`
async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
    await delayedColorChange('white', 1000)
}

rainbow().then(() => console.log("END OF RAINBOW!"));

// async functions can be called inside other async functions
// in this function rainbow must be complete before the print statement is executed
async function printRainbow() {
    await rainbow();
    console.log("END OF RAINBOW");
}


// capturing data from an async function
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;

        setTimeout(() => {
            if (delay > 4000) {
                reject("Connection Timeout :(");
            } else {
                resolve(`Here is your fake data from ${url}`);
            }
        }, delay)
    })
}

// without error catching
async function makeTwoRequestsWithoutErrorCatching() {
    // stops program if rejected 
    // and prints Uncaught (in promise) Connection Timeout :(
    let data1 = await fakeRequest("/page1");

    // prints "Here is your fake data from /page1"
    console.log(data1);
}

// with error catching
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