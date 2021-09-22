import {
  COMPRESSION_ACCELERATION,
  CURSOR_IMPACT_RADIUS,
  EXTENSION_ACCELERATION,
  PARTICLE_SIZE,
  RANDOM_FACTOR,
} from './config'
import { Cursor } from './types'

export default class Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  color: string
  speedFactor: number
  isSkeletonMode: boolean

  constructor(x: number, y: number, color: string, isSkeletonMode: boolean) {
    this.x = x
    this.y = y
    this.baseX = this.x
    this.baseY = this.y
    this.color = color
    this.speedFactor = Math.random() * EXTENSION_ACCELERATION + 1
    this.isSkeletonMode = isSkeletonMode
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    !this.isSkeletonMode
      ? ctx.fillRect(this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE)
      : ctx.strokeRect(this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE)
  }

  update(cursor: Cursor, isBlinking: boolean) {
    const dx = (cursor.x || 0) - this.x
    const dy = (cursor.y || 0) - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    const isExtension = distance < CURSOR_IMPACT_RADIUS + PARTICLE_SIZE

    // Extension
    if (isExtension) {
      // Define the direction - against the cursor
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance

      // Than greater the distance between cursor and particle - than lower then speed
      let slowFactor = (CURSOR_IMPACT_RADIUS - distance) / CURSOR_IMPACT_RADIUS
      if (slowFactor < 0) slowFactor = 0

      // Random movement
      const randomFactor = Math.random() > RANDOM_FACTOR ? -1 : 1

      const movingCoefficient =
        slowFactor *
        randomFactor *
        (isBlinking ? this.speedFactor : this.speedFactor * 0.5)

      this.x -= forceDirectionX * movingCoefficient
      this.y -= forceDirectionY * movingCoefficient
    }

    // Compression
    if (!isExtension) {
      if (this.x !== this.baseX) this.x = getNewPosition(this.x, this.baseX)
      if (this.y !== this.baseY) this.y = getNewPosition(this.y, this.baseY)
    }
  }
}

function getNewPosition(position: number, basePosition: number) {
  if (Math.abs(position - basePosition) < 0.5) {
    return basePosition
  } else {
    const delta = position - basePosition
    return position - (delta * COMPRESSION_ACCELERATION) / 10
  }
}
