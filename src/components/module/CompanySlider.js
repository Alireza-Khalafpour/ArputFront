"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import "../styles/BrandSlider.css"
import i1 from "../../../public/Icons/perspolis.webp";
import i2 from "../../../public/Icons/نگین.webp";
import i3 from "../../../public/Icons/hafez.jpg";
import i4 from "../../../public/Icons/48498640-3ca8-4e3f-be18-089dfcdb735a.jpg";
import i5 from "../../../public/Icons/32cf8874-5ad5-4f3d-b12a-a4de0a277fef.jpg";
import i6 from "../../../public/Icons/779b7133-a972-4453-8bc6-a528386d069c.jpg";
import i7 from "../../../public/Icons/مریم.webp";
import Image from 'next/image';


const CompanySlider = () => {
    return (
        <>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              modules={[Pagination,Autoplay]}
              className="mySwiper md:!block !hidden !py-8 "
            >
              <SwiperSlide className='rounded-full object-cover'> <Image fill src={i1} className='object-cover rounded-full !filter-none' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i3} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i4} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i5} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i2} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i6} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
              <SwiperSlide className='rounded-full object-cover ' ><Image fill src={i7} className='object-cover rounded-full !filter-none ' />  </SwiperSlide>
            </Swiper>
            <Swiper
              slidesPerView={2}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Pagination,Autoplay]}
              className="mySwiper md:!hidden !block "
            >
              <SwiperSlide className='rounded-full '> <Image fill src={i1} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full ' ><Image fill src={i2} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full ' ><Image fill src={i3} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full ' ><Image fill src={i4} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full ' ><Image fill src={i5} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full ' ><Image fill src={i6} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
              <SwiperSlide className='rounded-full  ' ><Image fill src={i7} className='object-cover rounded-full !filter-none '/>  </SwiperSlide>
            </Swiper>
        </>
    );
}

export default CompanySlider;