import Box from "./Box";
import { useState } from "react";

export default function BoxGrid({ numBoxes = 9 }) {
    const [boxes, setBoxes] = useState(Array(numBoxes).fill(false));

    const reset = () => setBoxes(Array(numBoxes).fill(false));

    const toggleBox = (idx) => {
        setBoxes((currentBoxes) => {
            return currentBoxes.map((value, i) => {
                if (i === idx) {
                    return !value
                } else {
                    return value
                }
            });
        })
    }

    return (
        <div className="BoxGrid">
            <h1>Passing State</h1>
            {boxes.map((box, idx) => (
                <Box key={idx} isActive={box} toggle={() => toggleBox(idx)} />
            ))}
            <button onClick={reset}>Reset</button>
        </div>
    )
}