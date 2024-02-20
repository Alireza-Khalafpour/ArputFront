"use client";

import { Button, Rating } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GalleryProduct from "./GalleryProduct";
import { ExitToApp, Favorite, Share } from "@mui/icons-material";
import ShopingButton from "./ShopingButton";

function ViewProduct({ productList }) {
  function handleImage(e) {
    console.log(e.target);
  }
  console.log(productList);
  return (
    <div className=" relative flex flex-col gap-6 bg-white p-5 md:rounded-xl md:flex-row justify-between md:m-auto w-full">
      <div className="w-1/3 md:flex md:flex-row flex-col gap-4 justify-end items-end absolute md:top-3 top-[70%] left-5 hidden">
        <Favorite className="text-rose-600 hover:text-rose-700 cursor-pointer " />
        <Share className="text-blue-400 cursor-pointer" />
        <ExitToApp className="text-khas cursor-pointer" />
      </div>
      <GalleryProduct productList={productList} />
      <div className=" flex flex-col gap-10 m-auto items-center md:w-2/3 ">
        <h1 className="text-2xl p-1">{productList.name}</h1>
        <div className="flex flex-row gap-1 ">
          {" "}
          <span> امتیاز : </span> <Rating value={3} readOnly />{" "}
        </div>
        <button>
          59 فروشنده دیگر
          <KeyboardArrowDownIcon />
        </button>
        {/* <div className=" flex flex-col  items-center gap-5 w-full justify-center">
          <ShopingButton productList={productList} />
          <div className=" md:hidden flex-row  gap-4    flex">
            <Favorite className="text-rose-600 hover:text-rose-700 cursor-pointer " />
            <Share className="text-blue-400 cursor-pointer" />
            <ExitToApp className="text-khas cursor-pointer" />
          </div>
        </div> */}

        {/* <Button
          variant="contained"
          className=" flex w-full  flex-row  justify-between rounded-lg bg-rose-500"
        >
          <div className=" flex flex-col">
            <p>خرید ...</p>
            <p>54/000 میلیون تومان</p>
          </div>
          <p className=" rounded-full bg-rose-600 px-2">ارزان تر</p>
        </Button> */}
      </div>
    </div>
  );
}

export default ViewProduct;
