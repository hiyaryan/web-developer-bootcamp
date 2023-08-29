// function collectEggs() {
//     let totalEggs = 6;
// }

// collectEggs();
// console.log(totalEggs) // ReferenceError: totalEggs is not defined


let totalEggs = 0;
function collectEggs() {
    totalEggs = 6;
}

collectEggs();
console.log(totalEggs) // totalEggs in scope


let bird = "Scarlet Macaw";
function birdWatch() {
    let bird = "Great Blue Heron";
    console.log(bird); // Great Blue Heron
}

birdWatch()
console.log(bird); // Scarlet Macaw


// Block scope
let radius = 8;
if (radius > 0) {
    const PI = 3.14159;
    let msg = 'HIII!';
}

console.log(radius);
// console.log(PI); // ReferenceError: PI is not defined
// console.log(msg); // ReferenceError: msg is not defined

for (let i = 0; i < 5; i++) {
    let msg = "ADFDGFSDHJLK"
    console.log(msg);
}

// console.log(msg); // ReferenceError: msg is not defined


// Lexical scope
function bankRobbery() {
    const heroes = ['Spiderman', 'Wolverine', 'Black Panther', 'Batwoman'];

    function cryForHelp() {

        function inner() {
            for (let hero of heroes) {
                console.log(`PLEASE HELP US, ${hero.toUpperCase()}`);
            }
        }

        inner()
    }

    cryForHelp();
}