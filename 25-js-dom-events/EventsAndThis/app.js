const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

const buttons = document.querySelectorAll("button");

// adds to each button a click event
for (let button of buttons) {
    // this refers to the individual button objects
    // this requires that the function is written using the regular syntax
    button.addEventListener("click", colorize);
}

const h1s = document.querySelectorAll("h1");

// adds to each h1 a click event
for (let h1 of h1s) {
    // this refers to the individual h1 objects
    // this requires that the function is written using the regular syntax
    h1.addEventListener("click", colorize)
}

function colorize() {
    console.dir(this);
    this.style.backgroundColor = makeRandColor();
    this.style.color = makeRandColor();
}