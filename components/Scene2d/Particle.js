import { SPEED_FACTOR, PARTICLE_SIZE, PARTICLE_COLOR } from './config'

export default class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.baseX = this.x
    this.baseY = this.y
    this.speedFactor = Math.random() * SPEED_FACTOR + 1
  }
  draw(ctx) {
    ctx.fillStyle = PARTICLE_COLOR
    ctx.fillRect(this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE)
  }
  update(cursor) {
    let dx = cursor.x - this.x
    let dy = cursor.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    // distance past which the force is zero
    var maxDistance = cursor.radius
    // convert (0...maxDistance) range into a (1...0).
    // Close is near 1, far is near 0
    // for example:
    //   250 => 0.75
    //   100 => 0.9
    //   10  => 0.99
    var force = (maxDistance - distance) / maxDistance

    // if we went below zero, set it to zero.
    if (force < 0) force = 0

    let directionX = forceDirectionX * force * this.speedFactor
    let directionY = forceDirectionY * force * this.speedFactor

    if (distance < cursor.radius + PARTICLE_SIZE) {
      //TODO: make movements chaotic
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        if (Math.abs(this.baseX - this.x) < 0.5) {
          this.x = this.baseX
        } else {
          let dx = this.x - this.baseX
          this.x -= dx / 10
        }
      }
      if (this.y !== this.baseY) {
        if (Math.abs(this.baseY - this.y) < 0.5) {
          this.y = this.baseY
        } else {
          let dy = this.y - this.baseY
          this.y -= dy / 10
        }
      }
    }
  }
}
