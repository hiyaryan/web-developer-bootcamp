const button = document.querySelector("#changeColor");
const container = document.querySelector("#container");

// the container contains the button, and when anywhere in the container is pressed, including the button, the container hides
button.addEventListener("click", function (e) {
    container.style.backgroundColor = makeRandColor();
    e.stopPropagation(); // prevents the button from hiding
})

container.addEventListener("click", function () {
    container.classList.toggle("hide"); // hides container including the button
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}