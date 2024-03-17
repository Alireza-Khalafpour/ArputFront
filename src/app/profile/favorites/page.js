'use client'

import { DiscountRounded, Favorite, Money, StoreMallDirectoryRounded } from "@mui/icons-material";
import { Divider, Input } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Favorites() {


    const cookie = new Cookies();
    const Auth = cookie.get("tokenDastResi")

    const [favList, setFavList] = useState([])


        useEffect(() => {
            axios.get('https://supperapp-backend.chbk.run/pre_product/favorite/list',{
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${Auth}`
                }
            }).then((response) => {
                setFavList(response.data.data)
            }).catch((error) => {
                console.log(error, "Error");
            })
        },[])





    return (
        <>
            
            <ul class="w-full divide-y divide-gray-400 dark:divide-gray-700 p-8">
                {
                    favList?.map((i) =>(
                        <li class="p-4 w-1/2 hover:bg-slate-300 cursor-pointer" key={i?.pre_product_id}>
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0 px-2">
                                    <Image src={i?.image} width={60} height={60} class="w-16 h-16 rounded-full" alt={i?.pre_product_name}/>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                        {i?.pre_product_name}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {i?.category_name}
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                    {i?.factory_name} کارخانه
                                </div>
                                <div class="inline-flex items-center">
                                    <Favorite className="text-red-500" />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>

        </>
    );
}

export default Favorites;