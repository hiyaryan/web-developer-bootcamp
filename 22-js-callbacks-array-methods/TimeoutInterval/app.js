// timeout
console.log("HELLO!!!...");

setTimeout(() => console.log("...are you still there?"), 3000);

console.log("GOODBYE!!");

// interval
const id = setInterval(() => console.log(Math.random()), 2000)

// stop interval after 6 seconds
setTimeout(() => clearInterval(id), 6000)