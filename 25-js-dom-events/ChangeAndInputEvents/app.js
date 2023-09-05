const input = document.querySelector("input");
const h1 = document.querySelector("h1");

input.addEventListener("change", function (e) {
    console.log("CHANGE");
});

input.addEventListener("input", function (e) {
    console.log("INPUT");
    console.log(e);

    h1.innerText = input.value;
});

