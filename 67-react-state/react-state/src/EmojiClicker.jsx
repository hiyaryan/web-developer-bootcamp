import { v4 as uuid } from "uuid"
import { useState } from "react"

const randomEmoji = () => {
    const choices = ["😘", "😛", "😳", "🤢", "😇", "😡", "😎"];
    return choices[Math.floor(Math.random() * choices.length)];
}

export default function EmojiClicker() {
    const [emojis, setEmojis] = useState([{ id: uuid(), emoji: randomEmoji() }]);

    const addEmoji = () => {
        setEmojis((currentEmojis) => [...currentEmojis, { id: uuid(), emoji: randomEmoji() }]);
    }

    const deleteEmoji = (id) => {
        setEmojis((currentEmojis) => currentEmojis.filter(e => e.id !== id));
    }

    const heartify = () => {
        setEmojis((currentEmojis) => currentEmojis.map((emojis) => {
            return {
                ...emojis,
                emoji: "❤️",
            }
        }))
    }

    return (
        <div>
            <div>
                {emojis.map((e) => (
                    <span
                        key={e.id}
                        onClick={() => deleteEmoji(e.id)}
                        style={{ fontSize: "4rem", cursor: "pointer" }}>
                        {e.emoji}
                    </span>
                ))}
            </div>
            <div>
                <button onClick={addEmoji}>Add Emoji</button>
                <button onClick={heartify}>Heartify</button>
            </div>
        </div>
    )
}