// src/components/Avatar3DTracking.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function AvatarModel() {
  // Load the .glb model
  const { scene } = useGLTF('/models/okmodel-red.glb') // Adjust path as needed
  return <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -0.2, 0]}  />
}

export default function Avatar3DTracking() {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        border: '2px solid red',  // ← add a red border
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <AvatarModel />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
