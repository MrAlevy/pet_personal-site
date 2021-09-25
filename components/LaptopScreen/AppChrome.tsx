import React from 'react'
import Skull from '../_UI/Skull'
import Image from 'next/image'
import ava from '../../public/personal/ava.jpg'

export default function AppChrome({
  isSkeletonMode,
  toggleSkeletonMode,
}: {
  isSkeletonMode: boolean
  toggleSkeletonMode: () => void
}) {
  return (
    <div
      className='h-full w-full'
      style={{ backgroundColor: '#f2f9fb', padding: '30px 50px' }}
    >
      <div className='flex' style={{ paddingBottom: 30 }}>
        <div
          style={{
            width: 300,
            minWidth: 300,
            // border: '2px solid red',
            marginRight: 30,
          }}
        >
          <Image src={ava} alt='my photo' loading='eager' />
        </div>
        <div className='flex flex-col'>
          <div className='text-6xl'>
            <span className='text-red-600'>M</span>e
          </div>
          <div className='text-2xl'>
            I am Alexander, a fullstack web developer. For verbose info about me
            visit my LinkedIn profile (you can find a link in the footer below).
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='text-6xl'>
          <span className='text-red-600'>A</span>bout
        </div>
        <div className='text-2xl'>
          This project is built on Next.js, entirely in Typescript. As a main
          focus here I used Three.js (three/fiber) with its accompanying
          libraries for the 3D laptop as well as a native 2D HTML canvas for the
          greeting words. You can try switching the filled to stroked view from
          this page, changing the greeting on the VS Code page, or just relaxing
          and watching a video. Hope you will enjoy. P.S. If you are interested
          in my coding style, check out the source code of this page on GitHub
          (see footer).
        </div>
      </div>
      <Skull isSkeletonMode={isSkeletonMode} handleClick={toggleSkeletonMode} />
    </div>
  )
}
