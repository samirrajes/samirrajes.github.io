// components/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}