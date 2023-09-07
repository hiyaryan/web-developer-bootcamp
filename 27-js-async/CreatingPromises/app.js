// creating promises

// 1. create a callback function that returns a promise
const fakeRequest = (url) => {
    const rand = Math.random();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (rand > 0.7) {
                // arguments passed to resolve are returned to caller
                resolve("FAKE DATA HERE");
            }

            // arguments passed to reject are returned to caller
            reject("REQUEST ERROR")
        }, 1000)
    })
}

// 2. call the function
fakeRequest("/dog/1")
    // use then to define what to do for resolve()
    .then((data) => {
        // data passed from resolve() arguments
        console.log(data);
    })
    // use catch to define what to do for reject()
    .catch((err) => {
        // err message passed from reject() arguments
        console.log(err);
    })



// before promises
// delayedColorChange method from CallbackHell/app.js
// const delayedColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//         doNext();
//     }, delay);
// }

// delayedColorChange('red', 1000, () => {
//     delayedColorChange('orange', 1000, () => {
//         delayedColorChange('yellow', 1000, () => {
//             delayedColorChange('green', 1000, () => {
//                 delayedColorChange('blue', 1000, () => {
//                     delayedColorChange('indigo', 1000, () => {
//                         delayedColorChange('violet', 1000, () => {
//                             delayedColorChange('white', 1000, () => {
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })

// after promises
const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay);
    })
}

// using implicit returns
delayedColorChange('red', 1000)
    .then(() => delayedColorChange('orange', 1000))
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('green', 1000))
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('indigo', 1000))
    .then(() => delayedColorChange('violet', 1000))
    .then(() => delayedColorChange('white', 1000));