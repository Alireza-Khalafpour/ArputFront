import Dots from "@/components/module/Dots";
import ProductSwiper from "@/components/templates/ProductSwiper";
import Image from "next/image";
import MobileSvg from "../../public/images/InstallMobileApp.svg"
import AppDownloadGif from "../../public/images/DownloadAppGif.gif"
import Partnership from "../../public/images/Partnership.svg"
import shoppingBag from "../../public/images/ShoppingBag.svg"
import { Download, ShoppingCart, VerifiedUser } from "@mui/icons-material";
import Link from "next/link";
import MyCarousel from "@/components/module/MyCarousel";
import BrandSlider from "@/components/module/BrandSlider";
import MySlider from "@/components/templates/MySlider";



export default function Home() {





  return (
      <div className="flex flex-col gap-28 p-8 max-w-[90%] mx-auto " >


        <div className="flex flex-row justify-center items-center w-full gap-4 bg-gradient-to-r from-asliDark to-blue-900 rounded-2xl rounded-tr-[190px] " >

          <div className=" flex flex-col gap-10 text-center items-center w-1/2  ">
            {/* <Image src={MobileSvg} width={300} height={300}  /> */}
            <h1 className="text-5xl font-bold text-white " > با موبایلت توی دنیای واقعی ببینش !!! </h1>
            <h2 className="text-3xl text-white " > اپ آرپوت رو دانلود کن </h2>
            <button className="rounded-full bg-paszamine1 text-khas p-2 w-16 h-16 outline-dashed outline-khas" > <Download className="animate-bounce text-4xl" /> </button>

          </div>

          <div className="flex justify-end items-center w-1/2 rounded-2xl " style={{clipPath:"polygon(0 0, 65% 0, 100% 100%, 0% 100%)"}} >
            <Image src={AppDownloadGif} width={450} height={450} className="rounded-l-2xl"  />
          </div>

        </div>


        <div className="w-full max-h-96 flex justify-center items-center" >
          <MyCarousel/>
        </div>

        <div className="md:hidden flex flex-row justify-center items-center gap-4 w-full bg-paszamine2">
          
          <div className="w-full flex flex-col gap-4 text-center items-center">
            <Image src={MobileSvg} width={300} height={300}  />
            <h2 className="text-3xl" > اپ آرپوت رو دانلود کن </h2>
            <button className="rounded-xl bg-khas text-white p-2 w-[40%]" > <Download className="animate-bounce" /> </button>
          </div>
          
          {/* <div className="w-1/2" >
            <Dots/>
          </div> */}
        </div>


        {/* <div className="flex flex-col gap-12 justify-center w-full items-center" > */}
        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-4" ></span>  دسته بندی ها  <span className="h-full w-[2px] border-2 border-khas mx-4" ></span> </div>


        <div>
          <MySlider title="سرامیک" />
        </div>

        <div>
          <MySlider title=" سنگ " />
        </div>

          {/* <div className="w-full " >
            <ProductSwiper title={"کاشی و سرامیک "} />
          </div>

          <div className="w-full " >
            <ProductSwiper title={" سنگ "} />
          </div> */}

        {/* </div> */}

        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <div className="w-1/2 text-center flex flex-col justify-center items-center gap-14" >
            <h2 className="md:text-3xl text-xl" >  همین حالا کالای مورد نظرت رو سفارش بده </h2>
            <Link href="/products"  className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > فروشگاه <ShoppingCart/> </Link>
          </div>
          
          <div className="w-1/2 flex flex-col gap-4 text-center items-center">
            <Image src={shoppingBag} width={400} height={400}  />
            
          </div>
          
        </div>

        <div className="flex flex-row justify-center items-center gap-4 w-full">
          
          <div className="w-1/2 flex flex-col gap-4 text-center items-center">
            <Image src={Partnership} width={400} height={400}  />
            
          </div>
          
          <div className="w-1/2 text-center flex flex-col justify-center items-center gap-14" >
            <h2 className="md:text-3xl text-xl " > کارخانه ها و نمایندگی ها و فروشگاه ها در سراسر ایران می توانند یک قروشگاه داشته باشند </h2>
            <Link href="/signup" className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > ساخت فروشگاه <VerifiedUser/> </Link>
          </div>
        </div>

        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-3" ></span>  همکاری با کارخانه ها و فروشگاه ها  <span className="h-full w-[2px] border-2 border-khas mx-3" ></span> </div>


        <div className="w-full h-max" >

          <BrandSlider/>

        </div>


      </div>

  )
}
