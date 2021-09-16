import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  Html,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import useContext from '../Context/useContext'
import { GizmoHelper } from './Helpers'
import Lights from './Lights'
import FlyingWords from './FlyingWords'
import Spinner from './Spinner'
import { lazy } from 'react'

const Laptop = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./Laptop'),
    new Promise(resolve => setTimeout(resolve, 3000)),
  ])
  return moduleExports
})

const MAX_WIDTH = 1600
const showHelpers = process.env.NEXT_PUBLIC_SHOW_HELPERS === 'true'

export default function Scene3d() {
  const { context, dispatch } = useContext()
  const [cameraZFactor, setCameraZFactor] = useState(1)

  const { isLaptopOpened, isBlinking } = context

  const calcZFactor = () => 1600 / window.innerWidth

  const resize = () => {
    if (window.innerWidth < MAX_WIDTH) {
      setCameraZFactor(calcZFactor())
    } else if (cameraZFactor !== 1) {
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
      <Suspense fallback={<Spinner />}>
        <Laptop context={{ context, dispatch }} />
        {/* {isLaptopOpened && <FlyingWords />} */}
        <Lights isBlinking={isBlinking} />
        <ContactShadows
          width={7}
          height={5}
          position={[0, -0.5, 0]}
          rotation-x={Math.PI / 2}
          opacity={isBlinking ? 0.3 : 0.15}
          blur={isBlinking ? 0.1 : 0.2}
          far={isBlinking ? 7 : 4.5}
        />
      </Suspense>
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
        minDistance={3.5 * cameraZFactor}
        maxDistance={6.5 * cameraZFactor}
      />
      {showHelpers && <GizmoHelper />}
    </Canvas>
  )
}
