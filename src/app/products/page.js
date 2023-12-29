import { ArrowOutward, ArrowOutwardOutlined, Favorite, Share } from "@mui/icons-material";
import { AspectRatio, Button, Card, CardActions, CardContent, CardOverflow, Chip, Typography } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";
import AddToFavoriteAndShare from "@/components/module/AddToFavoriteAndShare";


async function Products() {


    const res = await axios.get('https://supperapp-backend.chbk.run/Product/products?page=1&limit=20', {
        headers:{
          'accept': 'application/json',
        }
        }).catch((error) => {
          console.log(error, "Error");
        });

    const productList = res?.data.data



    

    return (
        <div className="flex flex-row w-full h-full justify-center items-start gap-2 p-4" >
            <div id="filterPart" className="w-1/6 h-96 border-asliLight rounded-xl border-2 border-solid p-3" >
                <div className="w-full flex flex-row justify-between items-center" >
                    <span className="text-xl" > فیلتر ها </span>
                    <button className="text-sm text-khas" > حذف فیلتر </button>
                </div>
            </div>
            <div id="productsPart" className="flex flex-row justify-start items-center gap-3 w-5/6" >

            {productList?.length > 0 || res === undefined ? null : (

                <>
                    <h2>
                        Reloading please be patient ...
                    </h2>
                </>

                )
            }


            {

                productList?.map((i) => (

                        <Card className="md:w-1/4 w-full h-full hover:shadow-2xl" key={i.id}>
                            <Link href={`/products/${i.id}`} className=" w-full h-full" key={i.id} >
                                <CardOverflow>
                                    <AspectRatio>
                                    <Image
                                        src={i.image_url}
                                        loading="lazy"
                                        fill
                                        alt=""
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
                                        {i.has_bundle === true ? "باندل دارد" : "باندل ندارد"}
                                    </Chip>
                                    <Typography level="body-sm">
                                    {e2p(i.seller_number)} فروشگاه برای این کالا
                                    </Typography>
                                </CardContent>
                            </Link>
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