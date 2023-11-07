import { useEffect } from "react";
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    const increment = () => {
        setCount(currentCount => currentCount + 1);
    };

    const handleChange = (evt) => {
        setName(evt.target.value);
    }

    // only run effect on `count` change
    useEffect(() => {
        console.log(`Count is: ${ count }`);
    }, [count])

    // only runs once
    useEffect(() => {
        console.log(`Form was mounted`);
    }, [])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
            <p>Name: {name}</p>
            <input value={name} onChange={handleChange} type="text" />
        </div>
    )
}