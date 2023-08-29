// hello.toUpperCase() // Error program crashes

try {
    hello.toUpperCase(); // Error program does not crash
} catch {
    console.log("Error!!!");
}

console.log("Program did not crash...");

function yell(msg) {
    try {
        console.log(msg.toUpperCase().repeat(3));
    } catch (e) {
        console.log(e);
        console.log("Please pass a string next time!");
    }
}

yell("hello")
yell(true)