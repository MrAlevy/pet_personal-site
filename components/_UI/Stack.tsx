import { ReactElement } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { IoTriangleOutline } from 'react-icons/io5'
import {
  SiDocker,
  SiFramer,
  SiHeroku,
  SiNextDotJs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { VscGithubAction } from 'react-icons/vsc'

const technologies = [
  {
    name: 'Next',
    icon: <SiNextDotJs />,
  },
  {
    name: 'React',
    icon: <SiReact />,
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
  },
  {
    name: 'Three + Fiber, Drei, Spring',
    icon: <IoTriangleOutline style={{ transform: 'rotate(-45deg)' }} />,
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer />,
  },
  {
    name: 'Tailwind',
    icon: <SiTailwindcss />,
  },
]

const SectName = ({ name }: { name: string }) => (
  <div className='text-3xl font-medium mb-3'>{name}</div>
)

const Technology = ({ name, icon }: { name: string; icon: ReactElement }) => (
  <div className='flex items-center mb-2'>
    <div className='flex items-center text-3xl mr-5 text-gray-900'>{icon}</div>
    <div className='text-2xl'>{name}</div>
  </div>
)

const TechnologyCurved = ({
  name,
  icon,
}: {
  name: string
  icon: ReactElement
}) => (
  <div className='flex items-center mb-2'>
    <div className='flex items-center text-3xl mr-5 text-gray-900'>{icon}</div>
    <svg viewBox='0 -800 600 800' style={{ marginTop: -265 }}>
      <path
        id='curve'
        fill='transparent'
        d='M 0 0 L 320 0 Q 500 0 530 -180 Q 540 -230 570 -790'
      />
      <text width='500' style={{ fontSize: 67 }}>
        <textPath fill='rgba(249, 250, 251)' xlinkHref='#curve'>
          {name}
        </textPath>
      </text>
    </svg>
  </div>
)

export default function Stack() {
  return (
    <div style={{ width: 400, marginRight: -40 }}>
      <div>
        <SectName name='Stack:' />
        <div className='flex flex-col'>
          {technologies.map(e => (
            <Technology key={e.name} name={e.name} icon={e.icon} />
          ))}
        </div>
      </div>
      <div className='mt-3'>
        <SectName name='CI/CD:' />
        <TechnologyCurved
          name='GitHub Actions + Docker + Heroku'
          icon={
            <>
              <VscGithubAction />
              <IoIosArrowRoundForward
                className='text-gray-900'
                style={{ fontSize: 40 }}
              />
              <SiDocker />
              <IoIosArrowRoundForward
                className='text-gray-900'
                style={{ fontSize: 40 }}
              />
              <SiHeroku />
            </>
          }
        />
      </div>
    </div>
  )
}
