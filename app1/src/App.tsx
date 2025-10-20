import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <nav
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '1rem',
        }}
      >
        <NavLink to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
        <NavLink to="/posts" style={{ textDecoration: 'none' }}>Posts</NavLink>
        <NavLink to="/about" style={{ textDecoration: 'none' }}>About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
