export default function Heading({ color = "olive", text, fontSize }) {
    return <h1 style={{ color, fontSize }}>{text}</h1>;
}