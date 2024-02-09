
import ProductSwiper from "@/components/templates/ProductSwiper";
import Partnership from "../../public/images/Partnership.svg"
import shoppingBag from "../../public/images/ShoppingBag.svg"
import Discount from "../../public/images/Discount.gif"
import {  ShoppingCart, VerifiedUser } from "@mui/icons-material";
import Link from "next/link";
import BrandSlider from "@/components/module/BrandSlider";
import MySlider from "@/components/templates/MySlider";
import GoogleArAppModal from "@/components/module/GoogleArAppModal";
import { Divider} from "@mui/joy";
import TimerCountDown from "@/components/templates/TimerCountDown";

import featureFrame from "../../public/images/features_frame.png"
import liveChatImg from "../../public/images/live-chat.png"
import supportImg from "../../public/images/abt_support.png"
import functionalImg from "../../public/images/functional.png"
import secureImg from "../../public/images/secure.png"
import standard from "../../public/images/standard.png"
import ultimate from "../../public/images/unlimited.png"
import premium from "../../public/images/premium.png"


import "../components/styles/LandingPageStyles/aos.css"
// import "../components/styles/LandingPageStyles/bootstrap.min.css"
// import "../components/styles/LandingPageStyles/icofont.min.css"
// import "../components/styles/LandingPageStyles/owl.carousel.min.css"
import "../components/styles/LandingPageStyles/responsive.css"
import "../components/styles/LandingPageStyles/style.css"
import Image from "next/image";
import BannerVideoMainPage from "@/components/module/BannerVideoMainPage";





