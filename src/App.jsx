import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import Home from './pages/home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
