import ColorBox from './ColorBox'
import './ColorBoxes.css'

export default function ColorBoxes({ colors }) {
    return (
        <div className='ColorBoxes'>
            {Array(25).fill(<ColorBox colors={colors} />)}
        </div>
    )
}