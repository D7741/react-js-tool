import React from 'react'
import logo from '../assets/react.svg'

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
          <ul className='flex space-x-4 align-center'>
            <li className='hover:text-blue-300'><a href="#home">Home</a></li>
            <li className='hover:text-blue-300'><a href="#history">History</a></li>
            <li className='hover:text-blue-300'><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Search Bar */}
        <input type="text" placeholder="Search..." className='p-2 rounded-md bg-gray-700 text-white' />

        {/* Language Selector */}
        <select className='p-2 rounded-md bg-gray-700 text-white'>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ch">Chinese</option>
        </select>

    </header>
  )
}

export default Navbar
