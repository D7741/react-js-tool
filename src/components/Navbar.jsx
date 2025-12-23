import React from 'react'
import logo from '../assets/react.svg'
import home from '../pages/home.jsx'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        {/* Logos */}
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="logo" className='w-10 h-10'/>
            <h1 className='text-white font-bold text-lg'>ToDo List</h1>
        </div>
        {/* Links to */}
        <nav>
          <ul className='flex space-x-30 align-center'>
            <li className='hover:text-blue-300'><Link to="/home">Home</Link></li>
            <li className='hover:text-blue-300'><Link to="/billtrack">BillTrack</Link></li>
            <li className='hover:text-blue-300'><Link to="/remcard">RemCard</Link></li>
          </ul>
        </nav>

        {/* Language Selector */}
        <div className='flex space-x-8 items-center'>
          <h4 className='hover:text-blue-300 cursor-pointer'>Sign in</h4>
          <h4 className='hover:text-blue-300 cursor-pointer'>Log in</h4>
        </div>

    </header>
  )
}

export default Navbar
