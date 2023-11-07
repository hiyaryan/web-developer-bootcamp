import { useState } from "react";

export default function UsernameForm() {
    const [username, setUsername] = useState("");

    const updateUsername = (evt) => {
        setUsername(evt.target.value);
    }

    return (
        <div>
            <label htmlFor="username">Username</label>
            <input onChange={updateUsername} type="text" placeholder="username" value={username} id="username" />
            <button>Submit</button>
        </div>
    )
}