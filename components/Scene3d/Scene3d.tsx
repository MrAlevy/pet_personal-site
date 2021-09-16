//@ts-nocheck
import {
  ContactShadows,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import useContext from '../Context/useContext'
import { Laptop } from './Laptop'
import Lights from './Lights'

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
      console.log('set 1')
      setCameraZFactor(1)
    }
  }

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Canvas dpr={[1, 2]} style={{ position: 'absolute' }}>
      <PerspectiveCamera
        makeDefault
        position={[0.5, 0.5, -4 * cameraZFactor]}
      />
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
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
        minDistance={3.5 * cameraZFactor}
        maxDistance={6.5 * cameraZFactor}
      />

      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#f7867e', '#7ef782', '#827ef7']}
          labelColor='black'
        />
      </GizmoHelper>
    </Canvas>
  )
}
