import Image from "next/image";
import { e2p, sp } from "@/utils/replaceNumbers";
import { Badge, Rating } from "@mui/material";
import { Chip, Divider} from "@mui/joy";
import CommentTextArea from "@/components/module/CommentTextArea";
import axios from "axios";
import { cookies } from 'next/headers'
import AddProductCard from "@/components/module/AddProductCard";
import { ExitToApp, Favorite, Share } from "@mui/icons-material";
import Link from "next/link";

async function SingleProduct({params:{single_product}}) {


    const Auth = cookies().get("tokenDastResi")?.value ? cookies().get("tokenDastResi")?.value : null

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



    const Rate = axios.get(`https://supperapp-backend.chbk.run/rate_pre_product/pre_product/star_rate/${single_product}`, {
        headers: headers
        }).catch((error) => {
          console.log(error, "Erroooooooor");
        });



    return (
        <>
            {
                 
                res === undefined || res === null ?
                (
                   <div>

                        <h2> ابتدا وارد شوید </h2>
                        <Link className="w-48 rounded-xl bg-khas text-white hover:bg-orange-600"  href="/signin" > ورود </Link>

                   </div>
                )

                :

                (
                    <div className="flex flex-col gap-14 justify-start items-center w-full p-4" >

                    <div className="flex md:flex-row flex-col-reverse gap-2 w-full h-full" >
        
                        <div className="w-2/3 h-full px-4 flex flex-col gap-6" >
                            
                        <Divider className="text-asliLight text-base" sx={{ '--Divider-childPosition': "10%" }}>
                            {productList.category_name}
                        </Divider>
                        <div className="flex flex-row justify-between items-center" >
                            <h1 className="text-2xl p-1" >{productList.name}</h1>
                            <div className="w-1/3 flex flex-row itemsc gap-4 justify-end" >
                                <Favorite className="text-rose-600 hover:text-rose-700 cursor-pointer "/>
                                <Share className="text-blue-400 cursor-pointer" />
                                <ExitToApp className="text-khas cursor-pointer" />
                            </div>
                        </div>
        
                        <div className="flex flex-row gap-1 items-center"> <span> امتیاز : </span> <Rating value={3} readOnly /> </div>
        
                        <h3 className="w-max border-b border-asliLight " > ویژگی ها </h3>
        
                        {
                            productList.features.map((i) => (
                                <div>
                                    <h4 className="text-lg"> {i.main_name} <span className="text-xl mx-4" > {i.main_sample} </span>  </h4>
        
                                </div>
                            ))
                        }
                        <h5 className="w-max border-b border-asliLight " > مشخصات </h5>
        
                        <ul className="flex flex-row items-center justify-around !list-disc " > 
                            <li className="!list-disc text-lg " > وزن: { productList.info[0] ? e2p(productList.info[0]?.weight) : "0"} </li>
                            <li className="!list-disc text-lg " > طول: {productList.info[0] ? e2p(productList.info[0]?.width) : "0"} </li>
                            <li className="!list-disc text-lg " > عرض: {productList.info[0] ? e2p(productList.info[0]?.height) : "0" } </li>
                        </ul>
        
        
                        <h3 className="w-max border-b border-asliLight " > توضیحات </h3>
        
                        <h2> {productList.seller_info[0]?.description} </h2>
        
                        {/* <Divider className="text-asliLight text-base" sx={{ '--Divider-childPosition': "8%" }}>
                            مشخصات فروشنده
                        </Divider>
        
                            <p>  مشخصات فروشنده ( پیشنهاد )  </p> */}
        
        
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
                            <div className="flex flex-row gap-2 justify-center items-center max-h-1/3 overflow-y-scroll overflow-x-hidden w-full mx-auto max-w-lg" >
                                {productList.image_url[0] ? <Image width={80} height={80} src={productList.image_url[0]} className="rounded-xl" /> : null }
                                {productList.image_url[1] ? <Image width={80} height={80} src={productList.image_url[1]} className="rounded-xl" /> : null }
                                {productList.image_url[2] ? <Image width={80} height={80} src={productList.image_url[2]} className="rounded-xl" /> : null }
                                {productList.image_url[3] ? <Image width={80} height={80} src={productList.image_url[3]} className="rounded-xl" /> : null }
                                {productList.image_url[4] ? <Image width={80} height={80} src={productList.image_url[4]} className="rounded-xl" /> : null }
                                {productList.image_url[5] ? <Image width={80} height={80} src={productList.image_url[5]} className="rounded-xl" /> : null }
                                {productList.image_url[6] ? <Image width={80} height={80} src={productList.image_url[6]} className="rounded-xl" /> : null }
                                {productList.image_url[7] ? <Image width={80} height={80} src={productList.image_url[7]} className="rounded-xl" /> : null }

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
                                            <h2> {s.seller_name == "" ? "آرپوت مارکت" : s.seller_name } </h2>
                                        {/* <span> نحوه عملکرد و امتیاز </span> */}
                                        <h3 > قیمت {e2p(sp( s.price ? s.price : 0))} ریال </h3>
                                        <Chip className="p-1 px-3 bg-rose-700 text-white rounded-xl" > تخفبف {e2p(s.off)} % </Chip>
                                        {/* <Link href={`/products/${s.product_id}`} className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" > */}
                                        <button href={`/products/${s.product_id}`} className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                                             خرید از این فروشگاه
                                        </button>
                                        {/* </Link> */}
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
                            <CommentTextArea single_product={single_product} />
                        </div>
        
                        <ul className="w-full flex flex-col gap-6 justify-center items-center " >
                            <li className="md:w-[90%] w-full flex flex-row justify-start items-center p-4 odd:bg-slate-200 border-black border-b-2 " >
        
        
                            </li>
        
                        </ul>
        
                    </div>
        
        
                </div>
                )

            }
        </>
    );
}

export default SingleProduct;