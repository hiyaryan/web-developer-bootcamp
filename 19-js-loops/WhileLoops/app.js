let count = 0;

// More common to use for loops for this
while (count < 10) {
    console.log(count);
    count++;
}

// Equivalent for loop
for (let i = 1; i < 10; i++) {
    console.log(i);
}

// More common usage of while loops
const SECRET = "BabyHippo"

let code = prompt("enter the secret code...");
while (code !== SECRET) {
    code = prompt("enter the secret code...");
}
alert("CONGRATS YOU GOT THE SECRET!")


// Break keyword
let input = prompt("Hey, say something");
while (true) {
    input = prompt(input);
    if (input.toLowerCase() === "stop copying me") {
        break;
    }
}
console.log("OK YOU WIN!");

for (let i = 0; i < 1000; i++) {
    console.log(i);
    if (i === 100) break;
}

// Guessing game
let maximum = parseInt(prompt("Enter the maximum number!"));

while (!maximum) {
    maximum = parseInt(prompt("Enter a valid number!"));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;
console.log(targetNum);

let guess = prompt("Enter your first guess! (Type 'q' to quit)");
let attempts = 1;

while (parseInt(guess) !== targetNum) {
    if (guess === 'q') break;

    guess = parseInt(guess)
    if (guess > targetNum) {
        guess = prompt("Too high! Enter a new guess:");
        attempts++;
    } else if (guess < targetNum) {
        guess = prompt("Too low. Enter a new guess:");
        attempts++;
    } else {
        guess = prompt("Invalid guess. Please enter a number or 'q' to quit.")
    }
}

if (guess === 'q') {
    console.log("OK, you quit!");
} else {
    console.log("Congrats you win!");
    console.log(`You got it! It took you ${attempts} guesses!`);
}