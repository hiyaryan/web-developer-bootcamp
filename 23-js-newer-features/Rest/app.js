function sum() {
    console.log(arguments);

    // TypeError: arguments.reduce is not a function
    // error since the arguments object does not include array methods
    // return arguments.reduce((total, el) => total + el)
}

sum(3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5)

function sumAll(...nums) {
    console.log(nums);

    // no error since arguments have been added to an array
    return nums.reduce((total, el) => total + el)
}

console.log(sumAll(3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5));


function raceResults(gold, silver, ...everyoneElse) {
    console.log(`GOLD MEDAL GOES TO: ${gold}`);
    console.log(`SILVER MEDAL GOES TO: ${silver}`);
    console.log(`AND THANKS TO EVERYONE ELSE: ${everyoneElse}`);
}

raceResults("Tammy", "Todd", "Tina", "Trevor", "Travis");
