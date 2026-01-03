import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="container mx-auto px-4 flex justify-between items-center text-white bg-gray-900 py-4">
        <h1>WasimTasks</h1>
        <ul className="flex space-x-4  text-white">
            <li>Home</li>
            <li>About</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
