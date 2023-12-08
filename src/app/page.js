'use client'

import Example from "@/components/module/carousel";
import ProductSwiper from "@/components/templates/ProductSwiper";


export default function Home() {

  return (
    <main>

      <div className="flex flex-col gap-8 p-8" >

        <div>
          <Example/>
        </div>

        <div className="w-[80%] h-[5vh] " >
          <ProductSwiper/>
        </div>

      </div>


    </main>
  )
}
