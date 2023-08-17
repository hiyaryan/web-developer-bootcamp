// const password = prompt("Enter your password.");

// if (password.length >= 6 && password.indexOf(' ') === -1) {
//     console.log("VALID PASSWORD!");
// } else {
//     console.log("INCORRECT FORMAT FOR PASSWORD!")
// }

let age = 50;
if (age >= 0 && age < 5 || age >= 65) {
    console.log("FREE");
} else if (age >= 5 && age < 10) {
    console.log("$10");
} else if (age >= 10 & age < 65) {
    console.log("$20");
} else {
    console.log("INVALID AGE!");
}

// let firstName = prompt("enter your first name");
// if (!firstName) {
//     firstName = prompt("Try again!!!")
// }

age = 8;
if (!(age >= 0 && age < 5 || age >= 65)) {
    console.log("YOU ARE NOT A BABY OR A SENIOR!");
}