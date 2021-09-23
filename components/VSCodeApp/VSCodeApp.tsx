import React, { useEffect, useRef } from 'react'
import { TEXT } from '../Scene2d/config'

export default function VSCodeApp({ isActive, changeScene2dText }: any) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isActive)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 500)
  }, [isActive])

  return (
    <div
      className='h-full w-full
      bg-100% bg-img-vs-code'
    >
      <input
        ref={inputRef}
        className='absolute bg-transparent outline-none'
        style={{
          fontFamily: 'Fira Code',
          width: 200,
          fontSize: 14,
          fontWeight: 600,
          color: '#719f67',
          top: 233,
          left: 526,
        }}
        maxLength={20}
        autoFocus
        onBlur={({ target }) => target.focus()}
        defaultValue={TEXT}
        onChange={({ target }) => changeScene2dText(target.value)}
      />
    </div>
  )
}
