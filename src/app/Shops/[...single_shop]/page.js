import AddToFavoriteAndShare from "@/components/module/AddToFavoriteAndShare";
import { ArrowOutwardOutlined, AspectRatio } from "@mui/icons-material";
import { CardOverflow, Chip } from "@mui/joy";
import { Card, CardActions, CardContent, Divider, Rating, Typography } from "@mui/material";
import { numberToWords } from "@persian-tools/persian-tools";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

async function SingleShop() {


    const res = await axios.get('https://supperapp-backend.chbk.run/product/products?page=0&limit=20', {
        headers:{
          'accept': 'application/json',
        }
        }).catch((error) => {
          console.log(error, "Error");
        });

    const productList = res?.data.data


    return (

        <>

            <div className="w-full text-center p-8" >
                <Divider
                className="text-asliLight text-4xl"
                sx={{ "--Divider-childPosition": "50%" }} 
            >
                نام فروشگاه
                
            </Divider>
            </div>


            <div className="flex flex-row justify-center items-start p-6 " >
            <div className="w-1/4 flex flex-col border-2 bg-slate-50 gap-4 justify-center" >

                <div className="flex flex-row w-full" >
                    <img src="../../../../public/images/goodtile.webp" />
                    <div>
                        <h1>
                            نام فروشگاه
                        </h1>
                        <Link href="#" >

                            آدرس سایتشون
                        </Link>
                        <h6>آدرسشون</h6>
                    </div>
                </div>

                <div className="w-full">rate shop</div>

                <div className="w-full" >
                    filter part
                </div>

            </div>

            <div className="w-3/4" >

            <div id="productsPart" className="flex flex-row justify-center items-center gap-5 w-full flex-wrap" >

                    {productList?.length > 0 || res === undefined ? null : (

                        <>
                            <h2>
                                صبر کنید ...
                            </h2>
                        </>

                        )
                    }


                    {

                        productList?.map((i) => (

                                <Card className="md:w-1/5 w-full h-[420px] hover:shadow-2xl " key={i.id}>
                                    <div className=" w-full h-full" key={i.id} >
                                        <CardOverflow>
                                            <AspectRatio>
                                            <Image
                                                src={i?.image_url}
                                                width={200}
                                                height={200}
                                                alt="عکس"
                                            />
                                            
                                            </AspectRatio>
                                            
                                        </CardOverflow>
                                        <CardContent className="gap-2 mt-3" >
                                            <Typography level="body-xs"> دسته بندی </Typography>
                                            <span
                                            endDecorator={<ArrowOutwardOutlined />}
                                            >
                                            {i.name}
                                            </span>
                                            <div className="flex flex-row gap-1 items-center"> <span> امتیاز : </span> <Rating value={3} readOnly /> </div>
                                            <Chip component="span" size="sm" variant="soft" color={i.has_bundle === true ? "success" : "danger"}>
                                                {i.has_bundle === true ? "واقعیت افزوده دارد" : " واقعیت افزوده ندارد "}
                                            </Chip>
                                        </CardContent>
                                    </div>
                                    <CardActions>
                                        <AddToFavoriteAndShare pId={i.id} />
                                    </CardActions>
                                </Card>

                        ))

                    }


                    </div>

            </div>
        </div>
        
        
        </>

    );
}

export default SingleShop;