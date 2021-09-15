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
  const [resizeTrigger, setResizeTrigger] = React.useState(false)
  const { context, dispatch } = useContext()
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatchCallback = useCallback(dispatch, [])

  const resize = () => {
    setResizeTrigger(!resizeTrigger)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  })

  return (
    <Scene2dMemo<typeof dispatch>
      isLaptopOpened={context.isLaptopOpened}
      dispatch={dispatchCallback}
      resizeTrigger={resizeTrigger}
    />
  )
}

const Scene2dMemo = React.memo(Scene2Generic) as typeof Scene2Generic

interface Props<TDispatch> {
  isLaptopOpened: boolean
  dispatch: TDispatch
  resizeTrigger: boolean
}

function Scene2Generic<TDispatch extends Function>({
  isLaptopOpened,
  dispatch,
  resizeTrigger,
}: Props<TDispatch>) {
  resizeTrigger

  const text = 'hello there!'
  const isUnmount = {
    value: false,
  }
  const particleArray: { particles: Particle[] } = {
    particles: [],
  }

  useEffect(() => {
    // Get canvas
    const canvas = document.querySelector(`#${CANVAS_ID}`) as HTMLCanvasElement
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

    // Define scene scale depends on window size
    let scale = LETTER_SCALE
    if (canvas.width <= imageData.width * LETTER_SCALE)
      scale = (canvas.width / imageData.width) * 0.8

    // Find start 'x' coord - center align
    const displacementX = getTextStartPoint(
      canvas.width,
      imageData.width,
      scale
    )

    // Make particle array
    particleArray.particles = makeParticles(
      imageData,
      displacementX,
      scale,
      isLaptopOpened
    )

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
        effect: () =>
          effectConnections(
            ctx,
            cursor,
            particleArray.particles,
            isLaptopOpened
          ),
      },
    ])

    // Event listeners
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

    window.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mousemove', mousemoveCanvas)
    canvas.addEventListener('mouseleave', mouseleaveCanvas)

    return () => {
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
