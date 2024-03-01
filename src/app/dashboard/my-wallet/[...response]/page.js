'use client'

import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import successImg from "../../../../../public/images/Plain credit card.gif"
import failImg from "../../.././../../public/images/Pay attention.gif"


 function page() {

    const searchParams = useSearchParams();
    const Authority = searchParams.get("Authority")
    const Status = searchParams.get("Status")
    
    const [response, setResponse] = useState("")

    // Get Response of Payment State ---------
    async function PaymentFinish() {
        await axios.get(`https://supperapp-backend.chbk.run/payment/finished/?authority=${Authority}}&status=${Status}`, {
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
        <div>
             
            {
                response?.alert_stat == 'success' 
                ?
                (
                    <div className="w-full flex flex-col justify-center items-center gap-6" >
                        <Image src={successImg} width={500} height={500} />
                        <h2 className="text-xl " >
                            {response?.stat_msg}
                        </h2>
                        <h3> شماره پیگیری : {response?.refid} </h3>
                    </div>
            )
            :
            (

                <div className="w-full flex flex-col justify-center items-center gap-6" >
                <Image src={failImg} width={500} height={500} />
                <h2 className="text-xl " >
                    {response?.stat_msg}
                </h2>
            </div>

            )
            
            }
                
        </div>
    );
}

export default page;