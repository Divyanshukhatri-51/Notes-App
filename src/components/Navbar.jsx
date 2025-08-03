import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="mb-4 flex flex-row xl:gap-4 sm:gap-2 place-content-evenly">
      <NavLink
      to="/"
      >
        Home
      </NavLink>
      <NavLink
      to="/pastes"
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
