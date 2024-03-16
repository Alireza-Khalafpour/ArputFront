"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import "../styles/BrandSlider.css"
import i1 from "../../../public/Icons/پرسپولیس.webp";
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



// "use client"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import "../styles/BrandSlider.css"
// import { useEffect, useState } from 'react';
// import axios from 'axios';


// const CompanySlider = () => {

//   const [brandInfo, setBrandInfo] = useState([])

//   async function GetBrandData() {
      
//     await axios.get("https://supperapp-backend.chbk.run/template/brand/data")
//       .then((response) => {
//         setBrandInfo(response.data.data)
//         console.log(response.data.data)
//       })
//       .catch((error) => {
//         console.log(error, "Error");
//       });
//   }

//   useEffect(() => {
//     GetBrandData()
//   },[])


//     return (
//         <>
//             <Swiper
//               slidesPerView={4}
//               spaceBetween={30}
//               pagination={{
//                 clickable: true,
//               }}
//               autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: false,
//               }}
//               modules={[Pagination,Autoplay]}
//               className="mySwiper md:!block !hidden "
//             >
//               {
//                 brandInfo?.map((i) => (
//                   <SwiperSlide style={{backgroundImage: `url(${i?.brand_logo})`}} className="bg-[auto 100%] bg-center bg-no-repeat !transition-all !duration-700 rounded-xl cursor-pointer !min-w-[13%]" key={i?.brand_name} > </SwiperSlide>
//                 ))
//               }

//             </Swiper>
//             <Swiper
//               slidesPerView={2}
//               pagination={{
//                 clickable: true,
//               }}
//               autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: false,
//               }}
//               modules={[Pagination,Autoplay]}
//               className="mySwiper md:!hidden !block "
//             >
//               {
//                 brandInfo?.map((i) => (
//                   <SwiperSlide style={{backgroundImage: `url(${i?.brand_logo})`}} className="bg-[auto 100%] bg-center bg-no-repeat !transition-all !duration-700 rounded-xl cursor-pointer !min-w-[13%]" key={i?.brand_name} > </SwiperSlide>
//                 ))
//               }            
//             </Swiper>
//         </>
//     );
// }

// export default CompanySlider;