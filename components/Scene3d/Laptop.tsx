import { animated, config, useSpring } from '@react-spring/three'
import { Html, useCubeTexture, useGLTF } from '@react-three/drei'
import {
  EulerProps,
  GroupProps,
  MeshStandardMaterialProps,
  useFrame,
  Vector3Props,
} from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry } from 'three'
import { GLTF } from 'three-stdlib'
import { Actions } from '../Context/Context'
import LaptopScreen from '../LaptopScreen/LaptopScreen'
import { OPEN_Y_DECREASE } from './config'

type Material = MeshStandardMaterialProps & { [key: string]: any }
type Model = GLTF & {
  materials: {
    ComputerFrame: Material
    ComputerScreen: Material
  }
  nodes: {
    Frame_ComputerFrame_0: { geometry: BufferGeometry }
    Screen_ComputerScreen_0: { geometry: BufferGeometry }
  }
}

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
  const laptopModel = useGLTF('/laptop.glb') as Model
  const laptopRef = useRef<GroupProps>()
  const [isOpeningClosing, setIsOpeningClosing] = useState(false)
  const [wasOpened, setWasOpened] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cameraCoordsRatios, setCameraCoordsRatios] = useState<number[]>([])

  // Camera default positions for open-close states
  const cameraPositionVector = isLaptopOpened
    ? new THREE.Vector3().set(-0.118, 0.8, -2.5 * cameraScaleFactor)
    : new THREE.Vector3().set(0.5, 0.5, -4 * cameraScaleFactor)

  useEffect(() => {
    setCameraCoordsRatios([])
    if (isLaptopOpened) setWasOpened(true)
  }, [isLaptopOpened])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

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

  // Materials settings
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

  const frameMaterial = laptopModel.materials.ComputerFrame
  // console.log(frameMaterial)
  frameMaterial.metalness = 0.8
  frameMaterial.roughness = 0.4
  frameMaterial.color = new THREE.Color('skyblue')
  frameMaterial.bumpMap = texture
  frameMaterial.bumpScale = 0.006
  frameMaterial.envMap = envMap
  frameMaterial.lightProbeIntensity = 1.0
  frameMaterial.directionalLightIntensity = 0.2
  frameMaterial.envMapIntensity = isLaptopOpened ? 1 : 0.6
  frameMaterial.envMaps = 'reflection'
  // frameMaterial.wireframe = true

  const screenMaterial = laptopModel.materials.ComputerScreen
  // console.log(screenMaterial)
  screenMaterial.metalness = 0.8
  screenMaterial.roughness = 0.4
  screenMaterial.color = new THREE.Color('skyblue')
  screenMaterial.emissive = new THREE.Color('white')
  screenMaterial.emissiveIntensity = 0.6
  screenMaterial.envMap = envMap
  screenMaterial.lightProbeIntensity = 1
  screenMaterial.directionalLightIntensity = 0.2
  screenMaterial.envMapIntensity = isLaptopOpened ? 1 : 0.6
  // screenMaterial.wireframe = true
  // screenMaterial.bumpMap = texture
  // screenMaterial.bumpScale = 0.003
  // screenMaterial.map = null

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
          material={frameMaterial as THREE.Material}
          geometry={laptopModel.nodes.Frame_ComputerFrame_0.geometry}
          rotation-x={-Math.PI / 2}
          scale={[10, 10, 10]}
        />
        <animated.mesh
          material={screenMaterial as THREE.Material}
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
