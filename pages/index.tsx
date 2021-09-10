import type { NextPage } from 'next'
import Head from 'next/head'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'
import React from 'react'

const Home: NextPage = () => {
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
          backgroundColor: 'darkviolet',
        }}
      >
        <Scene2d />
        {/* <div
          style={{
            color: 'blue',
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
      </div>

      <footer
        className='absolute bottom-0 h-12 w-full
        flex justify-center align-middle '
      >
        <div
          className='flex justify-center w-3/5 align-middle
          border-t border-gray-50 border-opacity-25'
        >
          <div className='opacity-60'>Alexander Vygodchikov</div>
        </div>
      </footer>
    </div>
  )
}

export default Home
