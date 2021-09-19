//@ts-nocheck
import { useState, useEffect } from 'react'
import {
  Html,
  useGLTF,
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  GizmoViewcube,
  useHelper,
  BoxHelper,
  AxesHelper,
  useCubeTexture,
} from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import LaptopScreen from '../LaptopScreen/LaptopScreen'
import * as THREE from 'three'
import { useSpring, animated, config, to } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Actions } from '../Context/Context'
import { OPEN_Y_DECREASE } from './config'
//TODO: gui to DEV DEPS remove

export default function Laptop({
  context: {
    context: { isLaptopOpened },
    dispatch,
  },
  cameraScaleFactor,
}: {
  context: any
  cameraScaleFactor: number
}) {
  const laptopModel = useGLTF('/laptop.glb')
  const laptopRef = useRef()
  const [isOpeningClosing, setIsOpeningClosing] = useState(false)
  const [wasOpened, setWasOpened] = useState(false)
  const [hovered, setHovered] = useState(false)

  const cameraPositionVector = isLaptopOpened
    ? new THREE.Vector3().set(-0.118, 0.8, -2.5 * cameraScaleFactor)
    : new THREE.Vector3().set(0.5, 0.5, -4 * cameraScaleFactor)

  const [cameraCoordsRatios, setCameraCoordsRatios] = useState([])
  const calcCoordsRatio = (x, y, z) => Math.round((x / (x + y + z)) * 1000)

  useEffect(() => {
    setCameraCoordsRatios([])
    // setIsOpeningClosing(true)
    if (isLaptopOpened) setWasOpened(true)
  }, [isLaptopOpened])

  useFrame(state => {
    const t = state.clock.getElapsedTime()

    const { x, y, z } = state.camera.position

    if (isOpeningClosing) {
      const coordsRatio = calcCoordsRatio(x, y, z)

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

    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopRef.current.rotation.x,
      !isLaptopOpened ? (!isOpeningClosing ? Math.cos(t / 2) / 10 : 0) : 0,
      0.1
    )
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopRef.current.rotation.y,
      !isLaptopOpened
        ? Math.PI + Math.sin(t / 4) / 20
        : laptopRef.current.rotation.y,
      0.1
    )
    laptopRef.current.rotation.z = THREE.MathUtils.lerp(
      laptopRef.current.rotation.z,
      !isLaptopOpened ? (!isOpeningClosing ? Math.sin(t / 4) / 20 : 0) : 0,
      0.1
    )
    laptopRef.current.position.y = THREE.MathUtils.lerp(
      laptopRef.current.position.y,
      !isLaptopOpened ? (1 + Math.sin(t)) / 5 : -0.43 - OPEN_Y_DECREASE,
      0.1
    )
  })

  useEffect(
    () => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'),
    [hovered]
  )

  const springs = useSpring({
    'rotation-x':
      isLaptopOpened & !hovered
        ? -Math.PI / 10
        : isLaptopOpened & hovered
        ? -Math.PI / 15
        : hovered
        ? Math.PI / 2.1
        : Math.PI / 2,
    config: isLaptopOpened
      ? { ...config.gentle, tension: 90, friction: 12 }
      : config.slow,
  })

  // useEffect(() => {
  //   springs['rotation-x'].start({
  //     //TODO:
  //     config: !isLaptopOpened
  //       ? config.slow
  //       : { ...config.gentle, tension: 90, friction: 12 },
  //   })
  // }, [isLaptopOpened, hovered])

  const texture = new THREE.TextureLoader().load('/13767-bump.jpg')
  texture.rotation = Math.PI / 4

  const envMap = useCubeTexture(
    ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'],
    { path: '/textures/' }
  )
  // const envMap = useCubeTexture(
  //   ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
  //   { path: '/textures/' }
  // )

  const mat1 = laptopModel.materials.ComputerFrame
  // console.log(mat1)
  mat1.metalness = 0.8
  mat1.roughness = 0.4
  mat1.color = new THREE.Color('skyblue')
  mat1.bumpMap = texture
  mat1.bumpScale = 0.006
  mat1.envMap = envMap
  mat1.lightProbeIntensity = 1.0
  mat1.directionalLightIntensity = 0.2
  mat1.envMapIntensity = 1
  mat1.envMaps = 'reflection'
  // mat1.wireframe = true

  const mat2 = laptopModel.materials.ComputerScreen
  // console.log(mat2)
  mat2.metalness = 0.9
  mat2.roughness = 0.3
  mat2.color = new THREE.Color('skyblue')
  mat2.emissive = new THREE.Color('white')
  mat2.emissiveIntensity = 0.6
  mat2.envMap = envMap
  mat2.lightProbeIntensity = 1.0
  mat2.directionalLightIntensity = 0.2
  mat2.envMapIntensity = 1
  // mat2.wireframe = true
  // mat2.bumpMap = texture
  // mat2.bumpScale = 0.003

  // mat2.map = null

  return (
    //TODO: make responsive with scale
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
      onPointerOut={e => setHovered(false)}
    >
      <group
        onClick={e => {
          if (isLaptopOpened) return
          e.stopPropagation()
          setIsOpeningClosing(true)
          dispatch({
            type: Actions.TOGGLE_LAPTOP_OPENED,
          })
          dispatch({
            type: Actions.SET_BLINKING,
            payload: false,
          })
        }}
      >
        <mesh
          material={mat1}
          // material={laptopModel.materials.ComputerFrame}
          geometry={laptopModel.nodes.Frame_ComputerFrame_0.geometry}
          rotation-x={-Math.PI / 2}
          scale={[10, 10, 10]}
          // onPointerOver={e => (e.stopPropagation(), setHovered(true))}
          // onPointerOut={e => setHovered(false)}
          // onClick={e => {
          //   e.stopPropagation()
          //   setIsOpeningClosing(true)
          //   dispatch({
          //     type: Actions.TOGGLE_LAPTOP_OPENED,
          //   })
          //   dispatch({
          //     type: Actions.SET_BLINKING,
          //     payload: false,
          //   })
          // }}
        />
        <animated.mesh
          material={mat2}
          // material={laptopModel.materials.ComputerScreen}
          geometry={laptopModel.nodes.Screen_ComputerScreen_0.geometry}
          rotation-y={Math.PI}
          rotation-x={springs['rotation-x']}
          position={[0, -0.02, -1.021]}
          scale={[10, 10, 10]}
        >
          {(isLaptopOpened || wasOpened) && (
            <Html
              className='laptop-html-content'
              transform
              occlude
              scale={[0.01, 0.01, 0.01]}
              position={[0, 0.1, 0.004]}
              rotation-y={Math.PI}
              style={{
                opacity: '80%',
              }}
            >
              <LaptopScreen
                isLaptopOpened={isLaptopOpened}
                setLaptopHovered={setHovered}
                closeLaptop={() => {
                  setIsOpeningClosing(true)
                  dispatch({
                    type: Actions.TOGGLE_LAPTOP_OPENED,
                  })
                  dispatch({
                    type: Actions.SET_BLINKING,
                    payload: false,
                  })
                }}
              />
            </Html>
          )}
        </animated.mesh>
      </group>
    </group>
  )
}
