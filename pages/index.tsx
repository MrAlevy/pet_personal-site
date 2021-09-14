import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'
import useContext from '../components/Context/useContext'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'
import Footer from '../components/_UI/Footer'

const Home: NextPage = () => {
  const context = useContext()

  return (
    <div className='h-screen w-screen'>
      <Head>
        <title>Personal Page</title>
        <meta
          name='description'
          content='Alexander Vygodchikov personal page'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className='w-full h-full'
        style={{
          backgroundColor: context.context.isLaptopOpened
            ? 'rgb(215 120 255)'
            : 'rgba(53,0,75,1)',
          backgroundImage:
            context.context.isBlinking && !context.context.isLaptopOpened
              ? 'radial-gradient(farthest-side at 50% 80px,#520075 0%, rgb(53,0,75) 100%)'
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
