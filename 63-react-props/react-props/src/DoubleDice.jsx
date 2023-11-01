// using conditionals with duplication
// export default function DoubleDice() {
//     const die1 = Math.floor(Math.random() * 6) + 1;
//     const die2 = Math.floor(Math.random() * 6) + 1;

//     if (die1 === die2) {
//         return (
//             <>
//                 <h1>YOU WIN!</h1>
//                 <p>Num 1: {die1}</p>
//                 <p>Num 2: {die2}</p>
//             </>
//         )
//     } else {
//         return (
//             <>
//                 <h1>YOU LOSE!</h1>                    
//                 <p>Num 1: {die1}</p>
//                 <p>Num 2: {die2}</p>
//             </>
//         )
//     }
// }

// using conditionals without duplication v1
// export default function DoubleDice() {
//     const die1 = Math.floor(Math.random() * 6) + 1;
//     const die2 = Math.floor(Math.random() * 6) + 1;

//     const result = die1 === die2 ? "YOU WIN!" : "YOU LOSE!";
//     return (
//         <>
//             <h1>{result}</h1>
//             <p>Num 1: {die1}</p>
//             <p>Num 2: {die2}</p>
//         </>
//     )
// }

// using conditionals without duplication and `null` on lose v2
// export default function DoubleDice() {
//     const die1 = Math.floor(Math.random() * 6) + 1;
//     const die2 = Math.floor(Math.random() * 6) + 1;

//     return (
//         <>
//             <h1>{die1 === die2 ? "YOU WIN!" : null</h1>
//             <p>Num 1: {die1}</p>
//             <p>Num 2: {die2}</p>
//         </>
//     )
// }

// using conditionals without duplication and `null` on lose v2.1
export default function DoubleDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    // const styles = { color: "purple", fontSize: "40px" };
    const styles = { color: die1 === die2 ? "green" : "red" };

    return (
        <div className="DoubleDice" style={styles}>
            {die1 === die2 && <h1>You win!!</h1>}
            <p>Num 1: {die1}</p>
            <p>Num 2: {die2}</p>
        </div>
    )
}

// using conditionals before the return v3
// export default function DoubleDice() {
//     const die1 = Math.floor(Math.random() * 6) + 1;
//     const die2 = Math.floor(Math.random() * 6) + 1;

//     const result = die1 === die2 ? <h1>YOU WIN!</h1> : <h1>YOU LOSE!</h1>;

//     return (
//         <>
//             {result}
//             <p>Num 1: {die1}</p>
//             <p>Num 2: {die2}</p>
//         </>
//     )
// }