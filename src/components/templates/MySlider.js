"use client"

import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/MySlider.css"
import Image from "next/image";
import { e2p } from "@/utils/replaceNumbers";
import Link from "next/link";
import { Badge } from "@mui/joy";



const MySlider = ({title}) => {
    
    const [expand, setExpand] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() =>{
        GetItems()
    },[])

    async function GetItems () {
        await axios.get('https://supperapp-backend.chbk.run/Product/products?page=0&limit=18', {
            headers:{
              'accept': 'application/json',
            }
            })
            .then((response) => {
              setItems(response.data.data)
            })
            .catch((error) => {
              console.log(error, "Error");
            });
    }



    function handleExpand() {
        setExpand((p) => !p)
        document.getElementById("noScroll").scrollTo(0, 0)
    }

    return (
        <>

            <h1 className='hover:text-khas max-w-max hover:cursor-pointer font-bold text-2xl' > {title} </h1>
                <br />

            <div id="noScroll" className={`w-full flex flex-row justify-start items-center ${expand ? "overflow-scroll" : "overflow-hidden"} gap-10 flex-wrap !max-h-[70vh] ${expand ? "h-[70vh]" : "h-52"} transition-all duration-700 `} >


            {
                items?.map((i) => (
                        <Link href={`/products/${i.id}`} style={{backgroundImage: `url(${i.image_url})`}} className=" relative sliderCard h-52 bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] relative before:rounded-xl">
                            <div id="info" className=" transition-all duration-700 text-xl text-white absolute bottom-5 right-3 gap-5 ">
                                <h2> {i.name} </h2> 
                                <h3 className="text-sm"> موجود در {e2p(i.seller_number)} فروشگاه </h3>
                            </div>
                            <div className="absolute top-3 left-3 !bg-transparent" > {i.has_bundle == true ? <div className="rounded-full w-4 h-4 bg-green-700 text-white " ></div> : null } </div>
                        </Link>
                ))
            }



            </div>
            <div className="w-full text-center my-6 border-b border-paszamine3 rounded-3xl relative mt-16 " >
                <button onClick={() => handleExpand()} className="w-14 h-14 rounded-full bg-khas text-white transition-all duration-700 absolute bottom-[-25px] " > {expand ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>} </button>
            </div>

            
        </>
    );
}



export default MySlider;