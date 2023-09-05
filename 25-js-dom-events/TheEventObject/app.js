document.querySelector("button").addEventListener("click", function (e) {
    console.log(e); // PointerEvent
});

// keyoard events
const input = document.querySelector("input");
input.addEventListener("keydown", function (e) {
    console.log(e); // KeyboardEvent
})

input.addEventListener("keyup", function (e) {
    console.log(e.key);
    console.log(e.code);
})

// adding events to the window
window.addEventListener('keydown', function (e) {
    console.log(e.code);

    switch (e.code) {
        case 'ArrowUp':
            console.log("UP!");
            break;
        case 'ArrowDown':
            console.log("DOWN!");
            break;
        case 'ArrowLeft':
            console.log("LEFT!");
            break;
        case 'ArrowRight':
            console.log("RIGHT!");
            break;
        default:
            console.log("Nothing");
    }
})

