"use client";


import { KeyboardArrowUp, ShoppingCart, Star } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Chip } from "@mui/material";
import { useState } from "react";

function SellerDetails({ productList }) {
  console.log(productList?.seller_info[0].price);
  const [Open, SetOpen] = useState(false);
  return (
    <div className=" basis-3/5">
      <div className=" md:hidden  px-5 py-5" id="seller">
        <p className="py-3 font-bold">فروشنده ها</p>
        <button className=" inline-block rounded-2xl border-2  border-black bg-white px-2 py-1">
          <p className=" text-lg">تمام ایران</p>
          <p className=" text-paszamine3">
            {productList?.seller_info[0].price}
            <span className="text-base"> ریال </span>
          </p>
        </button>
      </div>
      <div className=" mx-4 flex flex-col  gap-3 rounded-xl bg-white px-3 ">
        <div className=" md:block hidden  px-5 py-5">
          <p className="py-3 font-bold text-xl">فروشنده ها</p>
          <button className=" inline-block rounded-2xl border-2  border-black bg-white px-2 py-1">
            <p className=" text-lg">تمام ایران</p>
            <p className=" text-paszamine3">
              {productList?.seller_info[0].price}
              <span className="text-base"> ریال </span>
            </p>
          </button>
        </div>

        {productList.seller_info.map((s) => (
          <div className=" flex flex-col gap-3 border-b-2 border-asliDark last:border-0 border-dashed pb-2">
            <h2 className="mt-2 text-lg font-bold">
              {" "}
              {s.seller_name == "" ? "آرپوت مارکت" : s.seller_name}{" "}
            </h2>
            {/* 
            <div>
              {Open === false ? (
                <button
                  className="  flex rounded-full bg-green-100 px-3 py-1 text-green-900"
                  onClick={() => SetOpen(!Open)}
                >
                  <Star className=" scale-75" /> 5(8 ماه در ترب)
                  <KeyboardArrowDownIcon />
                </button>
              ) : (
                <button
                  className=" flex rounded-full bg-green-100 px-3 py-1 text-green-900"
                  onClick={() => SetOpen(!Open)}
                >
                  <KeyboardArrowUp />
                </button>
              )}
            </div>

            {Open && (
              <div className=" flex flex-col gap-3 rounded-lg bg-green-100 p-2">
                <p className=" font-bold">
                  امتیاز فروشگاه
                  <Star className=" scale-75" /> 5(8 ماه در ترب)
                </p>
                <p>حدود ۵۰ تا ۱۰۰ سفارش در ۹۰ روز اخیر فعالیت در ترب</p>
                <p>کاربری در ترب پیگیری سفارش ثبت نکرده است.</p>
                <div className=" flex gap-1">
                  <Button variant="outlined">پروفایل فروشگاه</Button>
                  <Button variant="outlined">شیوه ارزیابی فروشگاه</Button>
                </div>
              </div>
            )} */}
            <div className=" flex flex-col  md:ml-10 gap-4 justify-between pb-2">
              <p className=" text-gray-600">{s.description}</p>

              <div className=" flex flex-row justify-between gap-4">
                <h3 className=" font-semibold">
                  {" "}
                  قیمت {s.price ? s?.price : 0} ریال{" "}
                </h3>
                <Chip className="p-1 px-3 bg-rose-500 text-white rounded-xl  ">
                  تخفیف {s?.price} %
                </Chip>
                <Button
                  variant="contained"
                  className=" focus:bg-orange-600 hover:opacity-70 hover:bg-khas flex bg-khas rounded-xl "
                >
                  خرید از این فروشگاه
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDetails;
