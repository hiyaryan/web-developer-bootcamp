const handleClick = (message) => {
    window.alert(message);
}

// Clicker Exercise
export default function Clicker({ message, buttonText }) {
    return (
        <div>
            <button onClick={handleClick.bind(this, message)}>{buttonText}</button>
        </div>
    )
}

// Covered Topics

// const handleClick = () => {
//     window.alert("Clicked the button!");
// }

// const handleHover = () => {
//     const p = document.querySelector("p");
//     p.innerText = "Ouch!"
// }

// export default function Clicker() {
//     return (
//         <div>
//             <p onMouseOver={handleHover}>Click the Button</p>
//             <button onClick={handleClick}>Click</button>
//         </div>
//     )
// }