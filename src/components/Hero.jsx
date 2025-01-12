// src/components/Hero.jsx
import React from 'react'
// import Avatar3DTracking from './Avatar3DTracking'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-name">Samir Rajesh</h1>
        <p className="hero-intro">
            Some text talking about what I am doing currently.
            What my interests are. And what I aspire to be working on.
        </p>
      </div>

      {/* Uncomment when ready to integrate 3D Avatar */}
      {/* <div className="hero-right">
        <Avatar3DTracking />
      </div> */}
    </section>
  )
}
