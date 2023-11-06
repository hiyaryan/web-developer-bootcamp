import './App.css'
import BoxGrid from './BoxGrid';
import Lucky7 from './Lucky7'
import LuckyN from './LuckyN'
import { sum } from "./utils"

function lessThan4(dice) {
  return sum(dice) < 4;
}

function allSame(dice) {
  return dice.every(v => v === dice[0]);
}

function App() {
  return (
    <>
      <BoxGrid />
      <Lucky7 />
      <LuckyN title={"Less Than 4"} numDice={2} winCheck={lessThan4} />
      <LuckyN title={"Same Number"} numDice={3} winCheck={allSame} />
    </>
  )
}

export default App
