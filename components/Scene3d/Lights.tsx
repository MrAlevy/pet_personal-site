import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { SHOW_HELPERS } from './config'

export default function Lights({ isBlinking }: { isBlinking: boolean }) {
  const spotLightRef = useRef()
  const ambientLightRef = useRef()

  useHelper(
    spotLightRef,
    THREE.PointLightHelper,
    SHOW_HELPERS ? 0.1 : 0,
    '#ffffff'
  )
  useHelper(
    ambientLightRef,
    THREE.PointLightHelper,
    SHOW_HELPERS ? 0.1 : 0,
    '#ff3c77'
  )

  return (
    <>
      <spotLight
        ref={spotLightRef}
        color='#fff0f0'
        position={[0, 3, 0]}
        intensity={isBlinking ? 1.3 : 0.5}
      />
      <ambientLight
        ref={ambientLightRef}
        intensity={isBlinking ? 0.7 : 0.2}
        position={[0, 2, 0]}
        color='#ff89f5'
      />
    </>
  )
}
