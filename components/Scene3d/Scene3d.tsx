//@ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react'
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
import Lights from './Lights'
import * as THREE from 'three'

const MAX_WIDTH = 1600

export default function Scene3d() {
  const context = useContext()
  const [cameraZFactor, setCameraZFactor] = useState(1)

  const isBlinking = context.context.isBlinking
  const calcZFactor = () => 1600 / window.innerWidth

  const resize = () => {
    if (window.innerWidth < MAX_WIDTH) {
      setCameraZFactor(calcZFactor())
    } else if (cameraZFactor !== 1) {
      setCameraZFactor(1)
    }
  }

  useEffect(() => {
    if (window.innerWidth < MAX_WIDTH) {
      setCameraZFactor(calcZFactor())
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Canvas dpr={[1, 2]} style={{ position: 'absolute' }}>
      <PerspectiveCamera makeDefault position={[0.5, 0.5, -4 * cameraZFactor]}>
        <mesh />
      </PerspectiveCamera>
      {/* <pointLight position={[-5, 3, -2]} intensity={3.5} color='blue' /> */}
      <Suspense fallback={null}>
        <Laptop context={context} />
        <Lights isBlinking={isBlinking} />
        {/* <Textq /> */}
      </Suspense>
      <ContactShadows
        width={7}
        height={5}
        position={[0, -0.5, 0]}
        rotation-x={Math.PI / 2}
        opacity={isBlinking ? 0.3 : 0.15}
        blur={isBlinking ? 0.1 : 0.2}
        far={isBlinking ? 7 : 4.5}
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
