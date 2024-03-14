import { ArrowOutward, ArrowOutwardOutlined, Favorite, Share } from "@mui/icons-material";
import { AspectRatio, Button, Card, CardActions, CardContent, CardOverflow, Chip, Typography } from "@mui/joy";
import axios from "axios";
import Link from "next/link";
import { Rating } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";
import AddToFavoriteAndShare from "@/components/module/AddToFavoriteAndShare";
import Image from "next/image";
import { numberToWords } from "@persian-tools/persian-tools";



async function Products() {


    const res = await axios.get('https://supperapp-backend.chbk.run/product/products?page=0&limit=20', {
        headers:{
          'accept': 'application/json',
        }
        }).catch((error) => {
          console.log(error, "Error");
        });

    const productList = res?.data.data




    

    return (
        <div className="flex flex-row w-full h-full justify-center items-start gap-2 p-4" >
            {/* <div id="filterPart" className="w-1/6 md:flex hidden h-96 border-asliLight rounded-xl border-2 border-solid p-3 flex-col gap-4" >
                <div className="w-full flex flex-row justify-between items-center" >
                    <span className="text-xl" > فیلتر ها </span>
                    <button className="text-sm text-khas" > حذف فیلتر </button>
                </div>

            </div> */}
        <div id="productsPart" className="flex flex-row justify-start items-center gap-5 w-full flex-wrap" >

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
                                    {/* <div className="flex flex-row gap-1 items-center"> <span> امتیاز : </span> <Rating value={3} readOnly /> </div> */}
                                    <Chip component="span" size="sm" variant="soft" color={i.has_bundle === true ? "success" : "danger"}>
                                        {i.has_bundle === true ? "واقعیت افزوده دارد" : " واقعیت افزوده ندارد "}
                                    </Chip>
                                    <Typography level="body-sm">
                                    {numberToWords(i.shop_number)} فروشگاه برای این کالا
                                    </Typography>
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
    );
}

export default Products;