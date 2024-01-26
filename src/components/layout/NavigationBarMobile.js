'use client'


import { Download, Home, Login, Phone, StackedBarChart } from "@mui/icons-material";
import Link from "next/link";
import "../styles/NavigationBarMobile.css"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


const NavigationBarMobile = () => {

    const cookie = new Cookies();

    const ActiveState = cookie.get('activeList')

    const [activeList, setActiveList] = useState(1);

    useEffect(() => {
        if(ActiveState !== null){
            setActiveList(ActiveState);
        }
    },[])

    const handleClickLink = (i) => {
        cookie.set('activeList',i)
        setActiveList(i)
    }



    return (
        <div className="z-30 bottom-0 sticky">


            <div className="navigation relative w-full h-[70px] bg-asliDark justify-center items-center rounded-lg md:hidden flex " >
                <ul className="flex w-full" >
                    <li onClick={() => handleClickLink(1)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 1 ? "active" : null}`}  >
                        <Link href="/" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                            <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 " > <Home className="text-3xl" /> </span>
                            <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 " > خانه </span>
                        </Link>
                    </li>

                    <li onClick={() => handleClickLink(2)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 2 ? "active" : null}`} >
                        <Link href="/contactus" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                            <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 " > <Phone className="text-3xl" /> </span>
                            <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 " > تماس با ما </span>
                        </Link>
                    </li>

                    <li onClick={() => handleClickLink(3)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 3 ? "active" : null}`} >
                        <Link href="/products" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                            <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 " > <StackedBarChart className="text-3xl" /> </span>
                            <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 " > گالری </span>
                        </Link>
                    </li>

                    <li onClick={() => handleClickLink(4)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 4 ? "active" : null}`} >
                        <Link href="" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                            <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 " > <Download className="text-3xl" /> </span>
                            <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 " > اپ آرپوت </span>
                        </Link>
                    </li>

                    <li onClick={() => handleClickLink(5)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 5 ? "active" : null}`} >
                        <Link href="/signin" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                            <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 " > <Login className="text-3xl" /> </span>
                            <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 " > ورود </span>
                        </Link>
                    </li>


                    <div className="indicator absolute top-[-50%] w-[70px] h-[70px] bg-khas rounded-full border-[7px] border-paszamine1 transition-all duration-700 " ></div>

                </ul>
            </div>


        </div>
    );
}

export default NavigationBarMobile;