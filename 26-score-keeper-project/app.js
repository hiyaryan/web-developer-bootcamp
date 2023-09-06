const p1Button = document.querySelector("#p1Button")
const p2Button = document.querySelector("#p2Button")

const p1Score = document.querySelector("#p1Score");
const p2Score = document.querySelector("#p2Score");

const playto = document.querySelector('select')

playto.addEventListener("change", function (e) {
    winningScore = parseInt(this.value);
})

const resetButton = document.querySelector("#reset")

let winningScore = 3;

p1Button.addEventListener("click", function () {
    p1Score.innerText = parseInt(p1Score.innerText) + 1

    if (p1Score.innerText == winningScore) {
        p1Score.classList.add("has-text-success");
        p2Score.classList.add("has-text-danger");
        toggleDisable();
    }
})

p2Button.addEventListener("click", function () {
    p2Score.innerText = parseInt(p2Score.innerText) + 1

    if (p2Score.innerText == winningScore) {
        p2Score.classList.add("has-text-success");
        p1Score.classList.add("has-text-danger");
        toggleDisable();
    }
})

resetButton.addEventListener("click", function () {
    for (let score of [p1Score, p2Score]) {
        score.innerText = 0;
        score.classList.remove("has-text-success", "has-text-danger");
    }

    for (let button of [p1Button, p2Button]) {
        button.disabled = false;
    }
});

function toggleDisable() {
    p1Button.disabled = !p1Button.disabled;
    p2Button.disabled = !p2Button.disabled;
}