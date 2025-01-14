// src/components/Navbar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* insert name or text/logo here instead */}
        <NavLink to="/" className="brand">
          Samir Rajesh
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/explorations">Explorations</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  )
}
