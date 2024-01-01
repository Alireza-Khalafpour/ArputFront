import Image from "next/image";
import proimg from "../../../../public/images/b2.jpg"
import proimgDet from "../../../../public/images/b3.jpg"
import { e2p, sp } from "@/utils/replaceNumbers";
import { Badge, Rating } from "@mui/material";
import { Chip, Divider} from "@mui/joy";
import CommentTextArea from "@/components/module/CommentTextArea";
import axios from "axios";
import { cookies } from 'next/headers'
import AddProductCard from "@/components/module/AddProductCard";

async function SingleProduct({params:{single_product}}) {


    const Auth = cookies().get("tokenDastResi").value

    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
    }

    const res = await axios.get(`https://supperapp-backend.chbk.run/Product/product/${single_product}`, {
        headers:{
          'accept': 'application/json',
        }
        }).catch((error) => {
          console.log(error, "Error");
        });

    const productList = res.data

    console.log(productList)



    const Rate = axios.get(`https://supperapp-backend.chbk.run/rate_pre_product/pre_product/star_rate/${single_product}`, {
        headers: headers
        }).catch((error) => {
          console.log(error, "Errnooooooooooooommmmmmmmor");
        });



    return (
        <div className="flex flex-col gap-14 justify-start items-center w-full p-4" >

            <div className="flex md:flex-row flex-col-reverse gap-2 w-full h-full" >

                <div className="w-2/3 h-full px-4 flex flex-col gap-6" >
                    
                <Divider className="text-asliLight" sx={{ '--Divider-childPosition': "10%" }}>
                    {productList.category_name}
                </Divider>

                <h1 className="text-2xl p-1" >{productList.name}</h1>

                <div className="flex flex-row gap-1 items-center"> <span> امتیاز : </span> <Rating value={3} readOnly /> </div>

                <h3 className="w-max border-b border-asliLight " > ویژگی ها </h3>

                {
                    productList.features.map((i) => (
                        <div>
                            <h4 className="text-lg"> feature name: {i.feature_name} </h4>
                            <h4 className="text-lg" > main_name: {i.main_name} </h4>
                            <h4 className="text-lg" > sample_name {i.main_sample} </h4>
                        </div>
                    ))
                }
                <h5 className="w-max border-b border-asliLight " > مشخصات </h5>

                <ul className="flex flex-row items-center justify-around !list-disc " > 
                    <li className="!list-disc text-lg " > وزن: {e2p(productList.info[0].weight)} </li>
                    <li className="!list-disc text-lg " > طول: {e2p(productList.info[0].width)} </li>
                    <li className="!list-disc text-lg " > عرض: {e2p(productList.info[0].height)} </li>
                </ul>


                <h3 className="w-max border-b border-asliLight " > توضیحات </h3>

                <h2> {productList.seller_info[0].description} </h2>

                <Divider className="text-asliLight" sx={{ '--Divider-childPosition': "8%" }}>
                    مشخصات فروشنده
                </Divider>

                {
                    productList.features.map((i) => (
                        <div>
                            <h4 className="text-lg"> feature name: {i.feature_name} </h4>
                            <h4 className="text-lg" > main_name: {i.main_name} </h4>
                            <h4 className="text-lg" > sample_name {i.main_sample} </h4>
                        </div>
                    ))
                }


                </div>

                <div className="md:w-1/3 w-full flex flex-col justify-center items-center gap-2 h-full" >
                    <div id="main-Image" className="w-full h-2/3 max-w-lg max-h-lg " >
                        <Image
                            className="w-full h-full rounded-xl"
                            src={productList.image_url[0]}
                            width={300}
                            height={300}
                            priority
                        />
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center max-h-1/3 overflow-y-scroll w-full mx-auto max-w-lg" >
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                    </div>

                    <AddProductCard productList={productList} />

                </div>


            </div>

            <div className="w-full flex flex-col gap-12 justify-center items-center" >

                <div className="w-full" >
                    <span className="border-b-8 border-khas p-2 text-2xl" > فروشندگان این کالا </span>
                </div>

                <ul className="md:w-[90%] w-full flex flex-col gap-6 " >
                    {
                        productList.seller_info.map((s) => (

                            <li className="w-full flex flex-row justify-between items-center p-4 odd:bg-slate-200 border border-asliDark rounded-xl border-dashed " >
                                <h2> {s.seller_name} </h2>
                                <span> نحوه عملکرد و امتیاز </span>
                                <h3 > قیمت {e2p(sp(s.price))} ریال </h3>
                                <Chip className="p-1 px-3 bg-rose-700 text-white rounded-xl" > تخفبف {e2p(s.off)} % </Chip>
                                <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                                     خرید از این فروشگاه
                                </button>
                            </li>
                        ))
                    }
        
                </ul>

            </div>


            <div className="w-full flex flex-col gap-12 justify-center items-center" >

                <div className="w-full" >
                    <span className="border-b-8 border-khas p-2 text-2xl" > دیدگاه و نظرات </span>
                </div>

                <div className="md:w-[90%] w-full" >
                    <CommentTextArea/>
                </div>

                <ul className="w-full flex flex-col gap-6 justify-center items-center " >
                    <li className="md:w-[90%] w-full flex flex-row justify-start items-center p-4 odd:bg-slate-200 border-black border-b-2 " >


                    </li>

                </ul>

            </div>


        </div>
    );
}

export default SingleProduct;