import { useState } from "react";

// Issue: Counter is not called again
// export default function Counter() {
//     let num = 0;
//     const incrementNum = () => (num += 1);
//     return (
//         <div>
//             <p>The count is: {num}</p>
//             <button onClick={incrementNum}>Increment</button>
//         </div>
//     )
// }

// Issue: props are immutable
// export default function Counter({ num }) {
//     const incrementNum = () => (num += 1);
//     return (
//         <div>
//             <p>The count is: {num}</p>
//             <button onClick={incrementNum}>Increment</button>
//         </div>
//     )
// }

export default function Counter() {
    const [num, setNum] = useState(0);

    console.log(num);

    const count = () => {
        setNum(num + 1);
        console.log(num);
    }

    return (
        <div>
            <p>The count is: {num}</p>
            <button onClick={count}>Increment</button>
        </div>
    )
}