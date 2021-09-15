import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

export default function Lights({ isBlinking }: { isBlinking: boolean }) {
  const light1ref = useRef()
  // useHelper(light1ref, THREE.PointLightHelper, 0.1, 'orange')

  return (
    <spotLight
      ref={light1ref}
      intensity={isBlinking ? 2 : 0.3}
      position={[0, 2, 1]}
      color='#fffcf8'
    />
  )
}
