//@ts-nocheck
import React from 'react'
import Particle from './Particle'
import {
  CANVAS_HEIGHT,
  FONT_SIZE,
  FONT,
  LETTER_SCALE,
  PARTICLE_SIZE,
  ALPHA_MIN,
  DISPLACEMENT_Y,
  CURSOR_IMPACT_RADIUS,
} from './config'

export default function Scene2d() {
  const text = 'hello there!'

  React.useEffect(() => {
    // Get canvas
    const canvas = document.querySelector('#canvas1') as HTMLCanvasElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return null

    // Canvas params
    canvas.width = window.innerWidth
    canvas.height = CANVAS_HEIGHT
    canvas.style.height = `${canvas.height}px`

    // Mouse movement handler
    const cursor = {
      x: undefined,
      y: undefined,
      radius: CURSOR_IMPACT_RADIUS,
    }

    const mouseMoveHandler = event => {
      cursor.x = event.x + canvas.clientLeft / 2
      cursor.y = event.y + canvas.clientTop / 2
    }

    window.addEventListener('mousemove', mouseMoveHandler)

    // Print text and capture an area with it
    ctx.font = FONT
    ctx.fillText(text, 0, FONT_SIZE)
    const textBoundingBox = [0, 0, ctx.measureText(text).width, FONT_SIZE * 1.3]
    const imageData = ctx.getImageData(...textBoundingBox)

    // Make particle array
    const particleArray = makeParticles(imageData, canvas.width)
    animate()

    function animate() {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      connect()
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(cursor)
        particleArray[i].draw(ctx)
      }
      requestAnimationFrame(animate)
    }
    function connect() {
      let opacityValue = 1
      const halfSize = PARTICLE_SIZE / 2
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let distance =
            (particleArray[a].x - particleArray[b].x) *
              (particleArray[a].x - particleArray[b].x) +
            (particleArray[a].y - particleArray[b].y) *
              (particleArray[a].y - particleArray[b].y)
          // if (distance < 70) {
          const condition1 = distance > 40 && distance < 150
          const condition2 = particleArray[a].baseX !== particleArray[a].x
          const condition3 = particleArray[b].baseX !== particleArray[b].x

          if (condition1 && condition2 && condition3) {
            opacityValue = distance / 100
            let dx = cursor.x - particleArray[a].x
            let dy = cursor.y - particleArray[a].y
            let cursorDistance = Math.sqrt(dx * dx + dy * dy)
            if (cursorDistance < cursor.radius / 2) {
              ctx.strokeStyle = 'rgba(255,255,0,' + opacityValue + ')'
            } else if (cursorDistance < cursor.radius - 50) {
              ctx.strokeStyle = 'rgba(255,255,140,' + opacityValue + ')'
            } else if (cursorDistance < cursor.radius + 20) {
              ctx.strokeStyle = 'rgba(255,255,210,' + opacityValue + ')'
            } else {
              ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')'
            }
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(
              particleArray[a].x + halfSize,
              particleArray[a].y + halfSize
            )
            ctx.lineTo(particleArray[b].x + halfSize, particleArray[b].y) +
              halfSize
            ctx.stroke()
          }
        }
      }
    }

    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return (
    <canvas
      id='canvas1'
      className='absolute w-full'
      style={{
        zIndex: 99999,
        // border: '1px solid yellow',
      }}
    />
  )
}

function makeParticles(imageData, canvasWidth) {
  const particleArray = []
  const displacementX = canvasWidth / 2 - (imageData.width * LETTER_SCALE) / 2
  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {
      if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > ALPHA_MIN) {
        const positionX = x * LETTER_SCALE + displacementX
        const positionY = y * LETTER_SCALE + DISPLACEMENT_Y
        particleArray.push(new Particle(positionX, positionY))
      }
    }
  }
  return particleArray
}
