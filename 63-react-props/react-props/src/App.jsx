import { useState } from 'react'
import './App.css'
import Greeter from './Greeter'
import Die from './Die'
import ListPicker from './ListPicker'
import DoubleDice from './DoubleDice'
import Heading from './Heading'
import ColorList from './ColorList'
import Slots from './Slots'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Heading text="This is your cool website!" fontSize="30px" />
      <Heading text="This is your cool website!" color="purple" fontSize="40px" />
      <Greeter name="Bill" from="Random" />
      {/* 20-sided Die */}
      <Die numSides={20} />
      {/* 6-sided Die falling on default value in prop */}
      <Die />
      {/* passing an array of numbs */}
      <ListPicker nums={[1, 2, 3, 4]} />
      {/* passing an array of chars */}
      {/* <ListPicker nums={['a', 'b', 'c', 'd']} /> */}
      {/* passing an object */}
      {/* <ListPicker obj={{ a: 1, b: 2, c: 3, d: 4 }} /> */}
      {/* game of double dice */}
      <DoubleDice />
      <ColorList colors={["red", "pink", "purple", "teal"]} />
      <ColorList colors={["olive", "orangered", "slategray"]} />

      {/* SLOT MACHINE EXERCISE */}
      <Slots val1={1} val2={2} val3={3} />
      <Slots val1={2} val2={2} val3={2} />
    </>
  )
}

export default App
