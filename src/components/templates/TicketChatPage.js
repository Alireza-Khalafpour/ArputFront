'use client'

import { useState } from "react";
import { Add, Mail, Telegram } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Input, Textarea, Typography } from "@mui/joy";
import { Divider } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";


const TicketChatPage = () => {

    const Messages = [
        {
            role:"client",
            message: "سلام. من در حال خرید کاشی از سایت شما هستم و متوجه شدم که قسمتی از سایت شما خراب شده است.",
            createdAt: "20:15 | 1402/08/29"
        },
        {
            role:"admin",
            message: " متأسفیم که با این مشکل روبرو شده‌اید. لطفاً مشکل را بیان کنید تا بتوانیم به شما کمک کنیم.😊😊😊",
            createdAt: "20:19 | 1402/08/29"
        },
        {
            role:"client",
            message: " بله، وقتی می‌خواهم به صفحه محصولات بروم، صفحه خالی باز می‌شود.",
            createdAt: "21:33 | 1402/08/29"
        },
        {
            role:"admin",
            message: " متوجه شدم. لطفاً از مرورگر دیگری استفاده کنید و یا صفحه را بازنشانی کنید. اگر مشکل شما حل نشد، لطفاً با ما تماس بگیرید. ",
            createdAt: "22:33 | 1402/08/29"
        },
        
    ]


    const [text, setText] = useState('');
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

    return (
        <>

        <div className="flex justify-center items-center" >

            <div className="flex flex-col relative w-[80%] h-screen border-2 border-paszamine2 border-paszamine rounded-xl " >
                <div id="chatHeader" className="flex flex-row justify-between rounded-lg items-center p-3 bg-asliLight " >
                    <div className="text-white text-xl mr-8" > پشتیبان آرپوت </div>
                    <Avatar size="lg" variant="soft" className="ml-8" />
                </div>
                <div className="p-4 flex flex-col gap-4 w-full overflow-y-scroll overflow-x-hidden" >
                    {
                        Messages.map((i) => (
                            <div className={`p-2 flex w-full ${i.role === "client" ? `justify-start` : `justify-end`} `}>

                                    <div className={` w-[70%] ${i.role === "client" ? "bg-blue-200" : "bg-orange-200"} rounded-xl`}>
                                        {i.message}
                                        <div className={`w-full ${i.role === "client" ? "bg-blue-200" : "bg-orange-200"} rounded-b-xl px-3 text-left`} >
                                            <p className="pt-3">{e2p(i.createdAt)}</p>
                                        </div>
                                    </div>
                                    <Divider/>
                                
                            </div>
                        ))
                    }
                </div>

                <div id="footer" className="absolute bottom-24 w-full h-20 border" >

                    <Textarea
                        placeholder=" اینجا بنویسید... "
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        minRows={2}
                        maxRows={5}
                        startDecorator={
                            <div className="flex flex-row gap-1">
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                                👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                                🏖
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                                😍
                            </IconButton>
                            <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                                <Add/> 
                            </Button>
                            </div>
                        }
                        endDecorator={
                            <div className="w-full flex flex-row justify-between">
                                <Typography sx={{ ml: 'auto' }} className="bg-paszamine2 text-center items-center my-auto" >
                                {text.length} تعداد کاراکتر
                                </Typography>
                                <button className="p-3 flex flex-row w-20 rounded-xl bg-khas text-paszamine1 hover:bg-orange-500 hover:font-bold   "> <Telegram/> ارسال </button>
                            </div>
                        }
                        sx={{ minWidth: 300 }}
                    />
                </div>

            </div>

        </div>
            
        </>
    );
}

export default TicketChatPage;