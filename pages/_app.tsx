import type { AppProps } from 'next/app'
import { ContextProvider } from '../components/Context/Context'
import '../styles/globals.css'
import Bowser from 'bowser'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const isValidBrowser = Bowser.getParser(
      window.navigator.userAgent
    ).satisfies({ chrome: '>90' })

    if (!isValidBrowser)
      alert(
        '\n\nWrong browser detected!\n\nCurrently full operation is guaranteed only in the Chrome browser version older than 90.\n\nSorry for inconvenience.'
      )
  }, [])

  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
export default MyApp
