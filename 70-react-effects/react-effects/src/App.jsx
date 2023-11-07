import './App.css'
import Counter from './Counter'
import ProfileViewerWithSearch from './ProfileViewerWithSearch'
import QuoteFetcher from './QuoteFetcher'
import QuoteFetcherLoader from './QuoteFetcherLoader'

function App() {
  return (
    <>
      <h1>useEffect</h1>
      <h2>Basics</h2>
      <Counter />
      <h2>fetch and AJAX</h2>
      <QuoteFetcher />
      <h2>Adding a Loader</h2>
      <QuoteFetcherLoader />
      <h2>GitHub Profile Viewer</h2>
      <ProfileViewerWithSearch />
    </>
  )
}

export default App
