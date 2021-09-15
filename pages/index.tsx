import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'
import useContext from '../components/Context/useContext'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'
import Footer from '../components/_UI/Footer'

const COLOR_LAPTOP_OPENED = '#e8d197'
const COLOR_LAPTOP_CLOSED = '#35004b'
const COLOR_BLINK = '#520075'

const Home: NextPage = () => {
  const {
    context: { isLaptopOpened, isBlinking },
  } = useContext()

  return (
    <div className='h-screen w-screen'>
      <Head>
        <title>Personal Page</title>
        <meta
          name='description'
          content='Alexander Vygodchikov personal page'
        />
        <link rel='icon' href='/favicon.ico' /> {/**TODO: favicon */}
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
        {/* <div
          style={{
            color: '#230031',
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
        </div> */}
        <Scene3d />
        <Footer />
      </div>
    </div>
  )
}

export default Home
