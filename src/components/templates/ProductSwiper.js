'use client'

import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';


const ProductSwiper = () => {

  return (
    <div>
      <h1 className='border-b border-khas font-bold text-lg' > کاشی و سرامیک </h1>
      <br />
      <Swiper
        className='!flex !flex-row !relative'
        // modules={[Navigation, Pagination, A11y]}
        spaceBetween={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          740: { slidesPerView: 3 },
          1275: { slidesPerView: 8 },
        }}

      >

          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 border-blue-500 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Mad Max Film </span>
          </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default ProductSwiper;