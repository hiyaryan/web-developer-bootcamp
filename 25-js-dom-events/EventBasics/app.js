const btn = document.querySelector("#v2");
console.dir(btn);

btn.onclick = function () {
    console.log("YOU CLICKED ME");
    console.log("I HOPE IT WORKED");
}

function scream() {
    console.log("AAAHHHHHH");
    console.log("STOP TOUCHING ME");
}

btn.onmouseenter = scream;

// see document object in console, onclick is set to function
const button1 = document.querySelector("button")
console.dir(button1)

// value of onclick must reference a variable that is them executed onclick
document.querySelector("h1").onclick = function () {
    alert("you clicked the h1");
}

// adding events using addEventListener
const button3 = document.querySelector("#v3");
console.dir(button3);

button3.addEventListener("click", () => {
    alert("CLICKED!");
})

function twist() {
    console.log("TWIST!");
}

function shout() {
    console.log("SHOUT!");
}

const tasButton = document.querySelector("#tas");
// tasButton.onclick = twist;
// tasButton.onclick = shout; // only allows one function to be assigned

// addEventListener allows for multiple functions to be added similarly to classList
tasButton.addEventListener("click", twist, { once: true })
tasButton.addEventListener("click", shout)