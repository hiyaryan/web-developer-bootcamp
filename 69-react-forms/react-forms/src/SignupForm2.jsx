import { useState } from "react";

export default function SignupForm2() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", password: "" });

    // const updateFormData = (evt) => {
    //     setFormData(currentData => {
    //         currentData[evt.target.name] = evt.target.value;
    //         return { ...currentData }
    //     });
    // }

    // more concise way to update the state
    const updateFormData = (evt) => {
        setFormData(currentData => {
            return {
                ...currentData,
                [evt.target.name]: evt.target.value
            }
        });
    }

    const handleSubmit = () => {
        console.log(`Hi, ${ formData.firstName } ${ formData.lastName }! Your password is ${ formData.password }.`);
    }

    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input onChange={updateFormData} type="text" placeholder="first name" value={formData.firstName} id="firstName" name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input onChange={updateFormData} type="text" placeholder="last name" value={formData.lastName} id="lastName" name="lastName" />

            <label htmlFor="password">Password</label>
            <input onChange={updateFormData} type="password" placeholder="password" value={formData.password} id="password" name="password" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}