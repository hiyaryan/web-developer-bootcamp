// retrieving name from props
// export default function Greeter(props) {
//     return <h1>Hi, {props.name}!</h1>
// }

// destructuring name
// export default function Greeter({name}) {
//     return <h1>Hi, {name}!</h1>
// }

// multiple props
export default function Greeter({name, from}) {
    return (
    <>
        <h1>Hi, {name}!</h1>
        <h2>- {from}</h2>
    </>)
}