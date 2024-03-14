'use client'

import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import successImg from "../../../../../public/images/Plain credit card.gif"
import failImg from "../../.././../../public/images/Pay attention.gif"
import { CloseRounded } from "@mui/icons-material";
import Link from "next/link";


 function page() {

    const searchParams = useSearchParams();
    const Authority = searchParams.get("Authority")
    const Status = searchParams.get("Status")
    
    const [response, setResponse] = useState("")

    // Get Response of Payment State ---------
    async function PaymentFinish() {
        await axios.get(`https://supperapp-backend.chbk.run/payment/finished/?authority=${Authority}&status=${Status}`, {
            headers:{
            'accept': 'application/json',
            }
            })
            .then((response) => {
            setResponse(response.data)
            console.log(response)
            })
            .catch((error) => {
            console.log(error, "Error");
            });
    }

    useEffect(() => {
        PaymentFinish()
    },[])



    

    return (
        <div className="min-h-[80vh]">
             
            {
                response?.alert_stat == 'success' 
                ?
                (
                    <div className="w-full flex flex-col justify-center items-center gap-6" >
                        <Image src={successImg} width={300} height={300} className="rounded-full" />
                        <h2 className="text-2xl " >
                            {response?.stat_msg}
                        </h2>
                        <h3> شماره پیگیری : {response?.refid} </h3>
                        <Link href="/dashboard/my-wallet" className="p-2 rounded-2xl bg-khas text-white" > بازگشت به کیف پول </Link>
                    </div>
            )
            :
            (

                <div className="w-full flex flex-col justify-center items-center gap-6" >
                    <CloseRounded className="text-4xl text-white p-4 bg-red-600 mx-auto w-48 h-48 rounded-full" />
                    <h2 className="text-2xl text-black" >
                        {response?.stat_msg}
                    </h2>
                    <Link href="/dashboard/my-wallet" className="p-2 rounded-2xl bg-khas text-white" > بازگشت به کیف پول </Link>
            </div> 

            )
            
            }
                
        </div>
    );
}

export default page;