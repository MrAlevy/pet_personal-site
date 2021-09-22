import { motion } from 'framer-motion'
import { useState } from 'react'
import { APP_NAMES } from '../../config'
import Chrome from './Apps/Chrome'
import VSCode from './Apps/VSCode'
import YouTube from './Apps/YouTube'
import AppWindow from './AppWindow'
import StartMenu from './StartMenu'

export default function LaptopScreen({
  isLaptopOpened,
  isSkeletonMode,
  setLaptopHovered,
  closeLaptop,
  toggleSkeletonMode,
}: {
  isLaptopOpened: boolean
  isSkeletonMode: boolean
  setLaptopHovered: React.Dispatch<React.SetStateAction<boolean>>
  closeLaptop: () => void
  toggleSkeletonMode: () => void
}) {
  const [expandedApps, setExpandedApps] = useState([APP_NAMES.Chrome])
  const [activeApp, setActiveApp] = useState(APP_NAMES.Chrome)
  const [youTubeTouched, setYouTubeTouched] = useState(false)

  const openedApps = [APP_NAMES.Chrome, APP_NAMES.VSCode, APP_NAMES.YouTube]
  const appsContent = [
    {
      name: APP_NAMES.Chrome,
      content: <Chrome />,
    },
    {
      name: APP_NAMES.VSCode,
      content: <VSCode />,
    },
    {
      name: APP_NAMES.YouTube,
      content: (expandedApps.includes(APP_NAMES.YouTube) || youTubeTouched) && (
        <YouTube />
      ),
    },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: isLaptopOpened ? 0 : 1 }}
        animate={{ opacity: isLaptopOpened ? [0, 0, 1, 1, 0] : [0, 1] }}
        transition={{
          duration: 0.8,
          times: isLaptopOpened ? [0, 0.1, 0.3, 0.8, 1] : [0, 1],
        }}
        className='absolute w-full h-full bg-gray-900'
      />
      <motion.div
        initial={{ opacity: isLaptopOpened ? 0 : 1 }}
        animate={{ opacity: isLaptopOpened ? 1 : 0 }}
        transition={{
          delay: 0.7,
          duration: 0.5,
        }}
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
          setLaptopHovered={setLaptopHovered}
          closeLaptop={closeLaptop}
          touchYouTube={() => setYouTubeTouched(true)}
        />
      </motion.div>
    </>
  )
}
