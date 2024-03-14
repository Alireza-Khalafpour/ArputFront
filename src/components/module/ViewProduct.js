"use client";

import { Alert, Button, Rating, Snackbar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GalleryProduct from "./GalleryProduct";
import { ExitToApp, Favorite, Palette, Share } from "@mui/icons-material";
import ShopingButton from "./ShopingButton";
import Link from "next/link";
import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";



function ViewProduct({ productList, single_product }) {

  const theme = createTheme({
    direction: 'rtl', // before: 'ltr', after: 'rtl'
  }
 );

 const cookie = new Cookies();
  
  const Auth = cookie.get('tokenDastResi')

  const[data, setData] =useState([])
  console.log(data)

 const [message, setMessage] = useState();
 const [alert, setAlert] = useState(false);
 const [errorAlert, setErrorAlert] = useState(false);
 const [loading, setLoading] = useState(false);


    

  // Create Rate pre product ---------------------------------------------

  const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }


  async function CreateRateApi(val) {

      await axios.post('https://supperapp-backend.chbk.run/rate/create',{
          "range":val * 2 ,
          "pre_product_id": productList?.id
        },
      {
        headers: headers
      })
      .then((response) => {
          setMessage(response?.data.Message)
          setAlert(true)
      })
      .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است یا وارد حساب کاربری شوید ")
          setErrorAlert(true)
          
      });


}

    // Get Rate pre-product----------------------------------------------

    async function ListApi() {
      
      await axios.get(`https://supperapp-backend.chbk.run/rate/pre_product/star_rate/${single_product}`, {
        headers:headers
        })
        .then((response) => {
          setData(response.data?.rate_lists)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }

    useEffect(() => {
      ListApi()
    }, [])


  
  function handleImage(e) {
    console.log(e.target);
  }
  return (
    <div className=" relative flex flex-col gap-6 bg-white p-5 md:rounded-xl md:flex-row justify-between md:m-auto w-full">
      <div className="w-1/3 md:flex md:flex-row flex-col gap-4 justify-end items-end absolute md:top-3 top-[70%] left-5 hidden">
        <Favorite className="text-rose-600 hover:text-rose-700 cursor-pointer " />
        <Share className="text-blue-400 cursor-pointer" />
        <ExitToApp className="text-khas cursor-pointer" />
      </div>
      <GalleryProduct productList={productList} />
      <div className=" flex flex-col gap-10 m-auto items-center md:w-2/3 ">
        <h1 className="text-2xl p-1">{productList?.name}</h1>
        <div className="flex flex-row gap-1 ">
          {" "}
          <span> امتیاز : </span> 
          <ThemeProvider theme={theme} >
            <Rating
              onChange={(e,val) => CreateRateApi(val)}
              value={data?.reduce((partialSum, a) => partialSum + a, 0) / data?.length}
              />
          </ThemeProvider>
          {" "}
        </div>
        {/* <Link href="#" className="p-1 bg-khas text-white rounded-xl cursor-pointer" > همه محصولات این فروشگاه </Link> */}
        <button>
         فروشنده های دیگر
          <KeyboardArrowDownIcon />
        </button>
      </div>



      <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          className="bg-green-700 text-white"
          se
          >
          <Alert variant='filled' className='text-lg text-white font-semibold bg-green-700 mx-auto ' > {message} </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="bg-rose-700"
        se
        >
        <Alert variant='filled' className='text-lg text-white font-semibold bg-rose-700 mx-auto' > {message} </Alert>
      </Snackbar>


    </div>
  );
}

export default ViewProduct;
