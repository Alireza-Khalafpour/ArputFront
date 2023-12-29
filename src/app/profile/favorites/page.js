'use client'

import { DiscountRounded, Money, StoreMallDirectoryRounded } from "@mui/icons-material";
import { Divider, Input } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import Cookies from "universal-cookie";

function Favorites() {


    const cookie = new Cookies();
    const Auth = cookie.get("tokenDastResi")


        useEffect(() => {


            axios.get('https://supperapp-backend.chbk.run/favorite_product/list',{
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${Auth}`
                }
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error, "Error");
            })
        },[])





    return (
        <>
        jfgh
            {/* <div className="w-full gap-2 border-2 rounded-xl flex md:flex-row flex-col justify-center items-start p-4 shadow-md" >
        
                <div className="md:w-1/5 w-full relative " >
                    <Image src={i.image} width={250} height={250} title={i.product_name} className="rounded-xl" />
                </div>

                <div className="md:w-4/5 w-full flex md:flex-row flex-col justify-center items-end p-4" >
                    <div className="md:w-2/3 w-full flex flex-col gap-2 justify-center items-start" >
                        <h2 className="text-xl font-bold"> {i.product_name} </h2>
                        <Divider/>
                        <p className="text-lg" > <StoreMallDirectoryRounded className="text-asliLight mx-1 text-xl"/> {i.seller_name} </p>
                        <p className="text-lg" > <DiscountRounded className="text-asliLight mx-1 text-xl" /> {e2p(i.off)}% تخفیف </p>
                        <p className="text-xl my-2 p-1 border-b font-semibold" > <Money className="text-asliLight mx-1 text-xl" /> {e2p(sp(i.price))} ریال </p>
                    </div>
                    <div className="md:w-1/3 w-full" >

                        <div className="flex flex-row-reverse justify-center items-center">
                            <button className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-r-none h-10 text-xl bg-khas text-white font-bold hover:bg-orange-600 transition-colors duration-200 " > - </button>
                                <Input value={e2p(i.number)}  className="w-1/5 h-[32px] rounded-none bg-white text-black text-lg "/>
                            <button className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-l-none h-10 text-xl bg-khas text-white font-bold hover:bg-orange-600 transition-colors duration-200 " > + </button>
                        </div>
                        
                    </div>

                </div>


            </div> */}
        </>
    );
}

export default Favorites;