export default function Home() {


  return (
      <div className="flex flex-col gap-20 p-8 md:max-w-[90%] w-full mx-auto " >


        <section className="banner_section">
              
              <div className="container">
               
                <div className="row flex md:flex-row flex-col justify-center items-center">
                  <div className="md:w-1/2 w-full" >
                   
                    <div className="banner_text">
                      
                      <h1>آرپـــوت</h1>
                      
                      <h2> نمایش محصول در <span> محیط واقعی </span> با گوشی همراه !!! </h2>
                     
                    </div>
                    
                      <GoogleArAppModal/>
                    

                  </div>

                 
                  <div className="md:w-1/2 w- flex justify-center items-center text-center" >

                    <BannerVideoMainPage/>

                  </div>
                  

                </div>
                
              </div>
              
            </section>





















        <div className="flex md:flex-row flex-col justify-center items-center w-full md:gap-2 gap-10 rounded-3xl p-1 bg-[#ef3d52df]" >

          <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-10 justify-center items-center" >
            <Image src={Discount} width={260} height={260} className="rounded-3xl" />
            <h2 className="text-white font-bold text-3xl text-center" >
               تخفیف ثبت فروشگاه 
               <br/>
               <br/>
               <Link href="/signin" className="cursor-pointer rounded-xl bg-khas !text-base p-3 hover:bg-orange-600 " > همین الان ثبت نام کنید </Link>
            </h2>
          </div>
        
          <div className="md:w-1/2 w-full" >
            <TimerCountDown/>
          </div>

        </div>


        {/* <div className="flex flex-col gap-12 justify-center w-full items-center" > */}
        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-4" ></span>  دسته بندی ها  <span className="h-full w-[2px] border-2 border-khas mx-4" ></span> </div>


        <div className="md:block hidden" >
          <MySlider title=" پرفروش ها " />
        </div>

        <div className="md:block hidden" >
          <MySlider title=" سرامیک " />
        </div>


          <div className="w-full md:hidden block " >
            <ProductSwiper title=" پرفروش ها " />
          </div>

          <div className="w-full md:hidden block " >
            <ProductSwiper title=" سرامیک " />
          </div>



          <section class="row_am features_section" id="features">

            <div class="container">
              <div class="section_title">

                <h2><span> ویژگی‌ها </span>ما را متفاوت میکند</h2>

                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br/> چاپگرها و متون بلکه روزنامه با استفاده از طراحان گرافیک است. </p>
              </div>
              <div class="feature_detail">

                <div class="left_data feature_box ">

                  <div class="data_block">
                    <div class="icon">
                      <Image width={60} height={60} src={secureImg} alt="image" />
                    </div>
                    <div class="text text-right">
                      <h4>داده امن</h4>
                      <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،</p>
                    </div>
                  </div>

                  <div class="data_block">
                    <div class="icon">
                      <Image width={60} height={60} src={functionalImg} alt="image" />
                    </div>
                    <div class="text text-right">
                      <h4>کاملا کاربردی</h4>
                      <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                    </div>
                  </div>
                </div>


                <div class="right_data feature_box">

                  <div class="data_block">
                    <div class="icon">
                      <Image width={60} height={60} src={liveChatImg} alt="image" />
                    </div>
                    <div class="text">
                      <h4>چت زنده</h4>
                      <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،</p>
                    </div>
                  </div>


                  <div class="data_block">
                    <div class="icon">
                      <Image width={60} height={60} src={supportImg} alt="image" />
                    </div>
                    <div class="text">
                      <h4>پشتبانی شبانه روزی</h4>
                      <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                    </div>
                  </div>

                </div>

                <div class="feature_img">
                  <Image src={featureFrame} width={270} height={570} alt="image" />
                </div>
              </div>
            </div>

          </section>


          <section class="row_am pricing_section" id="pricing">

            <div class="container text-center mx-auto flex flex-col justify-center items-center ">
              <div class="section_title">

                <h2>بهترین و ساده ترین <span>قیمت‌گذاری</span></h2>

                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br/> چاپگرها و متون بلکه روزنامه با استفاده از طراحان گرافیک است. </p>
              </div>

              <div class="toggle_block">
                <span class="month active">ماهانه</span>
                <div class="tog_block">
                  <span class="tog_btn"></span>
                </div>
                <span class="years">سالانه</span>
                <span class="offer">50% تخفیف</span>
              </div>


              <div class="pricing_pannel monthly_plan active w-full">

                <div class="row flex flex-row justify-center items-center w-full gap-8">

                  <div class="w-1/3">
                    <div class="pricing_block">
                      <div class="icon">
                        <Image width={60} height={60} src={standard} alt="image" className="mx-auto" />
                      </div>
                      <div class="pkg_name">
                        <h3>استاندارد</h3>
                        <span>برای شروع </span>
                      </div>
                      <span class="price">15 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>تا پنج عدد وبسایت</p>
                        </li>
                        <li>
                          <p>50 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>10 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>2 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی درخواستها</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>

                  <div class="w-1/3">
                    <div class="pricing_block highlited_block">
                      <div class="icon">
                        <Image width={60} height={60} src={ultimate} alt="image" className="mx-auto" />
                      </div>
                      <div class="pkg_name">
                        <h3>نامحدود</h3>
                        <span>برای حرفه ای ها</span>
                      </div>
                      <span class="price">99 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>وبسایت نامحدود</p>
                        </li>
                        <li>
                          <p>200 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>20 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>10 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی شبانه روزی</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>


                  <div class="w-1/3">
                    <div class="pricing_block">
                      <div class="icon">
                        <Image width={60} height={60} src={premium} alt="image" className="mx-auto" />
                      </div>
                      <div class="pkg_name">
                        <h3>پریمیوم</h3>
                        <span>برای تیم های کوچک</span>
                      </div>
                      <span class="price">55 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>تا ده عدد وبسایت</p>
                        </li>
                        <li>
                          <p>100 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>15 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>4 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی شبانه روزی</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>
                </div>

              </div>

              <div class="pricing_pannel yearly_plan w-full ">
                <div class="row flex flex-row justify-center items-center w-full ">

                  <div class="col-md-4">
                    <div class="pricing_block">
                      <div class="icon">
                        <Image width={60} height={60} src={standard} alt="image" />
                      </div>
                      <div class="pkg_name">
                        <h3>استاندارد</h3>
                        <span>برای شروع </span>
                      </div>
                      <span class="price">150 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>تا ده عدد وبسایت</p>
                        </li>
                        <li>
                          <p>100 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>25 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>4 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی درخواستها</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>


                  <div class="col-md-4">
                    <div class="pricing_block highlited_block">
                      <div class="icon">
                        <Image width={60} height={60} src={ultimate} alt="image" />
                      </div>
                      <div class="pkg_name">
                        <h3>نامحدود</h3>
                        <span>برای حرفه ای ها</span>
                      </div>
                      <span class="price">999 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>وبسایت نامحدود</p>
                        </li>
                        <li>
                          <p>400 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>40 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>20 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی شبانه روزی</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>


                  <div class="col-md-4">
                    <div class="pricing_block">
                      <div class="icon">
                        <Image width={60} height={60} src={premium} alt="image" />
                      </div>
                      <div class="pkg_name">
                        <h3>پریمیوم</h3>
                        <span>برای تیم های کوچک</span>
                      </div>
                      <span class="price">550 تومان</span>
                      <ul class="benifits">
                        <li>
                          <p>تا بیست عدد وبسایت</p>
                        </li>
                        <li>
                          <p>200 گیگ فضای دیسک</p>
                        </li>
                        <li>
                          <p>25 صفحه داخلی سفارشی</p>
                        </li>
                        <li>
                          <p>8 دسترسی دامنه</p>
                        </li>
                        <li>
                          <p>پشتیبانی شبانه روزی</p>
                        </li>
                      </ul>
                      <a href="contact.html" class="btn white_btn">سفارش دهید</a>
                    </div>
                  </div>

                </div>
              </div>


            </div>

          </section>



        <div className="w-full text-center mx-auto md:text-3xl text-xl  gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-3" ></span>  همکاری با کارخانه ها و فروشگاه ها  <span className="h-full w-[2px] border-2 border-khas mx-3" ></span> </div>

            
        


      </div>

  )
}
