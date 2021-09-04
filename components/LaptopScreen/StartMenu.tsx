import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { AppNames } from '../../utils/constants'
import StartMenuButton from '../_UI/StartMenuButton'

export default function StartMenu({
  activeApp,
  expandedApps,
  openedApps,
  setExpandedApps,
  setActiveApp,
  touchYouTube,
}: {
  activeApp: AppNames
  expandedApps: AppNames[]
  openedApps?: AppNames[]
  setExpandedApps: React.Dispatch<React.SetStateAction<AppNames[]>>
  setActiveApp: React.Dispatch<React.SetStateAction<AppNames>>
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

            if (appName === AppNames.YouTube) touchYouTube()
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
