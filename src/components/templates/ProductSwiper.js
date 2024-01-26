'use client'

import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const ProductSwiper = ({title}) => {


  const [items, setItems] = useState([])

  useEffect(() =>{
      GetItems()
  },[])

  async function GetItems () {
      await axios.get('https://supperapp-backend.chbk.run/Product/products?page=0&limit=18', {
          headers:{
            'accept': 'application/json',
          }
          })
          .then((response) => {
            setItems(response.data.data)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
  }


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
          280: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
        }}
        
      >

        {
          items?.map((i) => 
          (
            // <Link href={`/products/${i.id}`} className='w-full h-full z-10'>

              <SwiperSlide
                className=' !flex flex-col gap-1 justify-center items-center cursor-pointer '
              >
                <Link href={`/products/${i.id}`}style={{backgroundImage: `url(${i.image_url})`}} className='bg-[auto 100%] bg-center bg-no-repeat border-2 rounded-lg overflow-hidden w-[130px] h-[150px] transition-all duration-500 flex justify-center items-center bg-red-100 '>
                </Link>
                <span className='font-semibold text-asliDark w-full' > {i.name} </span>
              </SwiperSlide>
            // </Link>
          ))
        }



      </Swiper>
    </div>
  );
};

export default ProductSwiper;