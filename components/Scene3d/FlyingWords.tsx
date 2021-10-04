import { Text } from '@react-three/drei'
import { EulerProps, GroupProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const COLORS = ['#510770', '#660707', '#104912', '#0c2091', '#c52700']

const getColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]
const getOpacity = (word: string) => Math.random() * (4 / word.length) + 0.5

const Word = ({ word }: { word: string }) => (
  <Text
    color={getColor()}
    fillOpacity={getOpacity(word)}
    anchorX='center'
    anchorY='middle'
    position={[
      (Math.random() * 7 + 2) * 2 - 3,
      (Math.random() * 10 + 2) * 1 - 3,
      (Math.random() * 1.5 + 2) * 2 - 6,
    ]}
  >
    {word}
  </Text>
)

export default function FlyingWords({
  wordsArray,
  disabled,
}: {
  wordsArray: string[]
  disabled: boolean
}) {
  const leftGroupRef = useRef<GroupProps>()
  const rightGroupRef = useRef<GroupProps>()

  useFrame(state => {
    if (disabled) return

    const t = state.clock.getElapsedTime()

    const rotation = THREE.MathUtils.lerp(0, Math.cos(t / 2) / 10, 0.2)

    const rotationLeftGroup = leftGroupRef.current?.rotation as EulerProps
    const rotationRightGroup = rightGroupRef.current?.rotation as EulerProps

    rotationLeftGroup.x = rotation
    rotationRightGroup.x = rotation
  })

  if (disabled) return null

  return (
    <>
      <group
        ref={leftGroupRef}
        rotation={[0, -Math.PI / 2.4 + Math.PI, 0]}
        position={[0, -5, 14]}
      >
        {wordsArray.slice(0, wordsArray.length / 2).map((word, i) => (
          <Word key={i} word={word} />
        ))}
      </group>
      <group
        ref={rightGroupRef}
        rotation={[0, Math.PI / 2.4 + Math.PI, 0]}
        position={[5, -5, -2]}
      >
        {wordsArray.slice(wordsArray.length / 2).map((word, i) => (
          <Word key={i} word={word} />
        ))}
      </group>
    </>
  )
}
