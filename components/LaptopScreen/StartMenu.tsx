import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { APP_NAMES } from '../../config'
import StartMenuButton from '../_UI/StartMenuButton'

export default function StartMenu({
  activeApp,
  expandedApps,
  openedApps,
  setExpandedApps,
  setActiveApp,
  setLaptopHovered,
  closeLaptop,
  touchYouTube,
}: {
  activeApp: APP_NAMES
  expandedApps: APP_NAMES[]
  openedApps?: APP_NAMES[]
  setExpandedApps: React.Dispatch<React.SetStateAction<APP_NAMES[]>>
  setActiveApp: React.Dispatch<React.SetStateAction<APP_NAMES>>
  setLaptopHovered: React.Dispatch<React.SetStateAction<boolean>>
  closeLaptop: () => void
  touchYouTube: () => void
}) {
  const getClockValue = () => dayjs().format('HH:MM:ss/DD.MM.YYYY')
  const [clockValue, setClockValue] = useState(getClockValue())

  useEffect(() => {
    const updateClockInterval = setInterval(() => {
      setClockValue(() => getClockValue())
    }, 1000)
    return () => clearInterval(updateClockInterval)
  }, [])

  return (
    <div
      className='flex bg-gray-800 bg-100% bg-img-start-menu'
      style={{
        height: '5%',
        paddingLeft: 142,
      }}
    >
      <StartMenuButton
        key='start'
        style={{ border: 'none', marginLeft: -138, marginRight: 98 }}
        active={false}
        onMouseEnter={() => setLaptopHovered(true)}
        onMouseLeave={() => setLaptopHovered(false)}
        onClick={() => closeLaptop()}
      />

      {openedApps?.map(appName => (
        <StartMenuButton
          key={appName}
          style={{ marginLeft: 8 }}
          active={activeApp === appName}
          onClick={() => {
            if (activeApp === appName) {
              setExpandedApps(expandedApps.slice(0, expandedApps.length - 1))
              setActiveApp(expandedApps[expandedApps.length - 2])
            } else {
              setExpandedApps([
                ...expandedApps.filter(e => e !== appName),
                appName,
              ])
              setActiveApp(appName)
            }

            if (appName === APP_NAMES.YouTube) touchYouTube()
          }}
        />
      ))}

      <div
        className='
          flex flex-col items-center right-0 absolute 
          text-gray-300 select-none'
        style={{
          fontSize: 12,
          marginRight: 55,
          lineHeight: '16px',
          filter: 'blur(0.4px)',
        }}
      >
        {clockValue.split('/').map(e => (
          <div key={e}>{e}</div>
        ))}
      </div>
    </div>
  )
}
