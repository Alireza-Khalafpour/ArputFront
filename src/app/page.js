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
import GoogleArAppModal from "@/components/module/GoogleArAppModal";



export default function Home() {


  return (
      <div className="flex flex-col gap-20 p-8 md:max-w-[90%] w-full mx-auto " >


        <div className="flex flex-row justify-center items-center  w-full gap-4 bg-gradient-to-r from-asliDark to-blue-900 rounded-2xl md:rounded-tr-[190px] rounded-tr-2xl p-6 " >

          <div className=" flex flex-col gap-10 text-center justify-around items-center md:w-1/2 w-full md:h-auto  h-[50vh] ">
            {/* <Image src={MobileSvg} width={300} height={300}  /> */}
            <h1 className="md:text-5xl text-xl font-bold text-white leading-relaxed " > نمایش محصول در محیط واقعی با گوشی همراه !!! </h1>
            <h2 className="md:text-3xl text-xl text-white " > اپ آرپوت رو دانلود کن </h2>
            <GoogleArAppModal/>
          </div>

          <div className="md:flex hidden justify-end items-center w-1/2 rounded-2xl " style={{clipPath:"polygon(0 0, 65% 0, 100% 100%, 0% 100%)"}} >
            <Image src={AppDownloadGif} width={450} height={450} className="rounded-l-2xl"  />
          </div>

        </div>

        <div className="w-full mx-auto text-center">
          <MyCarousel/>
        </div>

        {/* <div className="flex flex-col gap-12 justify-center w-full items-center" > */}
        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-4" ></span>  دسته بندی ها  <span className="h-full w-[2px] border-2 border-khas mx-4" ></span> </div>


        <div className="md:block hidden" >
          <MySlider title=" پرفروش ها " />
        </div>

        <div className="md:block hidden" >
          <MySlider title=" سرامیک " />
        </div>


          <div className="w-full md:hidden block " >
            <ProductSwiper title=" پرفروش ها " />
          </div>

          <div className="w-full md:hidden block " >
            <ProductSwiper title=" سرامیک " />
          </div>


        <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-4 w-full">
          <div className="md:w-1/2 w-full text-center flex flex-col justify-center items-center gap-14" >
            <h2 className="md:text-3xl text-xl" >  همین حالا کالای مورد نظرت رو سفارش بده </h2>
            <Link href="/products"  className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > فروشگاه <ShoppingCart/> </Link>
          </div>
          
          <div className="md:w-1/2 w-full flex flex-col gap-4 text-center items-center">
            <Image src={shoppingBag} width={400} height={400}  />
          </div>
          
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center gap-4 w-full">
          
          <div className="md:w-1/2 w-full flex flex-col gap-4 text-center items-center">
            <Image src={Partnership} width={400} height={400}  />
            
          </div>
          
          <div className="md:w-1/2 w-full text-center flex flex-col justify-center items-center gap-14" >
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
