import dayjs from 'dayjs'
import { motion, useAnimation, Variants } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosArrowDropright } from 'react-icons/io'
import ava from '../../public/personal/avatar.jpg'
import Skull from '../_UI/Skull'
import Stack from '../_UI/Stack'
import TextContent from '../_UI/TextContent'

export default function AppChrome({
  isSkeletonMode,
  toggleSkeletonMode,
}: {
  isSkeletonMode: boolean
  toggleSkeletonMode: () => void
}) {
  const controlsPage1 = useAnimation()
  const controlsPage2 = useAnimation()
  const controlsGoToText = useAnimation()
  const controlsArrowIcon = useAnimation()
  const controlsHeader = useAnimation()
  const [isFirstView, toggleIsFirstView] = useState(true)
  const [goToText, setGoToText] = useState('Go to About')
  const [pageHeader, setPageHeader] = useState('')

  useEffect(() => {
    setTimeout(() => setPageHeader('It is me'), 1500)
  }, [])

  useEffect(() => {
    controlsHeader.start('animateShow')
  }, [pageHeader, controlsHeader])

  const lettersVariant: Variants = {
    animateHide: {
      transition: { staggerDirection: -1, staggerChildren: 0.04 },
    },
    animateShow: { transition: { staggerChildren: 0.06 } },
  }

  const letterVariant: Variants = {
    initial: { opacity: 0 },
    animateHide: {
      opacity: 0,
      transition: { duration: 0.1, ease: 'anticipate' },
    },
    animateShow: {
      opacity: 1,
      transition: { duration: 0.15, ease: 'anticipate' },
    },
  }

  return (
    <>
      <div
        className='absolute w-full flex justify-end items-center z-50 border-b-2 border-black'
        style={{ top: 0, height: 70 }}
      >
        <div className='h-full w-full flex items-center bg-green-500'>
          <div
            className='h-full flex items-center text-6xl'
            style={{ marginLeft: 70 }}
          >
            <motion.div
              animate={controlsHeader}
              initial='initial'
              variants={lettersVariant}
            >
              <motion.span className='text-red-700' variants={letterVariant}>
                {pageHeader.slice(0, 1)}
              </motion.span>
              {pageHeader
                .slice(1)
                .split('')
                .map((char, i) => (
                  <motion.span
                    key={i}
                    className='text-gray-800'
                    variants={letterVariant}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.div>
          </div>
        </div>
        <button
          className='h-full flex items-center text-3xl
          border-l-2 border-black
          bg-purple-500
          hover:bg-yellow-300
          '
          onClick={async () => {
            controlsPage1.start(() => ({
              transition: { delay: 0, duration: 0.5, ease: 'easeIn' },
              rotateY: isFirstView ? 90 : 0,
            }))
            controlsPage2.start(() => ({
              transition: { delay: 0, duration: 0.5, ease: 'easeIn' },
              rotateY: isFirstView ? 0 : 90,
            }))
            controlsGoToText.start(() => ({
              transition: { duration: 0.8, ease: 'linear' },
              rotateX: [0, 90, 90, 0],
              marginLeft: !isFirstView ? '40px' : '90px',
            }))
            controlsArrowIcon.start(() => ({
              transition: { duration: 0.8, ease: 'backInOut' },
              rotateZ: !isFirstView ? 0 : 180,
              right: !isFirstView ? 0 : 200,
            }))

            toggleIsFirstView(!isFirstView)

            setTimeout(() => {
              setGoToText(!isFirstView ? 'Go to About' : 'Return to Me')
            }, 400)

            await controlsHeader.start('animateHide')

            setPageHeader(isFirstView ? 'About the site' : 'It is me')
          }}
          style={{ width: '300px', minWidth: '300px' }}
        >
          <motion.div animate={controlsGoToText} style={{ marginLeft: 40 }}>
            {goToText}
          </motion.div>
          <motion.div
            className='absolute'
            animate={controlsArrowIcon}
            style={{
              right: 0,
              marginRight: 30,
            }}
          >
            <IoIosArrowDropright style={{ fontSize: 60, width: 40 }} />
          </motion.div>
        </button>
      </div>

      <motion.div
        className='h-full w-full bg-gray-50 text-gray-800'
        animate={controlsPage1}
        style={{
          padding: '100px 50px 30px 50px',
          transformOrigin: 0,
        }}
      >
        <div className='flex flex-col'>
          <TextContent>I am Alexander, a fullstack web developer.</TextContent>
          <div className='flex my-8'>
            <div
              className='mr-5'
              style={{
                width: 300,
                minWidth: 300,
              }}
            >
              <Image
                className='avatar'
                src={ava}
                alt='my photo'
                loading='eager'
                unoptimized={true}
              />
            </div>
            <div>
              <TextContent>
                {`I am ${dayjs().diff(
                  dayjs('1991-06-22'),
                  'y'
                )}-years-old and I currently live in Saint Petersburg, Russia. \n
              `}
                I really love programming and everything related to it. I am
                inspired by what I do, whether it is a regular routine job or
                pet-projects and experiments. I am constantly learning something
                new, improving my current knowledge, reviewing the best
                practices.
              </TextContent>
            </div>
          </div>

          <TextContent>
            For more information about me, such as what technologies I use or
            what experience I have, please, visit my LinkedIn profile (you can
            find the link in the footer below).
          </TextContent>
        </div>
      </motion.div>

      <motion.div
        className='absolute h-full w-full flex justify-between bg-gray-600 text-gray-50'
        initial={{ rotateY: 90 }}
        animate={controlsPage2}
        style={{
          top: 0,
          padding: '100px 50px 30px 50px',
          transformOrigin: '100%',
        }}
      >
        <div style={{ width: 600 }}>
          <TextContent>
            This project is built on Next.js, entirely in TypeScript.
            {`\n\n`}
            As a main focus here I used Three.js (three/fiber) with its
            accompanying libraries for the 3D laptop as well as a native 2D HTML
            canvas for the greeting words.
            {`\n\n`}
            It also has a fully responsive design.
            {`\n\n`}
            You can try to switch filled view on stroked from this page, change
            the greeting on the VS Code page, or just relax and watch a video on
            the YouTube page. Click on the start menu to close the laptop. Hope
            you will enjoy.
            {`\n\n`}
            P.S. If you are interested in my coding style, check out the source
            code of this page on GitHub (see footer).
          </TextContent>
        </div>
        <div className='border-gray-500 border-l-2' style={{ height: '95%' }} />
        <Stack />
        <Skull
          isSkeletonMode={isSkeletonMode}
          handleClick={toggleSkeletonMode}
        />
      </motion.div>
    </>
  )
}
