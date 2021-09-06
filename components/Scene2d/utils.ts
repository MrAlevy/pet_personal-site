import {
  ALPHA_MIN,
  CONNECTION_COLOR_1,
  CONNECTION_COLOR_2,
  CONNECTION_COLOR_3,
  CONNECTION_DISTANCE_MAX,
  CONNECTION_DISTANCE_MIN,
  CONNECTION_OPACITY_FACTOR,
  CONNECTION_WIDTH,
  CURSOR_IMPACT_RADIUS,
  DISPLACEMENT_Y,
  LETTER_SCALE,
  PARTICLE_SIZE,
} from './config'
import Particle from './Particle'
import { Cursor } from './types'

export const makeParticles = (imageData: ImageData, canvasWidth: number) => {
  const particleArray = []
  // Center align
  const displacementX = canvasWidth / 2 - (imageData.width * LETTER_SCALE) / 2
  // Look on each pixel and create particles for those of which the condition of the minimum opacity ALPHA_MIN is satisfied
  // Each pixel represents by four elements in an array in an rgba format - alpha is each fourth value
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > ALPHA_MIN) {
        const positionX = x * LETTER_SCALE + displacementX
        const positionY = y * LETTER_SCALE + DISPLACEMENT_Y
        particleArray.push(new Particle(positionX, positionY))
      }
    }
  }
  return particleArray
}

/**
 * MUTABLE FUNCTIONS
 */

export const animateParticles = (
  ctx: CanvasRenderingContext2D,
  particleArray: Particle[],
  cursor: Cursor,
  effects?: (() => void)[]
) => {
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  effects && effects.forEach(effect => effect())

  particleArray.forEach(particle => {
    particle.update(cursor)
    particle.draw(ctx)
  })

  requestAnimationFrame(() =>
    animateParticles(ctx, particleArray, cursor, effects)
  )
}

export const effectBlink = (
  blink: any, //TODO:
  cursor: Cursor,
  width: number
) => {
  blink.timer += 1 // TODO: %300(3000) %10(500)
  if (blink.timer % 10 === 0) blink.isActive = true
  if (blink.isActive) {
    const randomBack = Math.random() < 0.8 ? 1 : -2
    // const randomStop = Math.random() < 0.8 ? 1 : 0
    blink.blinkX += randomBack * 50 * (Math.random() * 1.5 + 1)
    cursor.x = blink.blinkX
    cursor.y = blink.blinkY
    if (blink.blinkX > width + 100) {
      blink.isActive = false
      setTimeout(() => {
        blink.blinkX = 0
        if (cursor.x && cursor.x > width) cursor.x = undefined
      }, 500)
    }
  }
}

export const effectConnections = (
  ctx: CanvasRenderingContext2D,
  cursor: Cursor,
  particleArray: Particle[]
) => {
  if (!cursor.x || !cursor.y) return

  const halfSize = PARTICLE_SIZE / 2

  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      // Distance to other particles
      const distance = Math.hypot(
        particleArray[a].x - particleArray[b].x,
        particleArray[a].y - particleArray[b].y
      )
      const isDistanceOK =
        distance > CONNECTION_DISTANCE_MIN && distance < CONNECTION_DISTANCE_MAX
      const isNotAtBase = particleArray[a].baseX !== particleArray[a].x

      // Draw connection line
      if (isDistanceOK && isNotAtBase) {
        const opacity = distance / CONNECTION_OPACITY_FACTOR
        const distanceToCursor = Math.hypot(
          cursor.x - particleArray[a].x,
          cursor.y - particleArray[a].y
        )
        const modifyColor = (color: `rgba(${number},${number},${number},1)`) =>
          color.replace('1)', `${opacity})`)

        if (distanceToCursor < CURSOR_IMPACT_RADIUS / 2) {
          ctx.strokeStyle = modifyColor(CONNECTION_COLOR_1)
        } else if (distanceToCursor < CURSOR_IMPACT_RADIUS) {
          ctx.strokeStyle = modifyColor(CONNECTION_COLOR_2)
        } else {
          ctx.strokeStyle = modifyColor(CONNECTION_COLOR_3)
        }

        // Draw the line
        ctx.lineWidth = CONNECTION_WIDTH
        ctx.beginPath()
        ctx.moveTo(particleArray[a].x + halfSize, particleArray[a].y + halfSize)
        ctx.lineTo(particleArray[b].x + halfSize, particleArray[b].y + halfSize)
        ctx.stroke()
      }
    }
  }
}

export const mouseMoveHandler = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  cursor: Cursor
) => {
  cursor.x = event.x + canvas.clientLeft / 2
  cursor.y = event.y + canvas.clientTop / 2
}
