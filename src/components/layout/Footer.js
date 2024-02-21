import { Facebook, Instagram, Telegram, WhatsApp } from "@mui/icons-material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Image from "next/image";
import LogoAR from "../../../public/images/Final Light Blur Transparented.png"
import Enamad from "../../../public/images/EnamadLogo.png"
import Link from "next/link";

const Footer = () => {
    return (
        <>
            <div className=" mt-20 w-full md:h-[40vh] h-full p-5 flex flex-col justify-center  items-center bg-gradient-to-bl from-asliDark to-blue-900 rounded-tl-[150px] rounded-sm " >

                <div className="md:flex hidden flex-row justify-between items-start w-full h-16" >
                    <div className="w-1/4 " >
                        <h3 className="border-b-4 text-xl text-white border-paszamine1 w-max mx-auto" > آدرس </h3>
                    </div>
                    <div className="w-1/4 text-center" >
                        <h3 className="border-b-4 text-xl text-white border-paszamine1 w-max mx-auto " > لینک ها </h3>
                    </div>
                    <div className="w-1/4 text-center" >
                        <h3 className="border-b-4 text-xl text-white border-paszamine1 w-max mx-auto " >  ما رو دنبال کنید </h3>
                    </div>
                    <div className="w-1/4 text-center" >
                        <p></p>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col md:gap-0 gap-12 justify-between items-center w-full h-full" >

                <div className="flex flex-col md:w-1/4 w-full text-center gap-4 text-white justify-around items-center h-full" >
                    <h5> شیراز شهرک آرین پارک علم و فناوری شیراز </h5>
                    <div className="flex flex-col gap-4 justify-center items-center" >
                        <h5> شماره تماس: <span> ۰۹۱۷۰۴۵۶۲۰۰ </span> </h5>
                        <h5> شماره دفتر: <span> ۰۷۱۳۶۳۶۴۴۷۰ </span> </h5>
                    </div>

                </div>

                <div className="flex flex-col md:w-1/4 w-full text-center gap-2 text-white  justify-around items-center h-full" >
                    <Link href="/products" className=" cursor-pointer hover:text-khas text-white" ><h5> گالری محصولات</h5></Link>
                    <Link href="/signin" className=" cursor-pointer hover:text-khas text-white"><h5> ثبت نام به عنوان فروشگاه </h5></Link>
                    <Link href="/contactus" className=" cursor-pointer hover:text-khas text-white" ><h5> تماس با ما </h5></Link>
                    <Link href="/aboutus" className=" cursor-pointer hover:text-khas text-white" ><h5> درباره ما </h5></Link>
                </div>

                <div className="flex flex-col md:w-1/4 w-full text-center gap-4 text-white text-xl justify-around items-center h-full" >
                    <a className="border-2 border-paszamine1 p-2 px-5 rounded-2xl hover:scale-110 transition-all duration-300 text-white" href="mailto:info@arputmarket.com" > ایمیل  <AlternateEmailIcon/> </a>
                    <div className="flex flex-row justify-between items-center gap-4" >
                        <a href='https://www.instagram.com/' target="_blank" className="w-12 h-12 rounded-full flex justify-center items-center border border-white text-khas hover:text-white hover:bg-orange-700 m-auto cursor-pointer transition-all duration-100" > <Instagram/> </a>
                        <a href="https://www.facebook.com/" target="_blank" className="w-12 h-12 rounded-full flex justify-center items-center border border-white text-blue-600 hover:text-white hover:bg-blue-700 m-auto cursor-pointer transition-all duration-100" > <Facebook/> </a>
                        <a href="https://www.whatsapp.com/" target="_blank" className="w-12 h-12 rounded-full flex justify-center items-center border border-white text-green-600 hover:text-white hover:bg-green-700 m-auto cursor-pointer transition-all duration-100" > <WhatsApp/> </a>
                        <a href="https://web.telegram.org/" target="_blank" className="w-12 h-12 rounded-full flex justify-center items-center border border-white text-blue-700 hover:text-white hover:bg-blue-700 m-auto cursor-pointer transition-all duration-100" > <Telegram/> </a>
                    </div>
                </div>

                <div className="flex flex-col md:w-1/4 w-full text-center gap-4 text-white text-xl justify-center items-center h-full" >
                    <Image width={80} height={80} src={LogoAR} />
                    <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=453471&Code=LXmYefVTi3B1grCi0Hl0ikppOHJ96se8'><image referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=453471&Code=LXmYefVTi3B1grCi0Hl0ikppOHJ96se8' alt='' style={{cursor:"pointer"}} Code='LXmYefVTi3B1grCi0Hl0ikppOHJ96se8'/><Image width={80} height={80} src={Enamad} /></a>
                    {/* <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=453471&Code=LXmYefVTi3B1grCi0Hl0ikppOHJ96se8'><image referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=453471&Code=LXmYefVTi3B1grCi0Hl0ikppOHJ96se8' alt='' style={{cursor:"pointer"}} Code='LXmYefVTi3B1grCi0Hl0ikppOHJ96se8'/></a> */}
                </div>
                    
                </div>

                <div className=" justify-center items-center gap-2 text-center flex flex-col pt-7" >
                    <p className="text-white opacity-40" > کلیه حقوق این وبسایت متعلق به شرکت آرپوت مارکت(سپهر پنداران نیک سگال) می باشد. </p>
                    <p className="text-white opacity-40" > copyright 2024 &copy; ArputMarket </p>
                </div>


            </div>
        </>
    );
}



export default Footer;