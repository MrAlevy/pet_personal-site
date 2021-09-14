import dayjs from 'dayjs'
import { FaLinkedin } from 'react-icons/fa'
import { GoMarkGithub } from 'react-icons/go'
import { IoMail } from 'react-icons/io5'
import { LINKS, PERSONAL } from '../source'

const LinkTag = ({
  title,
  link,
  icon,
}: {
  title: string
  link: string
  icon: JSX.Element
}) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className={`flex items-center ml-0 hover:opacity-70 sm:ml-6`}
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
  return (
    <footer
      className='absolute bottom-0 w-full
      flex justify-center items-center
      text-purple-300
      select-none
      '
    >
      <div
        className='flex flex-wrap justify-between items-center w-3/5 px-4 py-3
        border-t border-gray-50 border-opacity-25
        opacity-40
        hover:opacity-90
        '
        style={{ transition: '0.1s all ease-in-out' }}
      >
        <div className='mb-2 sm:mb-0'>
          © 2021{year !== 2021 && `-${year}`}
          {` ${PERSONAL.NAME} ${PERSONAL.SURNAME}`}
        </div>
        <div className='flex flex-wrap flex-col overflow-hidden sm:flex-row'>
          {tags.map(e => (
            <LinkTag
              key={e.title}
              title={e.title}
              link={e.link}
              icon={e.icon}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
