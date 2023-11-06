import "./Button.css"

export default function Button({ label = "Click Me!", onClick }) {
    return (
        <button onClick={onClick} className="Button">
            {label}
        </button>
    )
}