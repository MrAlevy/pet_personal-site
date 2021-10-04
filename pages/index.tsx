import fs from 'fs'
import type { NextPage } from 'next'
import Head from 'next/head'
import useContext from '../components/Context/useContext'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'
import Footer from '../components/_UI/Footer'

const Document: NextPage<{ wordsArray: string[] }> = ({ wordsArray }) => {
  const {
    context: { isLaptopOpened, isBlinking },
  } = useContext()

  return (
    <div className='h-screen w-screen'>
      <Head>
        <title>Alex Vygodchikov</title>
        <meta
          name='description'
          content='Alexander Vygodchikov - fullstack web developer'
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
        <link rel='icon' type='image/x-icon' href='favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' />
        {/* eslint-disable-next-line */}
        <link
          href='https://fonts.googleapis.com/css?family=Fira+Code'
          rel='stylesheet'
        />
      </Head>

      <div
        className={`w-full h-full
      ${isLaptopOpened ? 'main-laptop-opened' : 'main-laptop-closed'}
      ${isBlinking && 'main-laptop-blinking'}
      `}
      >
        <Scene2d />
        <Scene3d wordsArray={wordsArray} />
        <Footer />
      </div>
    </div>
  )
}

export default Document

export async function getStaticProps() {
  // Make array of words from source code for the FlyingWords component
  const file1 = fs.readFileSync('components/Scene2d/Scene2d.tsx')
  const file2 = fs.readFileSync('components/Scene3d/Scene3d.tsx')
  const wordsArray = (file1.toString() + file2.toString())
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .split(' ')
    .filter(e => e.length > 3)
  return {
    props: { wordsArray },
  }
}
