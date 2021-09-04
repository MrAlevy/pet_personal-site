import { useState } from 'react'
import { AppNames } from '../../utils/constants'
import Chrome from './Apps/Chrome'
import VSCode from './Apps/VSCode'
import YouTube from './Apps/YouTube'
import AppWindow from './AppWindow'
import StartMenu from './StartMenu'
import { useSpring, animated } from 'react-spring'
import { motion } from 'framer-motion'

//TODO: make spring from core package - remove react-spring
export default function LaptopScreen({ open }: { open: boolean }) {
  const [expandedApps, setExpandedApps] = useState([AppNames.Chrome])
  const [activeApp, setActiveApp] = useState(AppNames.Chrome)
  const [youTubeTouched, setYouTubeTouched] = useState(false)

  const openedApps = [AppNames.Chrome, AppNames.VSCode, AppNames.YouTube]
  const appsContent = [
    {
      name: AppNames.Chrome,
      content: <Chrome />,
    },
    {
      name: AppNames.VSCode,
      content: <VSCode />,
    },
    {
      name: AppNames.YouTube,
      content: (expandedApps.includes(AppNames.YouTube) || youTubeTouched) && (
        <YouTube />
      ),
    },
  ]

  const opacityAnimated = useSpring({
    to: { opacity: open ? 1 : 0 },
    from: { opacity: open ? 0 : 1 },
    delay: 700,
    config: { duration: 500 },
  })

  const opacityAnimated1 = useSpring({
    to: { opacity: open ? 0 : 1 },
    from: { opacity: open ? 1 : 0 },
    delay: 700,
    config: { duration: 300 },
  })

  return (
    <>
      {/* <animated.div
        style={opacityAnimated1}
        className='absolute w-full h-full bg-gray-900'
      ></animated.div> */}
      <motion.div
        initial={{ opacity: open ? 0 : 1 }}
        animate={{ opacity: open ? [0, 0, 1, 1, 0] : [0, 1] }}
        transition={{
          duration: 0.8,
          times: open ? [0, 0.1, 0.3, 0.8, 1] : [0, 1],
        }}
        className='absolute w-full h-full bg-gray-900'
      ></motion.div>
      <animated.div
        style={opacityAnimated}
        className='h-full w-full overflow-hidden bg-img-desktop bg-cover'
      >
        <div className='w-full' style={{ height: '95%' }}>
          {appsContent.map(
            (app, i) =>
              openedApps.includes(app.name) && (
                <AppWindow
                  key={app.name}
                  active={activeApp === app.name}
                  expanded={expandedApps.includes(app.name)}
                  index={i}
                >
                  {app.content}
                </AppWindow>
              )
          )}
        </div>

        <StartMenu
          activeApp={activeApp}
          expandedApps={expandedApps}
          openedApps={openedApps}
          setActiveApp={setActiveApp}
          setExpandedApps={setExpandedApps}
          touchYouTube={() => setYouTubeTouched(true)}
        />
      </animated.div>
    </>
  )
}
