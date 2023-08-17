// console.log("BEFORE CONDITIONAL")

// let random = Math.random()

// if (random < 0.5) {
//     console.log("YOUR NUMBER IS LESS THAN 0.5!!!");
//     console.log(random);
// }

// if (random >= 0.5) {
//     console.log("YOUR NUMBER IS GREATER THAN OR EQUAL TO 0.5!!!");
//     console.log(random);
// }


// console.log("AFTER CONDITIONAL");


// const dayOfWeek = prompt("Enter a day!").toLowerCase();
const dayOfWeek = "friday";

if (dayOfWeek === "monday") {
    console.log("UGHH I hate Mondays!");
} else if (dayOfWeek === "saturday") {
    console.log("YAY I love Saturdays!");
} else if (dayOfWeek === "friday") {
    console.log("Fridays are decent, but only after work.");
} else {
    console.log("MEH");
}

// const age = 3;

// if (age < 5) {
//     console.log("Babies get in free");
// } else if (age < 10) {
//     console.log("$10 for children.");
// } else if (age < 65) {
//     console.log("$20 for adults");
// } else {
//     console.log("$10 for seniors")   
// }


const password = prompt("please enter a new password")

if (password.length >= 6) {
    console.log("LONG ENOUGH PASSWORD");

    if (password.includes(" ")) {
        console.log("PASSWORD CANNOT CONTAIN A SPACE");
    } else {
        console.log("Valid Password!");
    }
} else {
    console.log("PASSWORD TOP SHORT! Must be 6+ characters.");
}