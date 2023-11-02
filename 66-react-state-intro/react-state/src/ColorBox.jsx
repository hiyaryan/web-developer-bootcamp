import { useState } from 'react'
import './ColorBox.css'

const getRandomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
}

export default function ColorBox({ colors }) {
    const [color, setColor] = useState(getRandomColor(colors))

    const style = {
        backgroundColor: color,
    }

    const changeColor = () => {
        setColor(getRandomColor(colors));
    }

    return (
        <div className='ColorBox' style={style} onClick={changeColor} />
    )
}