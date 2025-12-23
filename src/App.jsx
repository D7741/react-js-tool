import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './pages/home.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import BillTrack from './pages/BillTrack.jsx'
import RemCard from './pages/RemCard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <NavBar />
    <main>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/billtrack" element={<BillTrack />} />
        <Route path="/remcard" element={<RemCard />} /> 
        <Route path="/" element={<Landing />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  )
}

export default App
