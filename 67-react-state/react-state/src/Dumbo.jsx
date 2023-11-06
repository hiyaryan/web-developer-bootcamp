import { useState } from "react";

function generateGameBoard() {
    console.log("Making initial game board...");
    return Array(5000);
}

export default function Dumbo() {
    const [board, setBoard] = useState(generateGameBoard);

    return (
        <>
            <button onClick={() => setBoard("hello!")}>Click me!</button>
        </>
    )
}