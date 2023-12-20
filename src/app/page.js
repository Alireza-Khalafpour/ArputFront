import Dots from "@/components/module/Dots";
import Example from "@/components/module/carousel";
import ProductSwiper from "@/components/templates/ProductSwiper";
import Image from "next/image";
import MobileSvg from "../../public/images/InstallMobileApp.svg"
import Partnership from "../../public/images/Partnership.svg"
import shoppingBag from "../../public/images/ShoppingBag.svg"
import { ShoppingCart, VerifiedUser } from "@mui/icons-material";


export default function Home() {

  return (
      <div className="flex flex-col gap-28 p-8 " >

        <div className="w-full max-h-96 flex justify-center items-center" >
          <Example/>
        </div>

        <div className="flex flex-row justify-center items-center gap-4 w-full">
          
          <div className="w-1/2 flex flex-col gap-4 text-center items-center">
            <Image src={MobileSvg} width={400} height={400}  />
            <h2 className="text-3xl" > اپ آرپوت رو دانلود کن </h2>
          </div>
          
          <div className="w-1/2" >
            <Dots/>
          </div>
        </div>

        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas" ></span>  دسته بندی ها  <span className="h-full w-[2px] border-2 border-khas" ></span> </div>

        <div className="flex flex-col gap-12 justify-center w-[90%] mx-auto items-center" >

          <div className="w-full " >
            <ProductSwiper title={"کاشی و سرامیک "} />
          </div>

          <div className="w-full " >
            <ProductSwiper title={" سنگ "} />
          </div>

        </div>

        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <div className="w-1/2 text-center flex flex-col justify-center items-center gap-5" >
            <h2 className="text-3xl" >  همین حالا کالای مورد نظرت رو سفارش بده </h2>
            <button className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > فروشگاه <ShoppingCart/> </button>
          </div>
          
          <div className="w-1/2 flex flex-col gap-4 text-center items-center">
            <Image src={shoppingBag} width={400} height={400}  />
            
          </div>
          
        </div>

        <div className="flex flex-row justify-center items-center gap-4 w-full">
          
          <div className="w-1/2 flex flex-col gap-4 text-center items-center">
            <Image src={Partnership} width={400} height={400}  />
            
          </div>
          
          <div className="w-1/2 text-center flex flex-col justify-center items-center gap-5" >
            <h2 className="text-3xl" > کارخانه ها و نمایندگی ها و فروشگاه ها در سراسر ایران می توانند یک قروشگاه داشته باشند </h2>
            <button className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > ساخت فروشگاه <VerifiedUser/> </button>
          </div>
        </div>


      </div>

  )
}
