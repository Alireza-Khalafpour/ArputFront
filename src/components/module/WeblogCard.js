import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WeblogCard({art}) {
  return (
    <Link href={`weblog/${art?.id}`} className='md:w-1/5 w-full min-h-80 flex flex-col justify-between items-center rounded-xl bg-gray-300 p-4 hover:cursor-pointer hover:scale-105 transition-all duration-150 ' >
        <Image alt='photo' />
        <h2 className='text-right w-full' >
            {art?.main_title}
        </h2>
        <div className='w-full flex flex-row justify-around items-center' >
            <h4 className='w-1/2' > 1403/05/22 </h4>
            <span className='w-1/2 px-3 py-1 bg-khas text-white text-center m-auto rounded-xl ' > خواندن مقاله </span>
        </div>
    </Link>
  )
}

export default WeblogCard