'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ShopsModalForPulseInMainPage from '../module/ShopsModalForPulseInMainPage';


const ProductSwiper = ({title}) => {

  const url = process.env.NEXT_PUBLIC_URL


  const [items, setItems] = useState([])

    // -----------
    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([]);
    const [displayStores, setDisplayStore] = useState(false)
    const [pre_product_id, set_pre_product_id] = useState("")


    // گرفتن لیست شاپ ها-----------------------------

    async function GetShopList(i) {
        setDisplayStore(true)
        setLoading(true)
        set_pre_product_id(i.id)
        console.log(i)
        await axios.get(`${url}/product/product/${i.id}`).then((response) => {
            setShops(response.data.seller_info)
            setLoading(false)
        });
    }
    // -------------------------------------------------

  useEffect(() =>{
      GetItems()
  },[])

  async function GetItems () {
      await axios.get(`${url}/product/products?page=0&limit=18`, {
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
                className=' !flex flex-col gap-1 justify-center items-center cursor-pointer'
              >
                <button onClick={() => GetShopList(i)} style={{backgroundImage: `url(${i.image_url})`}} className=' bg-[auto 100%] bg-center bg-no-repeat border-2 rounded-lg overflow-hidden w-[130px] h-[150px] transition-all duration-500 flex justify-center items-center bg-red-100 '>
                </button>
                <span className='font-semibold text-asliDark w-full text-sm text-pretty' > {i.name} </span>
              </SwiperSlide>
            // </Link>
          ))
        }



      </Swiper>

      <ShopsModalForPulseInMainPage pre_product_id={pre_product_id} loading={loading} displayStores={displayStores} setDisplayStore={setDisplayStore} shops={shops} />

    </div>
  );
};

export default ProductSwiper;