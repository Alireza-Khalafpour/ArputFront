"use client"

import Image from "next/image";
import imf from "../../../public/images/images.jpg"
import fjd from "../../../public/images/evil-dead-rise-2023-small.jpg"
import { ArrowBackIos, ArrowForwardIos, ArrowLeftRounded, ArrowRightAltOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

const Carousel = () => {

    const slides = [
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/download.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/download.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/download.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/download.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/download.jpg",
        "/public/images/evil-dead-rise-2023-small.jpg",
        "/public/images/photo-1575936123452-b67c3203c357.avif",
        "/public/images/evil-dead-rise-2023-small.jpg",
      ]

    console.log(slides.length)

    const calc = slides.length / 8

    console.log(calc , "calc")

    const [current, setCurrent] = useState(0)

    const previousSlide = ()=>{
        if(current === 0 || current < 0) setCurrent(calc - 1)
        else setCurrent(current - 1)
    }

    const nextSlide = ()=>{
        if(current === calc - 1) {
            setCurrent(0)
        }else {
            setCurrent(current + 1)
        }
    }

    console.log(current)

    return (
        <div className="overflow-hidden relative" >
            <div className="flex flex-row transition-all ease-out duration-[1200ms]" style={{transform: `translateX(${current*100}%)`}}>
                {/* {
                    slides.map((slide) =>{
                        return <Image src={slide} alt="image" width={500} height={500}  />
                    })
                } */}
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="imaf" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150}/>
                <Image src={fjd} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="imaf" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150}/>
                <Image src={fjd} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="imaf" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150}/>
                <Image src={fjd} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="imaf" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150}/>
                <Image src={fjd} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
                <Image src={fjd} alt="imaf" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150}/>
                <Image src={imf} alt="fjd" width={150} height={150} />
                <Image src={imf} alt="imaf" width={150} height={150} />
            </div>
            <div className="absolute top-0 h-full w-full flex justify-between items-center" >
                <Button type="button" onClick={previousSlide} className="text-white bg-slate-700 p-1 rounded-full" > <ArrowForwardIos/></Button>
                <Button type="button" onClick={nextSlide} className="text-white bg-slate-700 p-1 rounded-full"><ArrowBackIos/></Button>
            </div>


        </div>
    );
}

export default Carousel;