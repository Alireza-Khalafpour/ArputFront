'use client'

import { Facebook, Instagram, Send, Telegram, WhatsApp } from "@mui/icons-material";
import { Input, Textarea } from "@mui/joy";


const ContactUs = () => {
    return (
        <div className="w-full h-[90vh] flex justify-end items-center relative" >
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5549.386359235215!2d52.46493949044171!3d29.722570322303692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb21a115caa0311%3A0xc9f48e432ab44733!2zRmFycyBQcm92aW5jZSwgU2hpcmF6LCBEaXN0cmljdCAxMNiMINm-2KfYsdqpINi52YTZhSDZiCDZgdmG2KfZiNix24wg2YHYp9ix2LMsIElyYW4!5e0!3m2!1sen!2sfr!4v1704699095426!5m2!1sen!2sfr"
             className="w-[70vw] h-[60vh] border-4" 
             allowfullscreen="" 
             loading="lazy" 
             referrerpolicy="no-referrer-when-downgrade"></iframe>

            <div className="absolute w-1/3 h-full flex flex-col justify-center p-8 items-center gap-12 bg-gradient-to-b from-asliDark to-blue-800 rounded-xl mt-6 right-2" >

                <h3  className="text-white text-2xl border-b-2 p-1 border-khas " > فرم ارتباط با ما </h3>

                <Input className="w-[90%]" placeholder=" شماره تماس " />
                <Input className="w-[90%]" placeholder=" ایمیل " />

                <Textarea  
                    className="w-[90%]"
                    minRows={5}
                    placeholder="پیام خود را اینجا وارد کنید"
                
                />

                <button className="w-1/3 p-3 bg-khas text-white rounded-2xl text-xl hover:animate-pulse " > <Send/> ارسال </button>

                <div className="flex flex-row justify-between items-center gap-4" >
                        <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-khas text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100" > <Instagram/> </span>
                        <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-blue-600 text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100" > <Facebook/> </span>
                        <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-green-600  text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100" > <WhatsApp/> </span>
                        <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-blue-700 text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100" > <Telegram/> </span>
                </div>
                

            </div>

        </div>
    );
}

export default ContactUs;