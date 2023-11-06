import { useState } from "react";
import { v4 as uuid } from "uuid";



export default function ScoreKeeper2({ numPlayers = 2, targetScore = 3 }) {
    const [scores, setScores] = useState(Array(numPlayers).fill(0));
    const [winner, setWinner] = useState(null);

    const addOne = (playerIndex) => {
        const nextScores = scores.map((score, index) => {
            if (playerIndex === index) return score + 1;
            return score;
        });

        setScores(nextScores);

        if (nextScores[playerIndex] === targetScore) {
            setWinner(playerIndex);
            document.querySelectorAll("button.addOne").forEach(button => {
                button.disabled = true;
            });
        }
    }

    const reset = () => {
        setScores(Array(numPlayers).fill(0));

        document.querySelectorAll("button.addOne").forEach(button => {
            button.disabled = false;
        });

        document.querySelector("h3.winner").innerHTML = "";
    }

    return (
        <div>
            <ul>
                {scores.map((score, index) => (
                    <li key={index} style={{ listStyle: "none" }}>
                        {winner === index && <h3 className="winner" style={{ color: "green" }}>Player{index + 1} is the winner!</h3>}
                        <h4>Player{index + 1}: {score}
                            <button className="addOne" onClick={() => addOne(index)}>+1</button>
                        </h4>
                    </li>
                ))}
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    )
} 