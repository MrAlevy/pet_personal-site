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

{
  /*       <spotLight
        // ref={light2ref}
        intensity={0.3}
        position={[5.5, 0.9, 3.11]}
        color='#fffcf8'
      /> */
}
{
  /*       <spotLight
        // ref={light3ref}
        intensity={0.3}
        position={[-7.5, 1.9, 3.11]}
        color='#fffcf8'
      />

      <pointLight
        // ref={light1ref}
        position={[0, 2.5, -5]}
        intensity={1}
        color='#cec9c5'
      />
      <pointLight
        // ref={light1ref}
        position={[0, 1.5, 2]}
        intensity={0.5}
        color='#fffcf8'
      />

      <pointLight position={[0, 3.5, 9]} intensity={0.1} color='white' />
      <pointLight position={[-2.5, 3.5, 9]} intensity={0.1} color='white' />
      <pointLight position={[2.5, 3.5, 9]} intensity={0.1} color='white' />

      <pointLight position={[0, 3.5, 6]} intensity={0.1} color='white' />
      <pointLight position={[-2.5, 3.5, 6]} intensity={0.1} color='white' />
      <pointLight position={[2.5, 3.5, 6]} intensity={0.1} color='white' />

      <pointLight position={[0, 3.5, 3]} intensity={0.1} color='white' />
      <pointLight position={[-2.5, 3.5, 3]} intensity={0.1} color='white' />
      <pointLight position={[2.5, 3.5, 3]} intensity={0.1} color='white' />
 */
}
