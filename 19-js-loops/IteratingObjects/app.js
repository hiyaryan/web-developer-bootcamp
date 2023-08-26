const testScores = {
    keenan: 80,
    damon: 67,
    kim: 89,
    shawn: 91,
    marlon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

// Using for...in to iterate over an object
for (let person in testScores) {
    console.log(`${person} scored ${testScores[person]}`);
}

// Using the Object methods
let total = 0;
let scores = Object.values(testScores)
for (let score of scores) {
    total += score;
    console.log(score);
}

console.log(`Average: ${total / scores.length}`);