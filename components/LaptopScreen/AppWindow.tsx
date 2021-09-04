import { ReactNode } from 'react'

export default function AppWindow({
  expanded,
  active,
  children,
  index,
}: {
  expanded: boolean
  active: boolean
  children: ReactNode | undefined
  index: number
}) {
  return (
    <div
      className='bg-red-500 absolute w-full'
      style={{
        height: '95%',
        transition: '0.3s all ease-in-out',
        transform: expanded ? 'scale(1)' : 'scale(0)',
        opacity: expanded ? '1' : '0.1',
        transformOrigin: `${165 + index * 50}px 100%`,
        visibility: active ? 'visible' : 'hidden',
        zIndex: active ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}
