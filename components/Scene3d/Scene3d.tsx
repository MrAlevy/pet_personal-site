import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense, useEffect, useState } from 'react'
import useContext from '../Context/useContext'
import { MAX_WIDTH, OPEN_Y_DECREASE } from './config'
import FlyingWords from './FlyingWords'
import { GizmoHelper } from './Helpers'
import Lights from './Lights'
import Spinner from './Spinner'

const Laptop = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./Laptop'),
    new Promise(resolve => setTimeout(resolve, 3000)),
  ])
  return moduleExports
})

export default function Scene3d() {
  const context = useContext()
  const [cameraScaleFactor, setCameraScaleFactor] = useState(1)
  const [isSmallSpinner, setIsSmallSpinner] = useState(false)
  const { isLaptopOpened, isBlinking } = context.context

  const resize = () => {
    if (window.innerWidth < MAX_WIDTH) {
      setCameraScaleFactor(1600 / window.innerWidth)
    } else if (cameraScaleFactor !== 1) {
      setCameraScaleFactor(1)
    }
    if (window.innerWidth < 400) {
      setIsSmallSpinner(true)
    } else {
      setIsSmallSpinner(false)
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
        position={[0.5, 0.5, -4 * cameraScaleFactor]}
      />
      <Suspense fallback={<Spinner small={isSmallSpinner} />}>
        <Laptop
          context={context}
          cameraScaleFactor={
            cameraScaleFactor === 1
              ? cameraScaleFactor
              : cameraScaleFactor * 1.1
          }
        />
        {isLaptopOpened && <FlyingWords />}
        <Lights isLaptopOpened={isLaptopOpened} isBlinking={isBlinking} />
        <ContactShadows
          width={7}
          height={5}
          position={[0, isLaptopOpened ? -0.5 - OPEN_Y_DECREASE : -0.5, 0]}
          rotation-x={Math.PI / 2}
          opacity={isBlinking ? 0.3 : 0.15}
          blur={isBlinking ? 0.1 : 0.2}
          far={isBlinking ? 7 : 4.5}
        />
      </Suspense>
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
        minDistance={1.5 * cameraScaleFactor}
        maxDistance={6.5 * cameraScaleFactor}
        enablePan={false}
      />
      <GizmoHelper />
    </Canvas>
  )
}
