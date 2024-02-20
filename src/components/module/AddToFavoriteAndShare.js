'use client'

import { ArrowOutwardOutlined, AspectRatio, Favorite, Share } from "@mui/icons-material";
import { Alert, CardOverflow, IconButton, Snackbar } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import GeneralLoader from "./GeneralLoader";
import { Card, CardContent, Chip, Dialog, DialogContent, DialogTitle, Rating, Slide, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const AddToFavoriteAndShare = ({pId}) => {


    const cookie = new Cookies();

    const route = useRouter();

    const Auth = cookie.get('tokenDastResi') || null

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([]);
    const [displayStores, setDisplayStore] = useState(false)



    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }

    async function AddToFavorites(pId) {
        await axios.post('https://supperapp-backend.chbk.run/favorite_product/create', {
        'product_id': `${pId}`
        }, 
        {
        headers: headers
        })
        .then((response) => {
            setMessage(response.data.Message)
            setAlert(true)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error, "Error");
            setMessage(" متاسفیم،خطایی رخ داده است یا وارد حساب خود شوید ")
            setErrorAlert(true)
            setLoading(false)
        });
    }

    // گرفتن لیست شاپ ها-----------------------------

    async function GetShopList(id) {
        setDisplayStore(true)
        setLoading(true)
        await axios.get(`https://supperapp-backend.chbk.run/product/product/${id}`).then((response) => {
            setShops(response.data.seller_info)
            console.log(response.data.seller_info)
            setLoading(false)
        });
    }

    // رفتن به صفحه جزییات محصول و دریافت آی پی کاربر از سایت "geolocation" -----------------------------

    async function FindIpAddress(i) {
        const date = new Date();
       
        await axios.get("https://geolocation-db.com/json/0daad5e0-82e7-11ee-92e0-f5d620c7dcb4")
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                CreatePulse(response, i)    
            }
        });
    }

    async function CreatePulse(res, i) {
        await axios.post('https://supperapp-backend.chbk.run/pulse/create',{
            "product_id": i.product_id,
            "pre_product_id": pId,
            "shop_id": i.seller_id,
            "mac_address": "",
            "ar_pulse": false,
            "ip_address": res.data.IPv4
        }).then((response) => {
            console.log(response)
            route.push(`/products/${i.product_id}`)
        }).catch((err) => {
            console.log(err)
        })
    }



    return (
        <>

            <div className="w-full flex flex-col justify-center items-center gap-4" >
                <div className="w-full flex flex-row justify-start items-center gap-4 ">
                    <IconButton
                        className="rounded-full text-rose-700 "
                        onClick={() => AddToFavorites(pId)}
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        className="rounded-full text-asliLight"
                        >
                    <Share />
                    </IconButton>
                </div>
                {/* <button className="w-full bg-khas rounded-md text-white h-10" onClick={() => FindIpAddress(pId)} >
                    دیدن محصول
                </button> */}
                <button className="w-full bg-khas rounded-md text-white h-10" onClick={() => GetShopList(pId)} >
                    دیدن محصول
                </button>
                



                    <Dialog
                        fullWidth= "true"
                        maxWidth="xl"
                        TransitionComponent={Transition}
                        open={displayStores}
                        onClose={() => setDisplayStore(false)}
                    >
                        <DialogTitle className="bg-slate-100 w-full text-center mx-auto" > فروشگاه مورد نظر را انتخاب کنید </DialogTitle>
                        <DialogContent className="flex flex-row items-center gap-5 bg-slate-100 overflow-x-scroll" >

                        {
                            loading 
                            ?
                            <div> <GeneralLoader/> </div>
                            :
                            shops.map((i) =>(
                                <Card onClick={() => FindIpAddress(i)} className="md:w-1/6 w-3/4 h-[200px] hover:shadow-2xl cursor-pointer" >
                                    <div className=" w-full h-full" >
                                    <CardOverflow>
                                        <AspectRatio>
                                        <image
                                            // src={i.products_image[0]}
                                            loading="lazy"
                                            alt=""
                                        />
                                        
                                        </AspectRatio>
                                        
                                    </CardOverflow>
                                        <CardContent className="gap-3 m-auto text-center p-1 h-full w-full flex flex-col justify-center" >
                                            <span
                                            endDecorator={<ArrowOutwardOutlined />}
                                            >
                                             فروشگاه {i.seller_name}
                                            </span>
                                            <div className="flex flex-row gap-1 items-center mx-auto"> <Rating value={3} readOnly /> </div>
                                            <Typography level="body-sm">
                                                {i.description}
                                            </Typography>
                                            <div className="bg-khas rounded-2xl px-2 text-white">
                                                {i.price} ریال
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                                
                            ))
                        }

                        </DialogContent>

                    </Dialog>


            </div>

            <Snackbar
                open={alert}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                className="bg-green-700 z-[300]"
                se
                >
                <Alert variant='filled' className='text-lg text-white font-semibold bg-green-700 text-center z-[300] ' > {message} <Favorite className="text-rose-600"/> </Alert>
                </Snackbar>

                <Snackbar
                open={errorAlert}
                autoHideDuration={4000}
                onClose={() => setErrorAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                className="bg-rose-900 z-[300]"
                se
                >
                <Alert variant='filled' className='text-lg text-white font-semibold bg-rose-900 text-center z-[300]' > {message} </Alert>
            </Snackbar>
        </>
    );
}

export default AddToFavoriteAndShare;