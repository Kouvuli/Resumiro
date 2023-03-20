import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
interface Canvas3DProps {
  children: React.ReactNode
}
const Canvas3D: React.FC<Canvas3DProps> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>{children}</Canvas>
    </Suspense>
  )
}

export default Canvas3D
