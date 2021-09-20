//@ts-nocheck
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
  Text,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import LaptopScreen from '../LaptopScreen/LaptopScreen'
import * as THREE from 'three'

export default function FlyingWords(props) {
  const group = useRef()
  const rf1 = useRef()
  const rf2 = useRef()
  const rf3 = useRef()

  useFrame(state => {
    const t = state.clock.getElapsedTime()

    rf1.current.position.x = THREE.MathUtils.damp(
      rf1.current.position.x,
      -10,
      0.000001,
      10
    )
    rf2.current.position.x = THREE.MathUtils.damp(
      rf2.current.position.x,
      -10,
      0.000005,
      10
    )
    rf3.current.position.x = THREE.MathUtils.damp(
      rf3.current.position.x,
      -10,
      0.000009,
      10
    )
  })

  return (
    <group ref={group} {...props} rotation={[0, Math.PI, 0]} dispose={null}>
      <group ref={rf1} {...props} dispose={null}>
        {Array(50)
          .fill(0)
          .map((_, i) => (
            <Text
              ref={rf1}
              key={i}
              color='red'
              anchorX='center'
              anchorY='middle'
              // position={[1, 1, 3]}
              position={[
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 6,
              ]}
            >
              hello world!
            </Text>
          ))}
      </group>
      <group ref={rf2} {...props} dispose={null}>
        {Array(50)
          .fill(0)
          .map((_, i) => (
            <Text
              key={i}
              color='green'
              anchorX='center'
              anchorY='middle'
              // position={[1, 1, 3]}
              position={[
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 6,
              ]}
            >
              hello world!!
            </Text>
          ))}
      </group>
      <group ref={rf3} {...props} dispose={null}>
        {Array(50)
          .fill(0)
          .map((_, i) => (
            <Text
              key={i}
              color='blue'
              anchorX='center'
              anchorY='middle'
              // position={[1, 1, 3]}
              position={[
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 3,
                (Math.random() + 1) * 2 - 7,
              ]}
            >
              hello world!!!
            </Text>
          ))}
      </group>
    </group>
  )
}
