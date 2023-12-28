import { e2p, sp } from "@/utils/replaceNumbers";
import { DiscountRounded, Money, PriceCheck, StoreMallDirectoryRounded } from "@mui/icons-material";
import { Chip, Divider, Input } from "@mui/joy";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";



async function BuyingBasket() {



    const Auth = cookies().get("tokenDastResi").value

    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
    }

    const res = await axios.get('https://supperapp-backend.chbk.run/user_basket/list', {
        headers: headers
        }).catch((error) => {
          console.log(error, "Error");
        });

        console.log(res.data)

        const BasketList = res?.data.data


    return (
        <>
        
            {
                res.data.detail?.login === false 
                ?
                (
                    <div className="w-full h-[70vh] text-2xl text-center flex flex-col justify-center items-center"> ابتدا وارد شوید </div>
                )
                :
                (
                    <div className="flex flex-col justify-center w-full" >

                    <Divider className="text-asliDark text-xl mt-1 mb-4 font-semibold" sx={{ '--Divider-childPosition': "15%" }} > سبد خرید </Divider>
        
                    <div className="w-[80%] text-clip flex flex-row justify-center items-start mx-auto gap-6" >
        
                        <div className="w-3/4" >
        
                            {
                                BasketList?.map((i) => (
                                    <div className="w-full gap-2 border-2 rounded-xl flex md:flex-row flex-col justify-center items-start p-4 shadow-md" >
        
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
                
                
                                    </div>
                                ))
                            }
        
                        </div>
        
        
                        <div className="w-1/4" >
                            <div className="w-[90%] rounded-xl justify-between items-center flex flex-col border-2 gap-4 h-44 p-4 "  >
                                <p> جمع سبد خرید  </p>
                                <p> 1000000000 </p>
                                <button className="p-2 bg-khas text-white rounded-xl w-[80%]" > تکمیل سفارش </button>
                            </div>
                            <p className="text-gray-500" > هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند </p>
                        </div>
                        
        
        
                    </div>
                    
                </div>
                )
            }
        
        </>

    );
}

export default BuyingBasket;