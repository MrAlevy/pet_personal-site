import {
  SiNextDotJs,
  SiReact,
  SiTypescript,
  SiFramer,
  SiTailwindcss,
  SiDocker,
  SiHeroku,
} from 'react-icons/si'
import { IoTriangleOutline } from 'react-icons/io5'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { VscGithubAction } from 'react-icons/vsc'
import { ReactElement } from 'react'

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
  <div className='text-3xl font-medium  '>{name}</div>
)

const Technology = ({ name, icon }: { name: string; icon: ReactElement }) => (
  <div className='flex items-center'>
    <div className='flex items-center text-3xl mr-5 text-gray-900'>{icon}</div>
    <div className='text-2xl'>{name}</div>
  </div>
)

export default function Stack() {
  return (
    <div>
      <div>
        <SectName name='Stack: ' />
        <div className='flex flex-col'>
          {technologies.map(e => (
            <Technology key={e.name} name={e.name} icon={e.icon} />
          ))}
        </div>
      </div>
      <div>
        <SectName name='CI/CD: ' />
        <Technology
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
