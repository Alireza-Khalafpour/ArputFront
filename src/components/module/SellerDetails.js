"use client";


import { KeyboardArrowUp, ShoppingCart, Star } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Chip } from "@mui/material";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { useState } from "react";

function SellerDetails({ productList }) {
  console.log(productList?.seller_info[0].price);
  const [Open, SetOpen] = useState(false);
  return (
    <div className=" basis-3/5 w-full">
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
            <div className=" text-paszamine3 flex flex-row justify-around items-center gap-2 w-1/3 inline-block rounded-2xl border-2  border-black bg-white px-2 py-1 ">
              <p>
              قیمت از:
              {digitsEnToFa(addCommas(productList?.min_price))}
              ریال
              </p>
              <p>
              تا :
              {digitsEnToFa(addCommas(productList?.max_price))}
              ریال
              </p>
              
            </div>
        </div>

        {productList?.seller_info.map((s) => (
          <div className=" flex flex-col gap-3 border-b-2 border-asliDark last:border-0 border-dashed pb-2">

            <div className=" flex flex-col  md:ml-10 gap-4 justify-between pb-2">
              {/* <p className=" text-gray-600">{s.description}</p> */}

              <div className=" flex flex-row justify-between gap-4 py-4">
            <h2 className="mt-2 text-lg font-bold">
              {" "}
              {s?.seller_name == "" ? "آرپوت مارکت" : s?.seller_name}{" "}
            </h2>
                <h3 className=" font-semibold">
                  {" "}
                  قیمت {s?.price ? digitsEnToFa(addCommas(s?.price)) : 0} ریال{" "}
                </h3>
                <Button
                  variant="contained"
                  className=" focus:bg-orange-600 hover:opacity-70 hover:bg-khas flex bg-khas rounded-xl "
                >
                    مشاهده فروشگاه
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
