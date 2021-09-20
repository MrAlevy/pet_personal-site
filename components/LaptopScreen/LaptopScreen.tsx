import { motion } from 'framer-motion'
import { useState } from 'react'
import { AppNames } from '../../utils/constants'
import Chrome from './Apps/Chrome'
import VSCode from './Apps/VSCode'
import YouTube from './Apps/YouTube'
import AppWindow from './AppWindow'
import StartMenu from './StartMenu'

export default function LaptopScreen({
  isLaptopOpened,
  setLaptopHovered,
  closeLaptop,
}: {
  isLaptopOpened: boolean
  setLaptopHovered: React.Dispatch<React.SetStateAction<boolean>>
  closeLaptop: () => void
}) {
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
