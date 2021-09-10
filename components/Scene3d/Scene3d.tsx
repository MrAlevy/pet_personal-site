//@ts-nocheck
import { useState, useRef } from 'react'
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Laptop } from './Laptop'
import Textq from './FlyingText'
import useContext from '../Context/useContext'

export default function Scene3d() {
  const context = useContext()
  // dispatch({type: action('TOGGLE_LAPTOP_OPENED')})

  return (
    <Canvas
      dpr={[1, 2]}
      // camera={{ position: [0, 0, -10], fov: 35 }}
      // orthographic
      style={{ position: 'absolute' }}
    >
      <PerspectiveCamera
        makeDefault // Registers it as the default camera system-wide (default=false)
        position={[0, 0, -10]}
      >
        <mesh />
      </PerspectiveCamera>
      {/* <pointLight position={[-5, 3, -2]} intensity={3.5} color='blue' /> */}
      <Suspense fallback={null}>
        <Laptop context={context} />
        {/* <Textq /> */}
      </Suspense>
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -0.5, 0]}
        opacity={0.2}
        width={7}
        height={5}
        blur={0.2}
        far={4.5}
      />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.3} />
      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#f7867e', '#7ef782', '#827ef7']}
          labelColor='black'
        />
      </GizmoHelper>
    </Canvas>
  )
}
