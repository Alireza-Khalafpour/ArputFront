"use client";

import {
  GridViewOutlined,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
  KeyboardDoubleArrowUp,
  ViewWeekOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/MySlider.css";
import Image from "next/image";
import { e2p } from "@/utils/replaceNumbers";
import Link from "next/link";
import { Badge } from "@mui/joy";
import { Fade } from "react-reveal";
import ShopsModalForPulseInMainPage from "../module/ShopsModalForPulseInMainPage";
import { numberToWords } from "@persian-tools/persian-tools";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import './styles.css';
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Divider } from "@mui/material";

const MySlider = ({ title, data }) => {
  const [expand, setExpand] = useState(false);
  const [items, setItems] = useState([]);
  //------------
  const [totalWidth, setTotalWidth] = useState(1200);
  // -----------
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [displayStores, setDisplayStore] = useState(false);
  const [pre_product_id, set_pre_product_id] = useState("");

  // گرفتن لیست شاپ ها-----------------------------

  async function GetShopList(i) {
    setDisplayStore(true);
    setLoading(true);
    set_pre_product_id(i.id);
    console.log(i);
    await axios
      .get(`${process.env.NEXT_PUBLIC_URL}/product/product/${i.id}`)
      .then((response) => {
        setShops(response.data.seller_info);
        setLoading(false);
      });
  }
  // -------------------------------------------------

  useEffect(() => {
    if (data?.length > 0) {
      setItems(data);
    } else {
      GetItems();
    }
    const totalW = document?.getElementById("noScroll");
    setTotalWidth(totalW?.scrollWidth);
  }, []);

  async function GetItems() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_URL}/product/products?page=0&limit=18`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  function handleExpand() {
    setExpand((p) => !p);
    setTimeout(() => {
      document.getElementById("noScroll").scrollTo(0, 0);
    }, 350);
  }

  function handleExpandButtons(e) {
    setExpand(e);
    setTimeout(() => {
      document.getElementById("noScroll").scrollTo(0, 0);
    }, 350);
  }

  function scrollLeft() {
    document.getElementById("noScroll").scrollBy(-1200, 0);
  }

  function scrollRight() {
    document.getElementById("noScroll").scrollBy(1200, 0);
  }

  return (
    <>
      {
        <div
          className={`w-full relative overflow-hidden py-2 px-10 max-h-max ${
            title == "نتایج" ? "backdrop-blur-xl bg-blue-100" : ""
          } `}
        >
          {expand == true ? null : (
            <>
              <button
                onClick={() => scrollRight()}
                className="pervious absolute top-36 right-0 w-12 h-12 text-center flex justify-center items-center bg-paszamine3 hover:border-black border-2 rounded-full text-white font-semibold z-30  transition-all duration-700"
              >
                {" "}
                <KeyboardDoubleArrowRightOutlined />{" "}
              </button>
              <button
                onClick={() => scrollLeft()}
                className="next absolute top-36 left-0 w-12 h-12 text-center flex justify-center items-center bg-paszamine3 hover:border-black border-2 rounded-full text-white font-semibold z-30 transition-all duration-700"
              >
                {" "}
                <KeyboardDoubleArrowLeftOutlined />{" "}
              </button>
            </>
          )}
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="hover:text-khas max-w-max hover:cursor-pointer font-bold text-2xl">
              {" "}
              {title}{" "}
            </h1>
            <div className="flex gap-2">
              <GridViewOutlined
                onClick={() => handleExpandButtons(true)}
                className={`p-2 ${
                  expand ? "bg-slate-300" : null
                } rounded-2xl cursor-pointer hover:p-1 border-2 border-paszamine2 w-12 h-12 transition-all duration-300`}
              />
              <ViewWeekOutlined
                onClick={() => handleExpandButtons(false)}
                className={`p-2 ${
                  expand ? null : "bg-slate-300"
                } rounded-2xl cursor-pointer hover:p-1 border-2 border-paszamine2 w-12 h-12 transition-all duration-300`}
              />
            </div>
          </div>
          <br />

          <Fade bottom cascade>
            <div
              id="noScroll"
              className={`w-full flex flex-row px-10 justify-start items-center !scroll-smooth ${
                expand
                  ? "!overflow-y-scroll !overflow-x-hidden flex-wrap"
                  : "!overflow-y-hidden !overflow-x-scroll min-w-max"
              } gap-10 !max-h-[70vh] ${
                expand ? "h-[70vh]" : "h-48"
              } transition-all duration-700  `}
            >
              {items?.map((i) => (
                <>
                  <button
                    onClick={() => GetShopList(i)}
                    key={i?.id}
                    style={{ backgroundImage: `url(${i?.image_url})` }}
                    // className=" relative sliderCard h-48 bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[15%] relative before:rounded-xl"
                    className=" relative sliderCard h-48 bg-[auto 100%] bg-center bg-no-repeat hover:!min-w-[25%]  transition-all duration-700 rounded-xl cursor-pointer !min-w-[15%] relative before:rounded-xl"
                  >
                    <div
                      id="info"
                      className=" transition-all duration-700 text-xl text-white absolute bottom-5 right-3 gap-5 "
                    >
                      <h2> {i?.name} </h2>
                      {data ? null : (
                        <h3 className="text-sm">
                          {" "}
                          موجود در{" "}
                          {i.shop_number
                            ? numberToWords(i?.shop_number)
                            : ""}{" "}
                          فروشگاه{" "}
                        </h3>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 !bg-transparent">
                      {" "}
                      {i?.has_bundle == true ? (
                        <div className="rounded-full w-4 h-4 bg-green-700 text-white "></div>
                      ) : null}{" "}
                    </div>
                  </button>
                </>
              ))}
            </div>
          </Fade>
          <Divider className="py-6" />

          <ShopsModalForPulseInMainPage
            pre_product_id={pre_product_id}
            loading={loading}
            displayStores={displayStores}
            setDisplayStore={setDisplayStore}
            shops={shops}
          />
        </div>
      }
    </>
  );
};

export default MySlider;
