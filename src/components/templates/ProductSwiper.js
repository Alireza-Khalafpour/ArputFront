'use client'

import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';


const ProductSwiper = ({title}) => {

  return (
    <div className='w-full text-center' >

      <h1 className='hover:text-khas max-w-max hover:cursor-pointer font-bold text-2xl' > {title} </h1>
      <br />
      <Swiper
        className='!block relative'
        // modules={[Navigation, Pagination, A11y]}
        spaceBetween={1}
        allowSlideNext={true}
        breakpoints={{
          480: { slidesPerView: 3 },
          740: { slidesPerView: 4 },
          1275: { slidesPerView: 7 },
        }}
        
      >

          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer '
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>
          <SwiperSlide
            className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
          >
            <div className='test border-2 rounded-lg overflow-hidden w-[130px] h-[150px] hover:w-[210px] hover:z-50 transition-all duration-500 flex justify-center items-center bg-red-500 '>
                <div className='w-[210px] hover:z-50 h-[150px] flex flex-col justify-center items-end p-4 text-transparent hover:text-white transition-all duration-500 bg-transparent hover:bg-[#09090993]  ' >
                    <h2 className='text-lg'> نام کالای کاشی یا تایل آرپوت سرام </h2>
                    <p className='text-sm'> ابعاد بزرگ </p>
                </div>
            </div>
            <span className='text-khas w-full' > Tile </span>
          </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default ProductSwiper;