export default function ColorList({ colors }) {
    // const elements = [<p>Hello!</p>, <h1>Bye!</h1>, <input type="password" />]

    // const list = colors.map(color => <li>{color}</li>)

    return (
        <div>
            <h2>Color List</h2>
            <p>{colors.map(color => <li style={{ color }}>{color}</li>)}</p>
            {/* <p>{elements}</p> */}
        </div>
    )
}