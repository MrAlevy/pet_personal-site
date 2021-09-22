import { animated, config, useSpring } from '@react-spring/three'
import { Html } from '@react-three/drei'
import {
  EulerProps,
  GroupProps,
  useFrame,
  Vector3Props,
} from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Actions } from '../Context/Context'
import useContext from '../Context/useContext'
import LaptopScreen from '../LaptopScreen/LaptopScreen'
import { OPEN_Y_DECREASE } from './config'
import { useModel } from './useModel'

export default function Laptop({
  context: {
    context: { isLaptopOpened, isSkeletonMode },
    dispatch,
  },
  cameraScaleFactor,
}: {
  context: ReturnType<typeof useContext>
  cameraScaleFactor: number
}) {
  const { frame, screen } = useModel(isLaptopOpened, isSkeletonMode)
  const laptopRef = useRef<GroupProps>()
  const [isOpeningClosing, setIsOpeningClosing] = useState(false)
  const [wasOpened, setWasOpened] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cameraCoordsRatios, setCameraCoordsRatios] = useState<number[]>([])

  // Camera default positions for open-close states
  const cameraPositionVector = isLaptopOpened
    ? new THREE.Vector3().set(-0.118, 0.8, -2.5 * cameraScaleFactor)
    : new THREE.Vector3().set(0.5, 0.5, -4 * cameraScaleFactor)

  // For camera movement to the default positions
  useEffect(() => {
    setCameraCoordsRatios([])
    if (isLaptopOpened) setWasOpened(true)
  }, [isLaptopOpened])

  // Cursor hovered style
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Frame animation
  useFrame(state => {
    const t = state.clock.getElapsedTime()

    // Move camera to the new position on open-close the laptop
    if (isOpeningClosing) {
      const { x: camX, y: camY, z: camZ } = state.camera.position
      const coordsRatio = Math.round((camX / (camX + camY + camZ)) * 1000)
      const isRatiosAllEqual = cameraCoordsRatios.every(e => e === coordsRatio)
      if (cameraCoordsRatios.length === 5 && isRatiosAllEqual) {
        setIsOpeningClosing(false)
      } else {
        setCameraCoordsRatios(
          isRatiosAllEqual
            ? [...cameraCoordsRatios, coordsRatio]
            : [coordsRatio]
        )
      }
      state.camera.position.lerp(cameraPositionVector, 0.04)
    } else {
      if (isOpeningClosing) setIsOpeningClosing(false)
    }

    // Make laptop floating if opened; rest - if closed
    const laptopRotation = laptopRef.current?.rotation as EulerProps
    const laptopPosition = laptopRef.current?.position as Vector3Props

    const { x: rotX, y: rotY, z: rotZ } = laptopRotation
    const { y: posY } = laptopPosition

    laptopRotation.x = THREE.MathUtils.lerp(
      rotX || 0,
      !isLaptopOpened ? (!isOpeningClosing ? Math.cos(t / 2) / 10 : 0) : 0,
      0.1
    )
    laptopRotation.y = THREE.MathUtils.lerp(
      rotY || 0,
      !isLaptopOpened ? Math.PI + Math.sin(t / 4) / 20 : rotY || 0,
      0.1
    )
    laptopRotation.z = THREE.MathUtils.lerp(
      rotZ || 0,
      !isLaptopOpened ? (!isOpeningClosing ? Math.sin(t / 4) / 20 : 0) : 0,
      0.1
    )
    laptopPosition.y = THREE.MathUtils.lerp(
      posY || 0,
      !isLaptopOpened ? (1 + Math.sin(t)) / 5 : -0.43 - OPEN_Y_DECREASE,
      0.1
    )
  })

  // Open-close spring animation
  const springs = useSpring({
    'rotation-x':
      isLaptopOpened && !hovered
        ? -Math.PI / 10
        : isLaptopOpened && hovered
        ? -Math.PI / 15
        : hovered
        ? Math.PI / 2.1
        : Math.PI / 2,
    config: isLaptopOpened
      ? { ...config.gentle, tension: 90, friction: 12 }
      : config.slow,
  })

  // Open-close the laptop
  const handleCloseLaptop = () => {
    setIsOpeningClosing(true)
    dispatch({
      type: Actions.TOGGLE_LAPTOP_OPENED,
    })
    dispatch({
      type: Actions.SET_BLINKING,
      payload: false,
    })
  }

  // Turn on and off the skeleton mode
  const handleToggleSkeletonMode = () => {
    dispatch({
      type: Actions.TOGGLE_SKELETON_MODE,
    })
  }

  return (
    <group
      ref={laptopRef}
      rotation={[0, Math.PI, 0]}
      dispose={null}
      onPointerOver={e => {
        if (!isLaptopOpened) {
          e.stopPropagation()
          setHovered(true)
        }
      }}
      onPointerOut={() => setHovered(false)}
    >
      <group
        onClick={e => {
          if (isLaptopOpened) return
          e.stopPropagation()
          handleCloseLaptop()
        }}
      >
        <mesh
          geometry={frame.geometry}
          material={frame.material}
          rotation-x={-Math.PI / 2}
          scale={[10, 10, 10]}
        />
        <animated.mesh
          geometry={screen.geometry}
          material={screen.material}
          position={[0, -0.02, -1.021]}
          rotation-x={springs['rotation-x']}
          rotation-y={Math.PI}
          scale={[10, 10, 10]}
        >
          {(isLaptopOpened || wasOpened) && (
            <Html
              className='laptop-html-content'
              transform
              occlude
              position={[0, 0.1, 0.004]}
              rotation-y={Math.PI}
              scale={[0.01, 0.01, 0.01]}
              style={{
                opacity: '80%',
              }}
            >
              <LaptopScreen
                isLaptopOpened={isLaptopOpened}
                isSkeletonMode={isSkeletonMode}
                setLaptopHovered={setHovered}
                closeLaptop={handleCloseLaptop}
                toggleSkeletonMode={handleToggleSkeletonMode}
              />
            </Html>
          )}
        </animated.mesh>
      </group>
    </group>
  )
}
