// prints first
console.log("Sending request to the server!");

setTimeout(() => {
    // prints third
    console.log("Here is your data from the server...");
}, 3000);

// prints second
console.log("I am at the end of the file.");