import { ReactNode } from 'react'

export default function TextContent({ children }: { children: ReactNode }) {
  return (
    <div className='text-2xl whitespace-pre-line text-justify'>{children}</div>
  )
}
