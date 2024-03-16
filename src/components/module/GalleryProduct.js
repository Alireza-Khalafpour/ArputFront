"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../styles/GalleryProduct.css";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { useState } from "react";

function GalleryProduct({ productList }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const [openImages, setOpenImages] = useState(false);

  const handleClickOpenImages = () => {
      setOpenImages(true);
  };

  const handleCloseImages = () => {
      setOpenImages(false);
  };

  function handleImage(e) {
    console.log(e.target);
  }




  return (
    <>
      <div className=" md:hidden block">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className=" items-center"
        >
          <SwiperSlide>
            <Image
              className="hover:blur-sm "
              src={productList?.image_url[0]}
              alt={productList?.image_url[0]}
              width={200}
              height={200}
              onClick={(e) => handleImage(e)}
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Image
              src={productList.image_url[1]}
              alt={productList.image_url[0]}
              width={200}
              height={200}
              onClick={(e) => handleImage(e)}
            />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={productList.image_url[2]}
              alt={productList.image_url[0]}
              width={200}
              height={200}
              onClick={(e) => handleImage(e)}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={productList.image_url[3]}
              alt={productList.image_url[0]}
              width={200}
              height={200}
              onClick={(e) => handleImage(e)}
            />
          </SwiperSlide> */}
        </Swiper>
      </div>
      <div className=" w-[400px] m-auto  flex-row-reverse h-[350px] hidden md:flex">
        <Swiper
          style={{
            "--swiper-navigation-color": "#FF9900",
            "--swiper-pagination-color": "#FF9900",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper2 h-full  w-[350px] `}
        >
          <SwiperSlide>
            <Image
            
              className="hover:cursor-pointer "
              width={350}
              height={350}
              src={productList?.image_url[0]}
              alt={productList?.image_url[0]}
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Image
              width={350}
              height={350}
              src={productList.image_url[1]}
              alt={productList.image_url[0]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={350}
              height={350}
              src={productList.image_url[2]}
              alt={productList.image_url[0]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={350}
              height={350}
              src={productList.image_url[3]}
              alt={productList.image_url[0]}
            />
          </SwiperSlide> */}
        </Swiper>



        {/* <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          direction="vertical"
          className={`mySwiper flex h-full w-[100px] `}
        >
          {
            productList.image_url[0]
            ?
            <SwiperSlide>
              <Image
                width={100}
                height={100}
                src={productList.image_url[0]}
                alt={productList.image_url[0]}
              />
            </SwiperSlide>

            :
            null
          }
                    {
            productList.image_url[1]
            ?
            <SwiperSlide>
              <Image
                width={100}
                height={100}
                src={productList.image_url[1]}
                alt={productList.image_url[0]}
              />
            </SwiperSlide>

            :
            null
          }
                    {
            productList.image_url[2]
            ?
            <SwiperSlide>
              <Image
                width={100}
                height={100}
                src={productList.image_url[2]}
                alt={productList.image_url[0]}
              />
            </SwiperSlide>

            :
            null
          }
          {
            productList.image_url[3]
            ?
            <SwiperSlide>
              <Image
                width={100}
                height={100}
                src={productList.image_url[3]}
                alt={productList.image_url[0]}
              />
            </SwiperSlide>

            :
            null
          }
        </Swiper> */}

          {/* <ImageGalleryModal openImages={openImages} handleCloseImages={handleCloseImages} /> */}

      </div>
    </>
  );
}

export default GalleryProduct;
