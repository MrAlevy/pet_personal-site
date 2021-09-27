import { useState, useEffect } from 'react'
import Skull from '../_UI/Skull'
import Image from 'next/image'
import ava from '../../public/personal/avatar.jpg'
import Stack from '../_UI/Stack'
import { AnimationProps, motion, useAnimation, Variants } from 'framer-motion'
import { IoIosArrowDropright } from 'react-icons/io'

export default function AppChrome({
  isSkeletonMode,
  toggleSkeletonMode,
}: {
  isSkeletonMode: boolean
  toggleSkeletonMode: () => void
}) {
  const controls = useAnimation()
  const controls2 = useAnimation()
  const controlsGoToText = useAnimation()
  const controlsArrowIcon = useAnimation()
  const controlsHeader = useAnimation()
  const [isFirstView, toggleIsFirstView] = useState(true)
  const [goToText, setGoToText] = useState('Go to About')
  const [pageHeader, setPageHeader] = useState('Me')

  useEffect(() => {
    controlsHeader.start('animateShow')
  }, [pageHeader])

  const Content = ({ text }: { text: string }) => (
    <div className='text-2xl' style={{ paddingTop: 100 }}>
      {text}
    </div>
  )

  const barsVariant = {
    animateHide: { transition: { staggerChildren: 0.05 } },
    animateShow: { transition: { staggerChildren: 0.08 } },
  }

  const barVariant: Variants = {
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
              variants={barsVariant}
            >
              <motion.span className='text-red-700' variants={barVariant}>
                {pageHeader.slice(0, 1)}
              </motion.span>
              {pageHeader
                .slice(1)
                .split('')
                .map((char, i) => (
                  <motion.span
                    key={i}
                    className='text-gray-800'
                    variants={barVariant}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.div>

            {/* <motion.div animate={controlsHeader}>
              <span className='text-red-700'>{pageHeader.slice(0, 1)}</span>
              <span className='text-gray-800'>{pageHeader.slice(1)}</span>
            </motion.div> */}
          </div>
        </div>
        <button
          className='h-full flex items-center text-3xl
          border-l-2 border-black
          bg-purple-500
          hover:bg-yellow-300
          '
          onClick={async () => {
            controls.start(() => ({
              transition: { delay: 0, duration: 0.5, ease: 'easeIn' },
              rotateY: isFirstView ? 90 : 0,
            }))
            controls2.start(() => ({
              transition: { delay: 0, duration: 0.5, ease: 'easeIn' },
              rotateY: isFirstView ? 0 : 90,
            }))

            //   () => ({
            //   transition: { duration: 0.8, ease: 'easeInOut' },
            //   rotateX: [0, 90, 0],
            // }))
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
            setPageHeader(isFirstView ? 'About site' : 'It is me')
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
        animate={controls}
        style={{
          padding: '0 50px 30px 50px',
          transformOrigin: 0,
        }}
      >
        <div className='flex'>
          <div className='flex flex-col'>
            <Content
              text='
              I am Alexander, a fullstack web developer. For verbose info about
              me visit my LinkedIn profile (you can find a link in the footer
              below).
            '
            />
            <div
              style={{
                width: 300,
                minWidth: 300,
                // border: '2px solid red',
                marginRight: 30,
              }}
            >
              <Image src={ava} alt='my photo' loading='eager' />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className='absolute h-full w-full flex flex-col bg-gray-600 text-gray-50'
        initial={{ rotateY: 90 }}
        animate={controls2}
        style={{
          top: 0,
          padding: '0 50px 30px 50px',
          transformOrigin: '100%',
        }}
      >
        <Content
          text='
                 This project is built on Next.js, entirely in Typescript. As a main
                 focus here I used Three.js (three/fiber) with its accompanying
                 libraries for the 3D laptop as well as a native 2D HTML canvas for the
                 greeting words. It also has a fully responsive design. You can try
                 switching the filled to stroked view from this page, changing the
                 greeting on the VS Code page, or just relaxing and watching a video.
                 Hope you will enjoy. P.S. If you are interested in my coding style,
                 check out the source code of this page on GitHub (see footer).
        '
        />
        <div>
          <Stack />
        </div>
        <Skull
          isSkeletonMode={isSkeletonMode}
          handleClick={toggleSkeletonMode}
        />
      </motion.div>
    </>
  )
}
