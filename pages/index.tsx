import type { NextPage } from 'next'
import Head from 'next/head'
import Scene2d from '../components/Scene2d/Scene2d'
import Scene3d from '../components/Scene3d/Scene3d'

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
          backgroundColor: 'blueviolet',
        }}
      >
        <Scene2d />
        <Scene3d />
      </div>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
