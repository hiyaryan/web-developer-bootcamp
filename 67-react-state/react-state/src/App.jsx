import './App.css'
import Counter from './Counter'
import Dumbo from './Dumbo'
import EmojiClicker from './EmojiClicker'
import ScoreKeeper from './ScoreKeeper'
import ScoreKeeper2 from './ScoreKeeper2'

function App() {
  return (
    <>
      <h1>State Demo</h1>
      <Counter />
      <h2>Complex Initializer</h2>
      <Dumbo />
      <h2>Objects in State</h2>
      <ScoreKeeper />
      <h2>Emoji Clicker</h2>
      <EmojiClicker />
      <h2>Score Keeper Exercise</h2>
      <ScoreKeeper2 numPlayers={5} targetScore={5} />
    </>
  )
}

export default App
