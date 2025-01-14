// src/components/Hero.jsx
import React from 'react'
import Avatar3DTracking from './Avatar3DTracking'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-name">
          Hi, I am <span class="highlight">Samir</span>! etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc
        </h1>
      </div>

      <div className="hero-right">
        <Avatar3DTracking />
      </div>
    </section>
  )
}
