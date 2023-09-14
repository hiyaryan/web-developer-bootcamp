// file system `fs`
// import { mkdir } from 'fs'; // import only mkdir
const fs = require("fs");

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir('dogs', { recursive: true }, (err) => {
    console.log("IN CALLBACK, DIR CREATED.");

    if (err) throw err;
});

fs.mkdirSync("cats");

setTimeout(() => {
    fs.rmdir('dogs', () => {
        console.log("dogs REMOVED");
    })

    fs.rmdir('cats', () => {
        console.log("cats REMOVED");
    })
}, 1000)

console.log("AFTER MKDIR IN THE FILE");

// creating directories using process arguments
const folderName = process.argv[2] || "project"

console.log(`Making folder: ${folderName}`);

try {
    fs.mkdirSync(folderName);

    // writeFileSync requires second argument, without the following error is thrown
    // TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received undefined
    fs.writeFileSync(`${folderName}/index.html`, "")
    fs.writeFileSync(`${folderName}/app.js`, "")
    fs.writeFileSync(`${folderName}/styles.css`, "")
} catch (e) {
    console.log("SOMETHING WENT WRONG");
    console.log(e);

    fs.rmdir(folderName, () => {
        console.log(`${folderName} REMOVED`);
    })
}