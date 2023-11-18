'use client'

import { Dns, Edit, EditAttributes, Email, Person2, Smartphone } from "@mui/icons-material";
import { Avatar, FormControl, FormHelperText, FormLabel, Input, Textarea } from "@mui/joy";
import { Badge } from "@mui/material";
import shazs from "../../../public/images/Sign up-amico.svg"

const ProfileMainPage = () => {
    return (
        <div className="flex flex-col gap-14 w-[80%] p-12">
            <div className="flex flex-row justify-around items-center" >

                <Badge
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="standard"
                    badgeContent={
                    <Edit
                        sx={{ '--Avatar-size': '44px', "position": 'absolute' , "right" : "10px" , "bottom":"30px" }}
                        className="border-2 border-paszamine2 bg-khas hover:bg-orange-500 rounded-full w-11 h-11 text-white cursor-pointer p-2"
                    />
                    }
                >
                    <Avatar alt="Aravis Howard" src={shazs} size="lg" className="w-64 h-64 border-2 border-paszamine2" />
                </Badge>

                <div className="gap-3 flex flex-col">
                    <h2 className="text-2xl font-bold"> آرمین زارعی </h2>
                    <p> <Email className="text-khas"/> www.email@gmail.com </p>
                </div>

            </div>

            <div className="flex flex-row justify-around items-center" >

                <FormControl className="w-full">
                    <FormLabel> نام </FormLabel>
                    <Input className="w-[70%] shadow-lg " endDecorator={<Dns/>} size="lg" placeholder=" نام " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full" >
                    <FormLabel> نام خانوادگی </FormLabel>
                    <Input className="w-[70%] shadow-lg " size="lg" endDecorator={<Dns/>} placeholder="  نام خانوادگی" />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex flex-row justify-around items-center" >

                <FormControl className="w-full" >
                    <FormLabel> شماره همراه </FormLabel>
                    <Input className="w-[70%] shadow-lg " endDecorator={<Smartphone/>} size="lg" placeholder="   شماره همراه  " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full">
                    <FormLabel> ایمیل </FormLabel>
                    <Input className="w-[70%] shadow-lg " endDecorator={<Email/>} size="lg" placeholder=" ایمیل " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex flex-row justify-center items-center" >

                <FormControl className="w-full" >
                    <FormLabel> آدرس و کد پستی </FormLabel>
                    <Textarea minRows={3} className="w-[85%] text-center shadow-lg " placeholder="   آدرس و کد پستی  " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex flex-row justify-center items-center w-full" >

                <button className="bg-khas p-3 rounded-full shadow-2xl w-56 text-white hover:font-bold hover:bg-orange-500 transition-all duration-150" >
                    ذخیره تغییرات
                </button>

            </div>

            
        </div>
    );
}

export default ProfileMainPage;