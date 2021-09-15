import dayjs from 'dayjs'
import { FaLinkedin } from 'react-icons/fa'
import { GoMarkGithub } from 'react-icons/go'
import { IoMail } from 'react-icons/io5'
import useContext from '../Context/useContext'
import { LINKS, PERSONAL } from '../source'

const LinkTag = ({
  title,
  link,
  icon,
  isFirst,
}: {
  title: string
  link: string
  icon: JSX.Element
  isFirst: boolean
}) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className={`flex items-center ml-0 hover:opacity-70 ${
        !isFirst && 'md:ml-6'
      }`}
    >
      <div className='mr-2'>{icon}</div>
      {title}
    </a>
  )
}

const tags = [
  {
    title: 'linkedin',
    link: LINKS.LINKEDIN,
    icon: <FaLinkedin />,
  },
  {
    title: 'github',
    link: LINKS.GITHUB,
    icon: <GoMarkGithub />,
  },
  {
    title: LINKS.EMAIL,
    link: `mailto: ${LINKS.EMAIL}`,
    icon: <IoMail />,
  },
]

const year = dayjs().get('year')

export default function Footer() {
  const {
    context: { isLaptopOpened },
  } = useContext()

  return (
    <footer
      className={`absolute bottom-0 w-full
      flex justify-center items-center
      select-none
      ${isLaptopOpened ? 'text-gray-500' : 'text-purple-300'}
      `}
    >
      <div
        className={`flex flex-wrap justify-between items-center w-3/5 px-4 py-3
        border-t border-opacity-25
        hover:opacity-80
        ${
          isLaptopOpened
            ? 'border-purple-900 opacity-60'
            : 'border-purple-300 opacity-40'
        }
        `}
        style={{ transition: '0.1s all ease-in-out' }}
      >
        <div className='mb-2 md:mb-0'>
          © 2021{year !== 2021 && `-${year}`}
          {` ${PERSONAL.NAME} ${PERSONAL.SURNAME}`}
        </div>
        <div className='flex flex-col overflow-hidden md:flex-row'>
          {tags.map((e, i) => (
            <LinkTag
              key={e.title}
              title={e.title}
              link={e.link}
              icon={e.icon}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
