'use client'

import { useEffect, useState } from "react";
import Dot from "./Dot";
import Link from "next/link";

const Dots = () => {


    const [mousePos, setMousePos] = useState({x: 0, y: 0})

    useEffect(() => {
        const handler = (e) =>{
            setMousePos({x:e.clientX, y:e.clientY});
        }
        window.addEventListener("mousemove", handler);

        return () => {
            window.removeEventListener("mousemove", handler);
        }
    },[])

    return (
        <Link href="/" className="lg:flex hidden flex-wrap w-[90%] gap-24 mx-auto p-12 relative cursor-pointer border bg-slate-200 border-dotted border-khas rounded-lg" >
            
            {
                Array.from({length: 55}, (_, i) => (
                    <Dot key={i} mousePos={mousePos}></Dot>
                ))
            }

            <div className="flex flex-col gap-2 justify-center items-center hover:animate-pulse delay-200 duration-500 transition-all w-[90%] h-full text-center absolute text-asliDark text-4xl font-extrabold" >
                <p  > برای دانلود و نصب اپ ما </p>
                <p > اینجا کلیک کن </p>
            </div>

        </Link>
    );
}

export default Dots;