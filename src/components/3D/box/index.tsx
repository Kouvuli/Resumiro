import React from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Male1 from '../../../../public/3D/Male_1'
import Male2 from '../../../../public/3D/Male_2'
import Male3 from '../../../../public/3D/Male_3'
import Male4 from '../../../../public/3D/Male_4'
import Male5 from '../../../../public/3D/Male_5'
const Box3D = () => {
  return (
    <>
      <OrbitControls
        target={[0, 0.8, 0]}
        // maxPolarAngle={1.45}
        autoRotate
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <PerspectiveCamera makeDefault position={[1.5, 2.7, -4.1]} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <ambientLight intensity={0.3} />

      <Male1 />
      <Male2 />
      <Male3 />
      <Male4 />
      <Male5 />
    </>
  )
}

export default Box3D
