import './App.css'
import PostsList from './components/PostsList'

function App() {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Latest Posts</h1>
      <PostsList />
    </div>
  )
}

export default App
