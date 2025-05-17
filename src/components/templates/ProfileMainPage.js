'use client'

import { Dns, Edit, EditAttributes, Email, Person2, Smartphone } from "@mui/icons-material";
import { Avatar, FormControl, FormHelperText, FormLabel, Input, Textarea } from "@mui/joy";
import { Alert, Badge, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const ProfileMainPage = () => {

    const cookie = new Cookies();
    const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 
    const url = process.env.NEXT_PUBLIC_URL


    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [Name, setName] = useState("");
    const [Family, setFamily] = useState("");
    const [ShopName, setShopName] = useState("");
    const [Id, setId] = useState("");
    const [profileImage, setProfileImage] = useState();

    const [imageFile, setImageFile] = useState()
    const [imageUrl, setImageUrl] = useState("")


    async function getUSer(Auth) {
        await axios.get(`${url}/register/current_user`, {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Auth}`,
          }
          })
          .then((response) => {
            setName(response.data?.data[0]?.name)
            setFamily(response.data?.data[0]?.family)
            setShopName(response.data?.data[0]?.shop_name)
            setId(response.data.data[0]?.id)
            setProfileImage(response.data?.data[0]?.image)
          })
          .catch((error) => {
            console.log("Error on getting current user");
          });
      }
      
      useEffect(() =>{
        getUSer(Au)
      },[])


      // Update User Data --------------

      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Au}`,
        'Content-Type': 'application/json',
        }

      async function EditProfileInfo() {

        setLoading(true);
        await axios.patch(`${url}/register/edit_profile`, {
            "first_name": Name,
            "family": Family,
            "name": ShopName,
            "image": imageUrl
        }, 
        {
          headers: headers
        })
        .then((response) => {
            setLoading(true)
            console.log(response.data)
          if(response.data.Done == true){
            setAlert(true)
            setMessage( " تغییرات ثبت شدند " )
            setLoading(false)
            setImageUrl("")

          }else {
            setLoading(false)
            setMessage(response.data.Error_text)
            setErrorAlert(true)
          }
          getUSer(Au)
        })
        .catch(function (error) {
            console.log(error)
            setMessage(" متاسفیم،خطایی رخ داده است ")
            setErrorAlert(true)
            setLoading(false)
        });
  
    }

    // Upload image -----------------------
    const headersImage ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Au}`,
        'Content-Type': ' multipart/form-data',
        }

    const formData = new FormData();

    async function handleImageUpload() {        

        formData.append("file", imageFile);

        setLoading(true);
        await axios.post(`${url}/upload/upload_texture`, formData,
        {
          headers: headersImage
        })
        .then(async (response) => {
            setImageUrl(response.data.address)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
        setLoading(false)
    };

    useEffect(() => {
        setTimeout(() => {
            handleImageUpload()
        }, 300);
    },[imageFile])


    return (
        <div className="flex flex-col gap-14 md:w-[80%] w-full p-12">
            <div className="flex md:flex-row flex-col justify-around items-center gap-6" >

                <Badge
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="standard"
                    onClick={() => document.getElementById("fileInput").click()}
                    badgeContent={
                    <Edit
                        sx={{ '--Avatar-size': '44px', "position": 'absolute' , "right" : "10px" , "bottom":"30px" }}
                        className="border-2 border-paszamine2 bg-khas hover:bg-orange-500 rounded-full w-11 h-11 text-white cursor-pointer p-2"
                    />
                    }
                >
                    <Avatar alt="Aravis Howard" size="lg" src={profileImage} className="md:w-64 w-40 md:h-64 h-40 border-2 border-paszamine2 " />
                </Badge>
                <input 
                    type='file' 
                    id='fileInput' 
                    multiple 
                    hidden 
                    className="!hidden"
                    accept='image/*'
                    onChange={ ({target:{files}}) =>{
                        setImageFile(files[0])
                    }
                    }
                />

                <div className="gap-3 flex flex-col">
                    <h2 className="text-2xl font-bold"> {Name} {Family}</h2>
                    <h2 className="text-2xl font-bold"> {ShopName}</h2>
                    <p> <Email className="text-khas"/> email</p>
                </div>

            </div>

            <div className="flex md:flex-row flex-col justify-around items-center" >

                <FormControl className="w-full">
                    <FormLabel> نام </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " value={Name} onChange={(e) => setName(e.target.value)} endDecorator={<Dns/>} size="lg" placeholder=" نام " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full" >
                    <FormLabel> نام خانوادگی </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " size="lg" value={Family} onChange={(e) => setFamily(e.target.value)} endDecorator={<Dns/>} placeholder="  نام خانوادگی" />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>

            <div className="flex md:flex-row flex-col justify-around items-center" >

                <FormControl className="w-full" >
                    <FormLabel> نام فروشگاه </FormLabel>
                    <Input className="md:w-[70%] w-full shadow-lg " value={ShopName} onChange={(e) => setShopName(e.target.value)} endDecorator={<Smartphone/>} size="lg" placeholder="   نام فروشگاه  " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

                <FormControl className="w-full">
                    <FormLabel> ایمیل </FormLabel>
                    <Input disabled className="md:w-[70%] w-full shadow-lg " endDecorator={<Email/>} size="lg" placeholder=" ایمیل " />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                </FormControl>

            </div>


            <div className="flex flex-row justify-center items-center w-full" >

                <button onClick={() => EditProfileInfo()} className="bg-khas p-3 rounded-full shadow-2xl w-56 text-white hover:font-bold hover:bg-orange-500 transition-all duration-150" >
                    ذخیره
                </button>

            </div>

            <Snackbar
                open={alert}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                se
                >
                <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
                </Snackbar>

                <Snackbar
                open={errorAlert}
                autoHideDuration={4000}
                onClose={() => setErrorAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                se
                >
                <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
            </Snackbar>

            
        </div>
    );
}

export default ProfileMainPage;