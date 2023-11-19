'use client'

import { useState } from "react";
import { Add, Mail, Telegram } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Input, Textarea, Typography } from "@mui/joy";


const TicketChatPage = () => {

    const [text, setText] = useState('');
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

    return (
        <>

        <div className="flex justify-center items-center" >

            <div className="flex flex-col relative w-[80%] h-screen border-2 border-paszamine rounded-xl " >
                <div id="chatHeader" className="flex flex-row justify-between rounded-lg items-center p-3 bg-asliLight " >
                    <div className="text-white text-xl mr-8" >name</div>
                    <Avatar size="lg" variant="soft" className="ml-8" />
                </div>
                <div>
                    massage part
                </div>

                <div id="footer" className="absolute bottom-24 w-full h-20 border" >
                {/* <Input
                    className="p-4"
                    endDecorator={<Mail/>}
                    startDecorator={<Button className="bg-khas p-4" > ارسال </Button>}
                /> */}
                    <Textarea
                        placeholder=" اینجا بنویسید... "
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        minRows={3}
                        maxRows={4}
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