import Dots from "@/components/module/Dots";
import ProductSwiper from "@/components/templates/ProductSwiper";
import Image from "next/image";
import Partnership from "../../public/images/Partnership.svg"
import shoppingBag from "../../public/images/ShoppingBag.svg"
import Discount from "../../public/images/Discount.gif"
import { ShoppingCart, VerifiedUser } from "@mui/icons-material";
import Link from "next/link";
import MyCarousel from "@/components/module/MyCarousel";
import BrandSlider from "@/components/module/BrandSlider";
import MySlider from "@/components/templates/MySlider";
import GoogleArAppModal from "@/components/module/GoogleArAppModal";
import { Box, Button, Divider, IconButton, Sheet, Typography } from "@mui/joy";
import BackgroundVideo from "@/components/templates/BackgroundVideo";
import TimerCountDown from "@/components/templates/TimerCountDown";



export default function Home() {


  return (
      <div className="flex flex-col gap-20 p-8 md:max-w-[90%] w-full mx-auto " >

        <div className="flex md:flex-row flex-col justify-center items-center w-full md:gap-2 gap-10 rounded-3xl p-1 bg-[#ef3d52df]" >

          <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-10 justify-center items-center" >
            <Image src={Discount} width={260} height={260} className="rounded-3xl" />
            <h2 className="text-white font-bold text-3xl text-center" >
               تخفیف ثبت فروشگاه 
               <br/>
               <br/>
               <Link href="/signin" className="cursor-pointer rounded-xl bg-khas !text-base p-3 hover:bg-orange-600 " > همین الان ثبت نام کنید </Link>
            </h2>
          </div>
        
          <div className="md:w-1/2 w-full" >
            <TimerCountDown/>
          </div>

        </div>

        <div className="flex flex-row justify-center items-center relative  w-full max-h-[60vh] gap-4 bg-gradient-to-r from-asliDark to-blue-900 rounded-2xl md:rounded-tr-[190px] rounded-tr-2xl  md:rounded-bl-[190px] rounded-bl-2xl " >

            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-10 rounded-2xl md:rounded-tr-[190px]  rounded-tr-2xl md:rounded-bl-[190px] rounded-bl-2xl " ></div>
            <video src="https://superapp-storage.storage.iran.liara.space/video/1.mp4" className="object-cover w-full h-[60vh] rounded-2xl md:rounded-tr-[190px] rounded-tr-2xl  md:rounded-bl-[190px] rounded-bl-2xl " autoPlay loop muted />
          <div className=" flex flex-col gap-10 text-center justify-around items-center w-full max-h-[60vh] absolute top-10 ">
            <h1 className="md:text-4xl text-xl font-bold text-white leading-relaxed " > نمایش محصول در محیط واقعی با گوشی همراه !!! </h1>
            <h2 className="md:text-3xl text-xl text-white " > اپ آرپوت رو دانلود کن </h2>
            <GoogleArAppModal/>
          </div>


          {/* <div className="md:flex hidden justify-end items-center w-1/2 rounded-2xl " style={{clipPath:"polygon(0 0, 65% 0, 100% 100%, 0% 100%)"}} >
            <BackgroundVideo/>
          </div> */}

        </div>

        {/* <div className="w-[35vw]" >
          <Sheet
            variant="solid"
            color="primary"
            invertedColors
            sx={{
              flexGrow: 1,
              display: 'flex',
              p: { xs: '36px', md: '70px' },
              pt: { xs: '24px', md: '60px' },
              borderRadius: 'lg',
              overflow: 'hidden',
              '& button': { borderRadius: 'xl' },
            }}
            className="bg-asliDark"
          >
            <Box sx={{ zIndex: 1, position: 'relative' }}>
              <Typography level="h2">Get started</Typography>
              <Typography sx={{ mt: 0.5, mb: 2 }}>
                Instant access to the power of the Joy UI library.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  maxWidth: 'max-content',
                  '& > *': { flexGrow: 1, fontWeight: 'lg' },
                }}
              >
                <button className="p-2 rounded-xl bg-khas text-white min-w-[100px] w-32 hover:scale-105 duration-150 "> دانلود </button>
                <Button
                  variant="plain"
                  endDecorator={<ArrowForward fontSize="md" />}
                  sx={{
                    '&:hover': { '--Button-gap': '0.625rem' },
                    '& span': { transition: '0.15s' },
                  }}
                >
                  See the docs
                </Button>
              </Box>
            </Box>
            <Box
              component="img"
              alt=""
              src="https://storage.googleapis.com/cms-storage-bucket/72521e62275b24d3c37d.png"
              sx={{ position: 'absolute', height: '100%', top: 0, right: 0 }}
            />
          </Sheet>
        </div> */}

        
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

        <Divider/>

        <div className="flex md:flex-row flex-col justify-center items-center gap-4 w-full">
          
          <div className="md:w-1/2 w-full flex flex-col gap-4 text-center items-center">
            <Image src={Partnership} width={400} height={400}  />
            
          </div>
          
          <div className="md:w-1/2 w-full text-center flex flex-col justify-center items-center gap-14" >
            <h2 className="md:text-3xl text-xl " > کارخانه ها و نمایندگی ها و فروشگاه ها در سراسر ایران می توانند یک فروشگاه داشته باشند </h2>
            <Link href="/signup" className="text-white bg-khas rounded-xl hover:bg-orange-600 w-52 p-3" > ساخت فروشگاه <VerifiedUser/> </Link>
          </div>
        </div>

        <div className="w-full text-center mx-auto md:text-3xl text-xl  gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-3" ></span>  همکاری با کارخانه ها و فروشگاه ها  <span className="h-full w-[2px] border-2 border-khas mx-3" ></span> </div>


        <div className="w-full h-max" >

          <BrandSlider/>

        </div>


      </div>

  )
}
