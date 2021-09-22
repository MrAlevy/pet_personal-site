import { useRef } from 'react'
import { LightHelpers } from './Helpers'

export default function Lights({
  isLaptopOpened,
  isBlinking,
}: {
  isLaptopOpened: boolean
  isBlinking: boolean
}) {
  const spotLightRef = useRef()
  const ambientLightRef = useRef()

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={[0, 3, 0]}
        color='#fff0f0'
        intensity={isBlinking ? 1.3 : isLaptopOpened ? 0.3 : 0.5}
      />
      <ambientLight
        ref={ambientLightRef}
        position={[0, 2, 0]}
        color={isLaptopOpened ? '#fff0f0' : '#ff89f5'}
        intensity={isBlinking ? 0.7 : isLaptopOpened ? 0.5 : 0.2}
      />
      <LightHelpers
        refs={{ spotLight: spotLightRef, ambientLight: ambientLightRef }}
        disabled
      />
    </>
  )
}
