import React, { useCallback, useEffect } from 'react'
import { Actions } from '../Context/Context'
import useContext from '../Context/useContext'
import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  FONT,
  FONT_SIZE,
  LETTER_SCALE,
} from './config'
import Particle from './Particle'
import { Blink, Cursor, Effects, EffectsActivity } from './types'
import {
  animateParticles,
  effectBlink,
  effectConnections,
  getTextStartPoint,
  makeParticles,
} from './utils'

export default function Scene2() {
  const { context, dispatch } = useContext()
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatchCallback = useCallback(dispatch, [])

  return (
    <Scene2dMemo<typeof dispatch>
      isLaptopOpened={context.isLaptopOpened}
      dispatch={dispatchCallback}
    />
  )
}

const Scene2dMemo = React.memo(Scene2Generic) as typeof Scene2Generic

interface Props<TDispatch> {
  isLaptopOpened: boolean
  dispatch: TDispatch
}

function Scene2Generic<TDispatch extends Function>({
  isLaptopOpened,
  dispatch,
}: Props<TDispatch>) {
  const text = 'hello there!'

  const isUnmount = {
    value: false,
  }

  const particleArray: { particles: Particle[] } = {
    particles: [],
  }

  useEffect(() => {
    console.log('rerender')
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
      blink: !isLaptopOpened,
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

    // Find start 'x' coord - center align
    const displacementX = getTextStartPoint(canvas.width, imageData.width)

    // Make particle array
    particleArray.particles = makeParticles(imageData, displacementX)

    // Sets for blink effect
    const blink: Blink = {
      _isActive: false,
      timer: 0,
      blinkX: displacementX,
      blinkY: CANVAS_HEIGHT / 2,
      set isActive(isActive: boolean) {
        dispatch({
          type: Actions.SET_BLINKING,
          payload: isActive,
        })
        this._isActive = isActive
      },
      get isActive() {
        return this._isActive
      },
    }

    // Sets for connections effect
    const cursor: Cursor = {
      x: undefined,
      y: undefined,
    }
    let connectionsTimeOutID: ReturnType<typeof setTimeout> | undefined =
      undefined

    // Animate particle array
    animateParticles(ctx, particleArray, cursor, effectsActivity, isUnmount, [
      {
        title: Effects.BLINK,
        effect: () =>
          effectBlink(
            blink,
            cursor,
            effectsActivity,
            displacementX,
            displacementX + imageData.width * LETTER_SCALE
          ),
      },
      {
        title: Effects.CONNECTIONS,
        effect: () => effectConnections(ctx, cursor, particleArray.particles),
      },
    ])

    // Event listeners
    const resize = () => {
      canvas.width = window.innerWidth
      const displacementX = getTextStartPoint(canvas.width, imageData.width)
      blink.blinkX = displacementX
      particleArray.particles = makeParticles(imageData, displacementX)
    }
    const mousemove = (e: MouseEvent) => {
      cursor.x = e.x + canvas.clientLeft / 2
      cursor.y = e.y + canvas.clientTop / 2
    }
    const mousemoveCanvas = () => {
      blink.timer = 0
      effectsActivity.connections = true
      connectionsTimeOutID && clearTimeout(connectionsTimeOutID)
    }
    const mouseleaveCanvas = () => {
      connectionsTimeOutID = setTimeout(() => {
        effectsActivity.connections = false
      }, 3000)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mousemove', mousemoveCanvas)
    canvas.addEventListener('mouseleave', mouseleaveCanvas)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', mousemove)
      canvas.removeEventListener('mousemove', mousemoveCanvas)
      canvas.removeEventListener('mouseleave', mouseleaveCanvas)

      // To prevent memory leak from recursive animation function
      isUnmount.value = true
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
