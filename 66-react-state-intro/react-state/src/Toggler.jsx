import { useState } from "react"

export default function Toggler() {
    const [isHappy, setIsHappy] = useState(true);

    return (
        <>
            <h3>{isHappy ? "😁" : "😖"}</h3>
            <button onClick={() => setIsHappy(!isHappy)}>Click me!</button>
        </>
    )
}