import React from 'react'
import { CANVAS_HEIGHT, CANVAS_ID, FONT, FONT_SIZE } from './config'
import { Blink, Cursor } from './types'
import {
  animateParticles,
  effectBlink,
  effectConnections,
  makeParticles,
  mouseMoveHandler,
} from './utils'

export default function Scene2d() {
  const text = 'hello there!'

  React.useEffect(() => {
    // Get canvas
    const canvas = document.querySelector(`#${CANVAS_ID}`) as HTMLCanvasElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Canvas params
    canvas.width = window.innerWidth
    canvas.height = CANVAS_HEIGHT
    canvas.style.height = `${canvas.height}px`

    // For blink effect
    const blink: Blink = {
      timer: 250,
      isActive: false,
      blinkX: 0,
      blinkY: CANVAS_HEIGHT / 2,
    }
    const mousemoveCanvas = () => (blink.timer = 0)
    canvas.addEventListener('mousemove', mousemoveCanvas)

    // For connections effect
    const cursor: Cursor = {
      x: undefined,
      y: undefined,
    }
    const mousemove = (e: MouseEvent) => mouseMoveHandler(canvas, e, cursor)
    window.addEventListener('mousemove', mousemove)

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
    const particleArray = makeParticles(imageData, canvas.width)

    // Animate particle array
    animateParticles(ctx, particleArray, cursor, [
      () => effectBlink(blink, cursor, canvas.width),
      () => effectConnections(ctx, cursor, particleArray),
    ])

    return () => {
      window.removeEventListener('mousemove', mousemove)
      canvas.removeEventListener('mousemove', mousemoveCanvas)
    }
  }, [])

  return (
    <canvas
      id={CANVAS_ID}
      className='absolute w-full'
      style={{
        zIndex: 99999,
        // border: '1px solid yellow',
      }}
    />
  )
}

//TODO: window resize, blinks
