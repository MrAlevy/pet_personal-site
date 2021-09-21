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
        color='#fff0f0'
        position={[0, 3, 0]}
        intensity={isBlinking ? 1.3 : isLaptopOpened ? 0.2 : 0.5}
      />
      <ambientLight
        ref={ambientLightRef}
        intensity={isBlinking ? 0.7 : 0.2}
        position={[0, 2, 0]}
        color='#ff89f5'
      />
      <LightHelpers
        refs={{ spotLight: spotLightRef, ambientLight: ambientLightRef }}
        disabled
      />
    </>
  )
}
