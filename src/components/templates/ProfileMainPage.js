'use client'

import { Dns, Edit, EditAttributes, Email, Person2, Smartphone } from "@mui/icons-material";
import { Avatar, FormControl, FormHelperText, FormLabel, Input, Textarea } from "@mui/joy";
import { Badge } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const ProfileMainPage = () => {

    const cookie = new Cookies();
    const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 

    const [userInfo, setUserInfo] =useState();
    const {id, last_login, active, address, complete, email, family, image, national_code , name} = userInfo ? userInfo : "";


    async function getUSer(Auth) {
        await axios.get('https://supperapp-backend.chbk.run/register/current_user', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Auth}`,
          }
          })
          .then((response) => {
            setUserInfo(response.data.data[0])
          })
          .catch((error) => {
            console.log("Error on getting current user");
          });
      }
      
      useEffect(() =>{
        getUSer(Au)
      },[])


    return (
        <div className="flex flex-col gap-14 md:w-[80%] w-full p-12">
            <div className="flex md:flex-row flex-col justify-around items-center gap-6" >

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
                    <Avatar alt="Aravis Howard" size="lg" className="md:w-64 w-40 md:h-64 h-40 border-2 border-paszamine2" />
                </Badge>

                <div className="gap-3 flex flex-col">
                    <h2 className="text-2xl font-bold"> {id}</h2>
                    <p> <Email className="text-khas"/> {email}</p>
                </div>

            </div>

            <div className="flex md:flex-row flex-col justify-around items-center" >

                <FormControl className="w-full">
                    <FormLabel> نام </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " value={name} endDecorator={<Dns/>} size="lg" placeholder=" نام " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full" >
                    <FormLabel> نام خانوادگی </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " size="lg" value={family} endDecorator={<Dns/>} placeholder="  نام خانوادگی" />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex md:flex-row flex-col justify-around items-center" >

                <FormControl className="w-full" >
                    <FormLabel> شماره همراه </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg "  endDecorator={<Smartphone/>} size="lg" placeholder="   شماره همراه  " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full">
                    <FormLabel> ایمیل </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " value={email} endDecorator={<Email/>} size="lg" placeholder=" ایمیل " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex md:flex-row flex-col justify-center items-center" >

                <FormControl className="w-full" >
                    <FormLabel> آدرس و کد پستی </FormLabel>
                    <Textarea minRows={3} className="md:w-[85%] w-full text-center shadow-lg " placeholder="   آدرس و کد پستی  " />
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