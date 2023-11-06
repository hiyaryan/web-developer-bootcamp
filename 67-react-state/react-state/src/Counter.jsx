import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    const addOne = () => {
        setCount(count + 1);
    }

    // does not update count by 3
    // const addThree = () => {
    //     setCount(count + 1);
    //     setCount(count + 1);
    //     setCount(count + 1);
    // }

    // updates count by 3
    const addThree = () => {
        setCount(currentCount => currentCount + 1);
        setCount(currentCount => currentCount + 1);
        setCount(currentCount => currentCount + 1);
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={addOne}>+1</button>
            <button onClick={addThree}>+3</button>
        </div>
    )
}