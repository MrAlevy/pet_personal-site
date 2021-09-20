import type { NextPage } from 'next'
import Head from 'next/head'
import useContext from '../components/Context/useContext'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'
import Footer from '../components/_UI/Footer'

const COLOR_LAPTOP_OPENED = '#e8d197'
const COLOR_LAPTOP_CLOSED = '#35004b'
const COLOR_BLINK = '#7000a0'

const Home: NextPage = () => {
  const {
    context: { isLaptopOpened, isBlinking },
  } = useContext()

  return (
    <div className='h-screen w-screen'>
      <Head>
        <title>Alex Vygodchikov</title>
        <meta
          name='description'
          content='Alexander Vygodchikov personal page'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <div
        className={`w-full h-full`}
        style={{
          backgroundColor: isLaptopOpened
            ? COLOR_LAPTOP_OPENED
            : COLOR_LAPTOP_CLOSED,
          backgroundImage:
            isBlinking && !isLaptopOpened
              ? `radial-gradient(farthest-side at 50% 80px,${COLOR_BLINK} 0%, ${COLOR_LAPTOP_CLOSED} 100%)`
              : '',
        }}
      >
        <Scene2d />
        {/* {
          <div
            style={{
              color: 'rgb(195 53 255)',
              font: `bold 27px Verdana`,
              position: 'absolute',
              top: '150px',
              fontSize: '78px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            hello there!
          </div>
        } */}
        <Scene3d />
        <Footer />
      </div>
    </div>
  )
}

export default Home
