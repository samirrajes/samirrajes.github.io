// src/components/Avatar3DTracking.jsx
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ mousePosition }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/okmodel1.glb') // put your .glb in public/models

  // Each frame, rotate the model a bit towards mousePosition
  useFrame(() => {
    if (!groupRef.current) return
    const rotationSpeed = 0.02
    // Determine how to rotate model based on mouse
    // Example: move the model's Y rotation a fraction of the mouse's X position
    const targetYRot = (mousePosition.x - 0.5) * Math.PI // center at .5
    const currentYRot = groupRef.current.rotation.y
    groupRef.current.rotation.y += (targetYRot - currentYRot) * rotationSpeed
  })

  return <primitive ref={groupRef} object={scene} scale={[1.5, 1.5, 1.5]} />
}

export default function Avatar3DTracking() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Listen to global mouse moves, store normalized coords
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="avatar-canvas-container">
      <Canvas>
        {/* Optionally an OrbitControls if you want manual camera control */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[10, 10, 10]} />
        <Model mousePosition={mousePos} />
      </Canvas>
    </div>
  )
}
