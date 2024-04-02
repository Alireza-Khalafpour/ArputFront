
import ProductSwiper from "@/components/templates/ProductSwiper";
import Partnership from "../../public/images/Partnership.svg"
import shoppingBag from "../../public/images/ShoppingBag.svg"
import Discount from "../../public/images/Discount.gif"
import {  EmailRounded, Phone, ShoppingCart, VerifiedUser } from "@mui/icons-material";
import Link from "next/link";
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
import step1 from "../../public/images/step1.png"
import step2 from "../../public/images/step2.png"
import step3 from "../../public/images/step3.png"




import "../components/styles/LandingPageStyles/aos.css"
// import "../components/styles/LandingPageStyles/owl.carousel.min.css"
import "../components/styles/LandingPageStyles/responsive.css"
import "../components/styles/LandingPageStyles/style.css"
import Image from "next/image";
import BannerVideoMainPage from "@/components/module/BannerVideoMainPage";
import CompanySlider from "@/components/module/CompanySlider";






export default function Home() {


  return (
      <div className="flex flex-col gap-20 p-8 md:max-w-[90%] w-full mx-auto " >


        <section className="banner_section">
              
              <div className="container">
               
                <div className="row flex md:flex-row flex-col md:gap-0 gap-14 justify-center items-center">
                  <div className="md:w-1/2 w-full md:gap-0 gap-14 " >
                   
                    <div className="banner_text ">
                      
                      <h1 className="md:text-9xl text-xl "  >آرپـــوت</h1>
                      
                      <h2 > نمایش محصول در <span> محیط واقعی </span> با گوشی همراه !!! </h2>
                     
                    </div>
                    
                      <GoogleArAppModal/>
                    

                  </div>

                 
                  <div className="md:w-1/2 flex justify-center items-center text-center" >

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

        <Divider></Divider>


        {/* <div className="flex flex-col gap-12 justify-center w-full items-center" > */}
        <div className="w-full text-center mx-auto text-3xl gap-4" > <span className="h-full w-[2px] border-2 border-khas mx-4" ></span>  دسته بندی ها  <span className="h-full w-[2px] border-2 border-khas mx-4" ></span> </div>


        <div className="w-full md:block hidden " >
          <MySlider title=" جذاب ترین ها " />
        </div>

        <div className="w-full md:block hidden " >
          <MySlider title=" سرامیک " />
        </div>



          <div className="w-full md:hidden block " >
            <ProductSwiper title=" جذاب ترین ها " />
          </div>

          <div className="w-full md:hidden block " >
            <ProductSwiper title=" سرامیک " />
          </div>



          <section className="row_am features_section" id="features">

            <div className="container">
              <div className="section_title">

                <h2><span> ویژگی‌ها </span>ما را متفاوت میکند</h2>

                <p> با اپلیکیشن آرپوت مارکت می توانید محصولات و اشیاء مجازی را به صورت ۳ بعدی <br/> در محیط واقعی با گوشی های همراه خود، مشاهده کنید. </p>
              </div>
              <div className="feature_detail">

                <div className="left_data feature_box md:!text-left !text-center lg:mr-5 mr-0 ">

                  <div className="data_block">
                    <div className="icon flex justify-center ">
                      <Image width={60} height={60} src={secureImg} alt="image" />
                    </div>
                    <div className="text text-center">
                      <h4> واقعیت افزوده </h4>
                      <p> با مشاهده ی کالای مورد نظر با قابلیت AR می توانید محصولات دلخواه خود را متناسب با طراحی و تزئین خانه ی خود مقایسه و خریداری کنید </p>
                    </div>
                  </div>

                  <div className="data_block">
                    <div className="icon flex justify-center ">
                      <Image width={60} height={60} src={functionalImg} alt="image" />
                    </div>
                    <div className="text  text-center">
                      <h4> چند سکویی </h4>
                      <p>  قابلیت نصب بر روی سیستم عامل های اندروید و IOS  </p>
                    </div>
                  </div>
                </div>


                <div className="right_data feature_box md:!text-right !text-center lg:ml-5 ml-0 ">

                  <div className="data_block">
                    <div className="icon flex justify-center">
                      <Image width={60} height={60} src={liveChatImg} alt="image" />
                    </div>
                    <div className="text text-center">
                      <h4> پاسخ گویی سریع </h4>
                      <p> در صورت بروز هر گونه مشکل پاسخ گوی شما کاربران عزیز در اسرع وقت می باشیم </p>
                    </div>
                  </div>


                  <div className="data_block">
                    <div className="icon flex justify-center ">
                      <Image width={60} height={60} src={supportImg} alt="image" />
                    </div>
                    <div className="text text-center">
                      <h4> واقعیت مجازی </h4>
                      <p> با اپلیکیشن واقعیت مجازی ما، خود را در محیط های ۳ بعدی از پیش تعریف شده قرار دهید و حرکت کنید </p>
                    </div>
                  </div>

                </div>

                <div className="feature_img lg:!block !hidden ">
                  <Image src={featureFrame} width={270} height={570} alt="image" />
                </div>
              </div>
            </div>

          </section>



          <section class="row_am how_it_works" id="how_it_work">
            <div class="container">
              <div class="how_it_inner">
                <div class="section_title">
                  <h2 className="mb-12" > <span>نحوه کار</span> -سه قدم آسان</h2>
                  <p className="mb-12" >  ابتدا اپلیکیشن آرپوت مارکت را از طریق سامانه ی www.arputmarket.com،
                    بازار و یا playstore دانلود کنید.  <br/>   سپس با دانلود و به روز رسانی پیش نیاز آن (Google play services for AR ) می توانید وارد اپلیکیشن شوید و محصول مور نظر را در محیط واقعی آرپوت کنید!!  </p>
                </div>  
                <div class="step_block">

                <div class="w-full flex justify-between items-center md:flex-row flex-col  ">

                  <div class="md:w-1/3 w-full flex justify-center items-center">
                    <div class="step_box">

                        <div class="step_img">
                          <Image className="m-auto" src={step1} width={75} height={75} alt="image" />
                          <div class="step_number">
                          <h3>یک</h3>
                          </div>
                        </div>

                        <div class="step_text step1">
                          <h4>دانلود اپلیکیشن</h4>
                          <p> دانلود از سامانه آرپوت مارکت یا بازار و play store </p>
                        </div>
                    </div>
                  </div>


                  <div class="md:w-1/3 w-full flex justify-center items-center">
                    <div class="step_box">

                        <div class="step_img" >
                          <Image className="m-auto" src={step2} width={75} height={75} alt="image" />
                          <div class="step_number">
                          <h3>دو</h3>
                          </div>
                        </div>

                        <div class="step_text step2">
                          <h4>  نصب برنامه مورد نیاز </h4>
                            <p> دانلود و بروزرسانی Google play services for AR </p>
                        </div>
                    </div>
                  </div>


                  <div class="md:w-1/3 w-full flex justify-center items-center">
                    <div class="step_box">

                        <div class="step_img">
                          <Image className="m-auto" src={step3} width={75} height={75} alt="image" />
                          <div class="step_number">
                          <h3>سه</h3>
                          </div>
                        </div>

                        <div class="step_text step3">
                          <h4>تمام شد،از برنامه لذت ببرید</h4>
                            <p> وارد برنامه شو و آرپوتش کن!!! </p>
                        </div>
                    </div>
                  </div>

              </div>

                </div>
              </div>

            </div>
          </section>





                <section className="row_am pricing_section" id="pricing">

                  <div className="container text-center mx-auto flex flex-col justify-center items-center ">
                    <div className="section_title">

                      <h2>بهترین و ساده ترین <span>قیمت‌ گذاری</span></h2>

                      <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br/> چاپگرها و متون بلکه روزنامه با استفاده از طراحان گرافیک است. </p>
                    </div>

                    <div className="toggle_block">
                      <span className="month active">ماهانه</span>
                      <div className="tog_block">
                        <span className="tog_btn"></span>
                      </div>
                      <span className="years">سالانه</span>
                      <span className="offer">15% تخفیف</span>
                    </div>


                    <div className="pricing_pannel monthly_plan active w-full">

                      <div className="row flex md:flex-row flex-col justify-center  w-full gap-8">

                        <div className="md:w-1/3 w-full min-h-[85vh]">
                          <div className="pricing_block highlited_block h-full py-10">
                            <div className="pkg_name w-full flex flex-col justify-center items-center ">
                              <h3> سفارشی </h3>
                              <span>برای کارخانه ها</span>
                              <hr className="my-2 text-white text-xl" />
                            </div>

                            <ul className="benifits !items-start !list-disc p-4 px-10">
                              <li>
                                <p> تایل از پیش تعریف شده </p>
                              </li>
                              <li>
                                <p> امکان بارگزاری آنلاین محصولات </p>
                              </li>
                              <li>
                                <p> انتخاب سطوح زمین و دیوار </p>
                              </li>
                              <li>
                                <p> نمایش محصول در اندازه واقعی </p>
                              </li>
                              <li>
                                <p> انتخاب سایز های متفاوت محصول </p>
                              </li>
                              <li>
                                <p> انتخاب سایز های متفاوت محصول </p>
                              </li>
                              <li>
                                <p> انتخاب طرح چینش محصول تایل </p>
                              </li>
                              <li>
                                <p> نورپردازی و حرکت نور </p>
                              </li>
                              <li>
                                <p> حرکت و چرخاندن تکسچر تایل </p>
                              </li>
                              <li>
                                <p> تخمین مساحت،تعداد محصول و قیمت </p>
                              </li>
                              <li>
                                <p> گرفتن عکس و ذخیره </p>
                              </li>
                              <li>
                                <p> امکان سفارشی سازی نورپردازی </p>
                              </li>
                              <li>
                                <p> لینک به فروشگاه آنلاین </p>
                              </li>
                              <li>
                                <p> قراردادن برند شما </p>
                              </li>
                              <li>
                                <p> رابط کاربری سفارشی </p>
                              </li>
                              <li>
                                <p> افزودن دکور روی سطح تایل </p>
                              </li>
                              <li>
                                <p> افزودن افکت گیمیفیکیشن </p>
                              </li>
                              <li>
                                <p> شناسایی موانع طبیعی </p>
                              </li>
                            </ul>
                            <a href="#" className="btn white_btn mx-auto w-1/2"> سفارش دهید</a>
                          </div>
                        </div>


                        <div className="md:w-1/3 w-full min-h-[85vh]">
                          <div className="pricing_block h-full py-10">

                            <div className="pkg_name w-full flex flex-col justify-center items-center ">
                              <h3>آرپوت مارکت</h3>
                              <hr className="my-2" />
                            </div>

                            <ul className="benifits !items-start !list-disc p-4 px-10">
                            <li>
                                <p> تایل از پیش تعریف شده </p>
                              </li>
                              <li>
                                <p> امکان بارگزاری آنلاین محصولات </p>
                              </li>
                              <li>
                                <p> انتخاب سطوح زمین و دیوار </p>
                              </li>
                              <li>
                                <p> نمایش محصول در اندازه واقعی </p>
                              </li>
                              <li>
                                <p> انتخاب سایز های متفاوت محصول </p>
                              </li>
                              <li>
                                <p> انتخاب سایز های متفاوت محصول </p>
                              </li>
                              <li>
                                <p> انتخاب طرح چینش محصول تایل </p>
                              </li>
                              <li>
                                <p> نورپردازی و حرکت نور </p>
                              </li>
                              <li>
                                <p> حرکت و چرخاندن تکسچر تایل </p>
                              </li>
                              <li>
                                <p> تخمین مساحت،تعداد محصول و قیمت </p>
                              </li>
                              <li>
                                <p> گرفتن عکس و ذخیره </p>
                              </li>
                              <li>
                                <p> لینک به فروشگاه آنلاین </p>
                              </li>
                              <li>
                                <p> صفحه اختصاصی هر برند </p>
                              </li>
                            </ul>
                            
                              <a href="#" className="btn white_btn mx-auto w-1/2">سفارش دهید</a>

                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="pricing_pannel yearly_plan w-full ">
                      <div className="row flex flex-row justify-center items-center w-full ">

                        <div className="col-md-4">
                          <div className="pricing_block">
                            <div className="icon">
                              <Image width={60} height={60} src={standard} alt="image" />
                            </div>
                            <div className="pkg_name">
                              <h3>استاندارد</h3>
                              <span>برای شروع </span>
                            </div>
                            <span className="price">150 تومان</span>
                            <ul className="benifits">
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
                            <a href="contact.html" className="btn white_btn">سفارش دهید</a>
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="pricing_block highlited_block">
                            <div className="icon">
                              <Image width={60} height={60} src={ultimate} alt="image" />
                            </div>
                            <div className="pkg_name">
                              <h3>نامحدود</h3>
                              <span>برای حرفه ای ها</span>
                            </div>
                            <span className="price">999 تومان</span>
                            <ul className="benifits">
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
                            <a href="contact.html" className="btn white_btn">سفارش دهید</a>
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="pricing_block">
                            <div className="icon">
                              <Image width={60} height={60} src={premium} alt="image" />
                            </div>
                            <div className="pkg_name">
                              <h3>پریمیوم</h3>
                              <span>برای تیم های کوچک</span>
                            </div>
                            <span className="price">550 تومان</span>
                            <ul className="benifits">
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
                            <a href="contact.html" className="btn white_btn">سفارش دهید</a>
                          </div>
                        </div>

                      </div>
                    </div>


                  </div>

                </section>

                <Divider/>
                <section className="flex flex-col gap-8 text-center">

                <div className="section_title pb-6">

                  <h2> پشتیبانی <span> رایگان</span></h2>

                </div>

                  <h3 className="text-2xl">  برای دریافت بهترین و مناسب ترین اپلیکیشن برای فروشگاه خود<Link className="text-asliLight border-b-2" href="/contactus">  با ما در ارتباط باشید </Link>   </h3>

                  <div className="flex flex-row gap-4 w-full justify-center" >
                    <h3 className="p-3 text-xl " >
                      <Phone className="text-khas"/> ۰۹۱۷۰۴۵۶۲۰۰
                    </h3>
                    <a href="mailto:info@arputmarket.com" className="hover:border-b-2 p-3 text-2xl">
                      <EmailRounded  className="text-khas"/> info@arputmarket.com
                    </a>

                  </div>

                </section>
                <Divider/>





              <section className="row_am trusted_section">

                <div className="flex flex-col">
                  <div className="section_title">

                    <h2>مورد اعتماد <span>برند ها</span></h2>

                  </div>

                  <div className="company_logos" >
                    <CompanySlider/>
                  </div>

                </div>

              </section>

                  
              


            </div>

  )
}
