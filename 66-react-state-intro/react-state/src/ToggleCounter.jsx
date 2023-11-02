import { useState } from "react"

export default function ToggleCounter() {
    const [isHappy, setIsHappy] = useState(true);
    const [count, setNum] = useState(0);

    return (
        <>
            <h3>{isHappy ? "😌" : "😔"} {count % 2 === 0 ? "Even!" : "Odd..."}</h3>
            <button onClick={() => { setIsHappy(!isHappy); setNum(count + 1) }}>Make Even</button>
        </>
    )
}