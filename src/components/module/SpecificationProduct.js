"use client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { Close } from "@mui/icons-material";
import { Box, Drawer, Typography } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";

function SpecificationProduct({ productList }) {
  const [Show, SetShow] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className=" flex flex-col gap-2  px-5 basis-2/5 overflow-auto max-h-[100vh] py-3 ">
      {productList.features.map((i) => (
        <div className=" flex flex-col items-center justify-center gap-4 rounded-lg bg-white py-4">
          <p className="font-bold md:hidden text-center">مشخصات کلی </p>

          <table class="w-[95%] table-fixed">
            <tbody className=" text-right">
              <tr class="  odd:bg-gray-200 even:bg-white">
                <td className="rounded-s-lg p-1 text-lg"> ویژگی ها </td>
                <td className="rounded-e-lg text-right text-gray-500">
                  {" "}
                  {i.main_name} : {i.main_sample}
                </td>
              </tr>

              <tr class="odd:bg-gray-200 even:bg-white">
                <td className="rounded-s-lg p-1 text-lg font-bold py-2">
                  {" "}
                  مشخصات :{" "}
                </td>
              </tr>
              <tr class=" odd:bg-gray-200 even:bg-white">
                <td className="rounded-s-lg p-1 text-lg">وزن:</td>
                <td className=" rounded-e-lg text-right text-gray-500">
                  {productList.info[0] ? e2p(productList.info[0]?.weight) : "0"}{" "}
                </td>
              </tr>
              <tr class=" odd:bg-gray-200 even:bg-white">
                <td className="rounded-s-lg p-1 text-lg"> طول:</td>
                <td className=" rounded-e-lg text-right text-gray-500">
                  {" "}
                  {productList.info[0]
                    ? e2p(productList.info[0]?.width)
                    : "0"}{" "}
                </td>
              </tr>
              <tr class=" odd:bg-gray-200 even:bg-white">
                <td className="rounded-s-lg p-1 text-lg"> عرض:</td>
                <td className=" rounded-e-lg text-right text-gray-500">
                  {productList.info[0] ? e2p(productList.info[0]?.height) : "0"}{" "}
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            className={
              Show
                ? " hidden"
                : " text-center font-bold text-red-500 hover:bg-orange-100"
            }
            onClick={() => SetShow(!Show)}
          >
            نمایش تمام مشخصات
          </Button>

          {Show && windowSize[0] <= 768 && (
            <Drawer
              anchor="right"
              className=" relative "
              open={Show}
              // onClose={() => SetShow(false)}
            >
              <button onClick={() => SetShow(false)}>
                <Close className=" absolute right-2 top-2" />
              </button>
              <Box
                className=" flex  flex-col items-center gap-3"
                textAlign="center"
                p={2}
                role="presentation"
                maxWidth={500}
              >
                <Typography variant="h6" className=" w-full border-b ">
                  نمایش تمام مشخصات
                </Typography>

                <table class="w-[95%] table-fixed">
                  <tbody className=" text-right">
                    <tr class="  odd:bg-gray-200 even:bg-white">
                      <td className="rounded-s-lg p-1 text-lg"> ویژگی ها </td>
                      <td className="rounded-e-lg text-right text-gray-500">
                        {" "}
                        {i.main_name} : {i.main_sample}
                      </td>
                    </tr>

                    <tr class="odd:bg-gray-200 even:bg-white">
                      <td className="rounded-s-lg p-1 text-lg font-bold py-2">
                        {" "}
                        مشخصات :{" "}
                      </td>
                    </tr>
                    <tr class=" odd:bg-gray-200 even:bg-white">
                      <td className="rounded-s-lg p-1 text-lg">وزن:</td>
                      <td className=" rounded-e-lg text-right text-gray-500">
                        {productList.info[0]
                          ? e2p(productList.info[0]?.weight)
                          : "0"}{" "}
                      </td>
                    </tr>
                    <tr class=" odd:bg-gray-200 even:bg-white">
                      <td className="rounded-s-lg p-1 text-lg"> طول:</td>
                      <td className=" rounded-e-lg text-right text-gray-500">
                        {" "}
                        {productList.info[0]
                          ? e2p(productList.info[0]?.width)
                          : "0"}{" "}
                      </td>
                    </tr>
                    <tr class=" odd:bg-gray-200 even:bg-white">
                      <td className="rounded-s-lg p-1 text-lg"> عرض:</td>
                      <td className=" rounded-e-lg text-right text-gray-500">
                        {productList.info[0]
                          ? e2p(productList.info[0]?.height)
                          : "0"}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className=" flex w-[95%] flex-col gap-3 text-right">
                  <p className="  font-bold text-xl text-center">
                    مشخصات بیشتر
                  </p>
                  <div>
                    <h3 className=" font-bold">توضیحات :</h3>
                    <h2> {productList.seller_info[0]?.description} </h2>
                  </div>
                </div>
              </Box>
            </Drawer>
          )}
          {Show && windowSize[0] > 768 && (
            <div className=" flex w-[95%] flex-col gap-3 text-right">
              <p className="  font-bold text-xl text-center">مشخصات بیشتر</p>
              <div>
                <h3 className=" font-bold">توضیحات :</h3>
                <h2> {productList.seller_info[0]?.description} </h2>
              </div>
              <div className=" text-center">
                <Button
                  className={
                    !Show
                      ? " hidden"
                      : " text-center font-bold text-red-500 hover:bg-orange-100 "
                  }
                  onClick={() => SetShow(!Show)}
                >
                  عدم نمایش مشخصات بیشتر
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SpecificationProduct;
