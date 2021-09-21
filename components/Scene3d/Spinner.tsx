import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

const Square = ({ number, small }: { number: number; small?: boolean }) => {
  let x, rotateZ, marginTop, backgroundColor

  const x0 = [-120, -100, 0, 100, 120]
  const x1 = [-105, -80, 0, 80, 105]
  const x2 = [-90, -60, 0, 60, 90]

  switch (number) {
    case 0:
      x = !small ? x0 : x0.map(e => e / 2)
      rotateZ = [-80, -65, 0, 65, 80]
      marginTop = [10, 8, 0, 8, 10]
      backgroundColor = '#73da5eb9'
      break
    case 1:
      x = !small ? x1 : x1.map(e => e / 2)
      rotateZ = [-80, -50, 0, 50, 80]
      marginTop = [5, 3, 0, 3, 5]
      backgroundColor = '#f8f542d1'
      break
    case 2:
      x = !small ? x2 : x2.map(e => e / 2)
      rotateZ = [-80, -35, 0, 35, 80]
      marginTop = 0
      backgroundColor = '#eb2121ae'
      break
    default:
      break
  }

  return (
    <motion.div
      initial={{ opacity: 1, x: -40, borderRadius: 30 }}
      animate={{
        marginTop,
        x,
        rotateZ,
        rotateY: [-70, -50, 0, -50, -70],
        rotateX: [-20, -15, 0, 15, 20],
        borderRadius: [5, 8, 30, 8, 5],
      }}
      transition={{
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: [0.05, 0, 0, 0.05],
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      style={{
        backgroundColor,
        position: 'absolute',
        width: !small ? 60 : 20,
        height: !small ? 60 : 20,
        border: '2px solid #d0c7d49e',
      }}
    />
  )
}

export default function Spinner({ small }: { small?: boolean }) {
  return (
    <Html>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Square key={i} number={i} small={small} />
        ))}
    </Html>
  )
}
