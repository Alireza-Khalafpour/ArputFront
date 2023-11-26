import Carousel from "@/components/module/Carousel";
import ProductSwiper from "@/components/templates/ProductSwiper";


export default function Home() {

  return (
    <main>

      <div className="flex flex-col gap-8 p-8" >


        {/* <div className="w-[75%] h-[5vh] my-40 " >
          <Carousel  />
        </div> */}
        <div className="w-[75%] h-[5vh] " >
          <ProductSwiper/>
        </div>

      </div>


    </main>
  )
}
