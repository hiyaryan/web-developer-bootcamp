const handleFormSubmit = (e) => {
    e.preventDefault();
    window.alert("Sending the data!");
}

export default function Form() {
    return (
        <form onSubmit={handleFormSubmit}>
            <p>Submit me!</p>
            <button>Submit</button>
        </form>
    )
}