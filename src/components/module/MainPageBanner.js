"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import pic1 from "../../../public/images/premium_photo-1661962720375-ce9097fb4d69.png";
import pic2 from "../../../public/images/AR-Banner1.jpg";
import pic3 from "../../../public/images/AR-B1.jpg";
import pic4 from "../../../public/images/AR-B2.webp";

import { useRef } from "react";
import Link from "next/link";
import { Movie } from "@mui/icons-material";

const MainPageBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        autoplay={{
          delay: 3500,
        }}
        loop={true}
        className="mySwiper"
        style={{ width: "100%", height: "100%", position: "relative" }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        <SwiperSlide className=" relative w-full h-full">
          <Link
            className="shadow-2xl shadow-asliLight bg-white rounded-xl p-2  absolute !z-30 bottom-1 right-5 cursor-pointer "
            href="https://www.aparat.com/v/o497gw8"
            target="_blank"
          >
            {" "}
            <Movie className=" text-3xl text-asliLight" /> ویدیو{" "}
          </Link>
          <Image fill src={pic1} className="object-cover rounded-xl " />
        </SwiperSlide>
        <SwiperSlide>
          <Image fill src={pic2} className="object-cover rounded-xl " />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <Image fill src={pic3} className="object-cover rounded-xl " />
        </SwiperSlide>
        <SwiperSlide>
          <Image fill src={pic4} className="object-cover rounded-xl " />
        </SwiperSlide>

        {/* <button ref={prevRef} className="swiper-button-next absolute bg-red-400 p-3 border-2 border-black ">ss</button>
        <button ref={prevRef} className="swiper-button-prev">aa</button> */}
      </Swiper>
    </>
  );
};

export default MainPageBanner;
