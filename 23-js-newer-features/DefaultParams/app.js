// without default value in the function signature
function rollDieOld(numSides) {
    if (numSides === undefined) {
        numSides = 6
    }
    return Math.floor(Math.random() * numSides) + 1
}

// with default value in the function signature
function rollDie(numSides = 6) {
    return Math.floor(Math.random() * numSides) + 1
}

// default parameter comes last
function greet(person, msg = "Hey there") {
    console.log(`${msg}, ${person}!`);
}