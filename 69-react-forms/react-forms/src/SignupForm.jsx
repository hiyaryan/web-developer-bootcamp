import { useState } from "react";

export default function SignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const updateFirstName = (evt) => {
        setFirstName(evt.target.value);
    }

    const updateLastName = (evt) => {
        setLastName(evt.target.value);
    }

    const handleSubmit = () => {
        console.log(`Hi, ${ firstName } ${ lastName }!`);
    }

    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input onChange={updateFirstName} type="text" placeholder="first name" value={firstName} id="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input onChange={updateLastName} type="text" placeholder="last name" value={lastName} id="lastName" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}