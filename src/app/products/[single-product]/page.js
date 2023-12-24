import Image from "next/image";
import proimg from "../../../../public/images/b2.jpg"
import proimgDet from "../../../../public/images/b3.jpg"
import { e2p, sp } from "@/utils/replaceNumbers";
import { Badge, Rating } from "@mui/material";
import { Button, Card, CardActions, CardContent, Chip, CircularProgress, Divider, Input, SvgIcon, Textarea, Typography } from "@mui/joy";
import CommentTextArea from "@/components/module/CommentTextArea";
import axios from "axios";
import { AddRounded, ShoppingCartCheckout } from "@mui/icons-material";

async function SingleProduct() {


    const res = await axios.get('https://supperapp-backend.chbk.run/Product/product/658705815c1876c59f9c1a0d', {
        headers:{
          'accept': 'application/json',
        }
        }).catch((error) => {
          console.log(error, "Error");
        });

    const productList = res.data

    console.log(productList)



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
                    <div id="main-Image" className="w-full h-2/3 " >
                        <Image
                            className="w-full h-full rounded-xl"
                            src={proimg}
                            priority
                        />
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center max-h-1/3 overflow-y-scroll w-full mx-auto" >
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                    </div>
                    <Card variant="solid" invertedColors className="w-full bg-asliDark">
        
        <CardContent className="flex flex-row gap-6 items-center justify-between w-full">
            <div className=" flex flex-row justify-start items-center">
              <CircularProgress size="lg" determinate value={0}>
                <SvgIcon>
                  <ShoppingCartCheckout/>
                </SvgIcon>
              </CircularProgress>
              <h2 className="text-4xl"> {e2p(sp(productList.seller_info[0].price))} <span className="text-base" > ریال </span> </h2>
            </div>
          <Chip color="warning" className="p-2 text-sm w-full" > تخفیف {e2p(productList.seller_info[0].off)}% </Chip>
          <div className="flex flex-row-reverse justify-center items-center">
                <button className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-r-none h-9 text-lg " > - </button>
                    <Input placeholder="0" className="w-1/5 h-[30px] rounded-none bg-white text-black "/>
                <button className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-l-none h-9 text-lg " > + </button>
            </div>
        </CardContent>

      <CardActions className="w-full text-center flex justify-center items-center" >
        <button className="w-[80%] bg-khas rounded-xl p-2 hover:bg-orange-600 transition-colors duration-300">
          افزودن به سبد خرید <AddRounded/>
        </button>
      </CardActions>
    </Card>
                </div>


            </div>

            <div className="w-full flex flex-col gap-12 justify-center items-center" >

                <div className="w-full" >
                    <span className="border-b-8 border-khas p-2 text-2xl" > فروشندگان این کالا </span>
                </div>

                <ul className="md:w-[90%] w-full flex flex-col gap-6 " >
                    <li className="w-full flex flex-row justify-between items-center p-4 odd:bg-slate-200 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>
                    <li className="w-full flex flex-row justify-between items-center p-4 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>
                    <li className="w-full flex flex-row justify-between items-center p-4 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>

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