"use client";

import liveChatImg from "../../../public/images/live-chat.png";
import supportImg from "../../../public/images/abt_support.png";
import functionalImg from "../../../public/images/functional.png";
import secureImg from "../../../public/images/secure.png";
import mobileSwiper from "../../../public/images/features_frame-removebg-preview2.png";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Image from "next/image";
import pic1 from "../../../public/images/bc6828415417c9449992e9921114280d.png";
import pic2 from "../../../public/images/9205bd6a8c8f0e802a5e3728b33772f2.png";

import { useState } from "react";

const slides = [
  // { id: 1, content: "Slide 1" },
  { id: 1, content: pic1 },
  { id: 2, content: pic2 },
];

const FeaturesSectionMainPage = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="container  ">
        <div className="how_it_inner flex flex-col justify-center items-center gap-5 ">
          <div className="flex flex-col justify-center items-center">
            <div className="section_title">
              <h2 className="!text-3xl">
                <span className="!text-3xl"> ویژگی‌ها </span>ما را متفاوت میکند
              </h2>

              <p>
                {" "}
                با اپلیکیشن آرپوت مارکت می توانید محصولات و اشیاء مجازی را به
                صورت ۳ بعدی <br /> در محیط واقعی با گوشی های همراه خود، مشاهده
                کنید.{" "}
              </p>
            </div>
          </div>
          <div className="w-full flex md:flex-row flex-col justify-center items-center p-3 gap-5">
            <div className="md:w-1/2 w-full flex flex-col justify-start items-start p-2">
              <div className="flex flex-row w-full border-b-2 border-asliLight px-4 py-6 ">
                <div className="w-2/12">
                  <Image width={50} height={50} src={supportImg} alt="image" />
                </div>
                <div className="w-10/12 flex flex-col justify-start items-start gap-2">
                  <h4 className="text-asliLight"> واقعیت مجازی </h4>
                  <p>
                    {" "}
                    با اپلیکیشن واقعیت مجازی ما، خود را در محیط های ۳ بعدی از
                    پیش تعریف شده قرار دهید و حرکت کنید{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full border-b-2 border-asliLight px-4 py-6 ">
                <div className="w-2/12">
                  <Image width={50} height={50} src={liveChatImg} alt="image" />
                </div>
                <div className="w-10/12 flex flex-col justify-start items-start gap-2">
                  <h4 className="text-asliLight"> پاسخ گویی سریع </h4>
                  <p>
                    {" "}
                    در صورت بروز هر گونه مشکل پاسخ گوی شما کاربران عزیز در اسرع
                    وقت می باشیم
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full border-b-2 border-asliLight px-4 py-6 ">
                <div className="w-2/12">
                  <Image
                    width={50}
                    height={50}
                    src={functionalImg}
                    alt="image"
                  />
                </div>
                <div className="w-10/12 flex flex-col justify-start items-start gap-2">
                  <h4 className="text-asliLight"> چند سکویی </h4>
                  <p>قابلیت نصب بر روی سیستم عامل های اندروید و IOS</p>
                </div>
              </div>
              <div className="flex flex-row w-full border-b-2 border-asliLight px-4 py-6 ">
                <div className="w-2/12">
                  <Image width={50} height={50} src={secureImg} alt="image" />
                </div>
                <div className="w-10/12 flex flex-col justify-start items-start gap-2">
                  <h4 className="text-asliLight"> واقعیت افزوده </h4>
                  <p>
                    {" "}
                    با مشاهده ی کالای مورد نظر با قابلیت AR می توانید محصولات
                    دلخواه خود را متناسب با طراحی و تزئین خانه ی خود مقایسه و
                    خریداری کنید{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center p-2">
              <div className="relative rounded-[2rem] !max-w-96 !min-h-96 bg-center bg-cover object-cover flex justify-center items-center ">
                <button
                  onClick={prevSlide}
                  className="absolute right-[-20px] top-1/2 border-2 border-black rounded-full bg-paszamine2 text-asliDark w-14 h-14 z-20 "
                >
                  <ArrowRight />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute left-[-20px] top-1/2 border-2 border-black rounded-full bg-paszamine2 text-asliDark w-14 h-14 z-20"
                >
                  <ArrowLeft />
                </button>
                <Image
                  width={230}
                  height={230}
                  src={mobileSwiper}
                  alt="image"
                  className="z-10"
                />
                <div className="absolute text-center">
                  <Image
                    width={220}
                    height={420}
                    src={slides[current].content}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesSectionMainPage;
