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

const fakeRequestPromise = (url) => {
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

// making a request using callbacks
// fakeRequestCallback("books.com/page1",
//     function (response) {
//         console.log(response);

//         fakeRequestCallback("books.com/page2",
//             function (response) {
//                 console.log(response);

//                 fakeRequestCallback("books.com/page3",
//                     function (response) {
//                         console.log(response);

//                     }, function (err) {
//                         console.log(err);
//                     })
//             }, function (err) {
//                 console.log(err);
//             })
//     }, function (err) {
//         console.log(err);
//     })


// making requests using promises without returning
// fakeRequestPromise("books.com/page1")
//     .then((response) => {
//         console.log(response);

//         fakeRequestPromise("books.com/page2")
//             .then((response) => {
//                 console.log(response);

//                 fakeRequestPromise("books.com/page3")
//                     .then((response) => {
//                         console.log(response);
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })
//     .catch((err) => {
//         console.log(err);
//     });


// making requests using promises with returning
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