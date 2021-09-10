import { useEffect } from 'react'
import { CANVAS_HEIGHT, CANVAS_ID, FONT, FONT_SIZE } from './config'
import Particle from './Particle'
import { Blink, Cursor, Effects, EffectsActivity } from './types'
import {
  animateParticles,
  effectBlink,
  effectConnections,
  makeParticles,
} from './utils'

export default function Scene2d() {
  const text = 'hello there!'

  const isUnmount = {
    value: false,
  }

  const particleArray: { particles: Particle[] } = {
    particles: [],
  }

  useEffect(() => {
    // Get canvas
    let canvas = document.querySelector(`#${CANVAS_ID}`) as HTMLCanvasElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Canvas params
    canvas.width = window.innerWidth
    canvas.height = CANVAS_HEIGHT
    canvas.style.height = `${canvas.height}px`

    // Effects activity
    const effectsActivity: EffectsActivity = {
      connections: false,
      blink: true,
    }

    // For blink effect
    const blink: Blink = {
      timer: 0,
      isActive: false,
      blinkX: 0,
      blinkY: CANVAS_HEIGHT / 2,
    }

    // For connections effect
    const cursor: Cursor = {
      x: undefined,
      y: undefined,
    }

    // Print text and capture an area with it
    ctx.font = FONT
    ctx.fillText(text, 0, FONT_SIZE)
    const textBoundingBox: [number, number, number, number] = [
      0,
      0,
      ctx.measureText(text).width,
      FONT_SIZE * 1.3,
    ]
    const imageData = ctx.getImageData(...textBoundingBox)

    // Make particle array
    particleArray.particles = makeParticles(imageData, canvas.width)

    // Animate particle array
    animateParticles(ctx, particleArray, cursor, effectsActivity, isUnmount, [
      {
        title: Effects.BLINK,
        effect: () => effectBlink(blink, cursor, canvas.width, effectsActivity),
      },
      {
        title: Effects.CONNECTIONS,
        effect: () => effectConnections(ctx, cursor, particleArray.particles),
      },
    ])

    // Listeners
    const resize = () => {
      canvas.width = window.innerWidth
      particleArray.particles = makeParticles(imageData, canvas.width)
    }
    const mousemove = (e: MouseEvent) => {
      cursor.x = e.x + canvas.clientLeft / 2
      cursor.y = e.y + canvas.clientTop / 2
    }
    const mousemoveCanvas = () => {
      blink.timer = 0
      effectsActivity.connections = true
    }
    const mouseleaveCanvas = () => {
      setTimeout(() => {
        effectsActivity.connections = false
      }, 3000)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mousemove', mousemoveCanvas)
    canvas.addEventListener('mouseleave', mouseleaveCanvas)

    return () => {
      // To prevent memory leak from recursive animation function
      isUnmount.value = true

      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', mousemove)
      canvas.removeEventListener('mousemove', mousemoveCanvas)
      canvas.removeEventListener('mouseleave', mouseleaveCanvas)
    }
  })

  return (
    <canvas
      id={CANVAS_ID}
      className='absolute w-full flex justify-center'
      style={{
        zIndex: 99999,
        // border: '1px solid yellow',
      }}
    />
  )
}

//TODO: animating words changing
//TODO: make scale factor for screen size
