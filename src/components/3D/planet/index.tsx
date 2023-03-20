import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Planet from '../../../../public/3D/Planet'

const Planet3D = () => {
  return (
    <>
      <OrbitControls autoRotate enableZoom={false} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <ambientLight intensity={0.3} />

      <Planet />
    </>
  )
}

export default Planet3D
