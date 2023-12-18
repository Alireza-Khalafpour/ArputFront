'use client'

import Dots from "@/components/module/Dots";
import Example from "@/components/module/carousel";
import ProductSwiper from "@/components/templates/ProductSwiper";


export default function Home() {

  return (
    <main>

      <div className="flex flex-col gap-8 p-8 " >

        <div>
          <Example/>
        </div>

        <div>
          <Dots/>
        </div>

        <div className="flex flex-col gap-12 justify-center items-center" >

          <div className="w-full " >
            <ProductSwiper title={"کاشی و سرامیک "} />
          </div>

          <div className="w-full " >
            <ProductSwiper title={" سنگ "} />
          </div>

        </div>


      </div>


    </main>
  )
}
