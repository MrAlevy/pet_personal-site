import { AnimationProps, motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import { GiSurprisedSkull } from 'react-icons/gi'
import { MdFace } from 'react-icons/md'

export default function Skull({
  isSkeletonMode,
  handleClick,
}: {
  isSkeletonMode: boolean
  handleClick: () => void
}) {
  const controls = useAnimation()
  const [rotation, setRotation] = useState(360)
  const fontSize = 80
  const duration = 1
  const animation: AnimationProps['animate'] = {
    transition: { delay: 0, duration },
  }

  return (
    <motion.div
      className='absolute text-gray-400 hover:text-yellow-300 cursor-pointer'
      onClick={() => {
        if (isSkeletonMode) {
          animation.rotateY = rotation
          setRotation(rotation - 360)
        } else {
          animation.rotateZ = [0, 3, -30, 30, -30, 3, 0]
        }
        controls.start(() => animation)
        setTimeout(() => {
          handleClick()
        }, (duration * 1000) / 2)
      }}
      animate={controls}
      style={{
        width: 'fit-content',
        margin: '30px 50px',
        right: 0,
        bottom: 0,
      }}
    >
      {isSkeletonMode ? (
        <GiSurprisedSkull style={{ fontSize }} />
      ) : (
        <MdFace style={{ fontSize }} />
      )}
    </motion.div>
  )
}
