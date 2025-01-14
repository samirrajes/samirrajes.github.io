// src/components/Avatar3DTracking.jsx
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Vector2 } from 'three'

/**
 * The 3D model itself (scale/position can be tweaked as you like).
 */
function AvatarModel() {
  const { scene } = useGLTF('/models/okmodel-wireframe.glb') // Adjust path as needed
  return (
    <primitive
      object={scene}
      scale={[1.5, 1.5, 1.5]}
      position={[0, 0, -1]} // tweak as desired
    />
  )
}

// wireframe is good at pos 0,0,0 scale 1,1,1
// solid is good at pos 0,-2,0 scale 0.8,0.8,0.8

/**
 * This component handles left/right + up/down rotation 
 * based on mouse X/Y, with small ranges and lerp for smoothness.
 */
function AvatarSubtleTrack() {
  const avatarRef = useRef(null)
  const mouseRef = useRef(new Vector2(0, 0))

  // Limits how far the avatar can turn (yaw) and tilt (pitch), in radians
  const MAX_YAW = 0.5   // about ±17 degrees left/right
  const MAX_PITCH = 0.5 // about ±11 degrees up/down

  // For smooth lerping
  const LERP_SPEED = 0.5

  // Track mouse in normalized device coords [-1..+1, -1..+1]
  // We'll use both X & Y for rotation.
  useEffect(() => {
    function handleMouseMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1     // -1..+1
      const y = ((e.clientY / window.innerHeight) * 2 - 1) // -1..+1, invert so top is +y
      mouseRef.current.set(x, y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Each frame, rotate the avatar a bit towards the target angles
  useFrame(() => {
    if (!avatarRef.current) return

    // Current rotation
    const currentX = avatarRef.current.rotation.x
    const currentY = avatarRef.current.rotation.y

    // Target angles based on mouseRef:
    // Yaw (left/right) is mapped from mouse X,
    // Pitch (up/down) is mapped from mouse Y (negative sign might need adjusting for your model).
    const targetY = clamp(mouseRef.current.x * MAX_YAW, -MAX_YAW, MAX_YAW)
    const targetX = clamp(mouseRef.current.y * MAX_PITCH, -MAX_PITCH, MAX_PITCH)

    // Lerp toward target
    avatarRef.current.rotation.x += (targetX - currentX) * LERP_SPEED
    avatarRef.current.rotation.y += (targetY - currentY) * LERP_SPEED
  })

  return (
    <group ref={avatarRef}>
      <AvatarModel />
    </group>
  )
}

// Utility to clamp a value between min and max
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/**
 * The main component: a red-bordered Canvas with the subtle-tracking avatar.
 */
export default function Avatar3DTracking() {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        // border: '2px solid red', // Visual border for debugging
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <AvatarSubtleTrack />
        </Suspense>
      </Canvas>
    </div>
  )
}
