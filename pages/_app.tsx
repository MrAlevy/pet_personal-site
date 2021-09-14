import type { AppProps } from 'next/app'
import { ContextProvider } from '../components/Context/Context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
export default MyApp
