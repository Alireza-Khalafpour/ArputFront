'use client'


import CustomNeshanMap from "@/components/module/NeshanMap";
import { Category } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const UpdateAddress = () => {


        // Address Part  -----------------------------------

        const [Address, setAddress] = useState()
        const [latLang, setLatLang] = useState()
        const [factoryIdForAddress, setFactoryIdForAddress] = useState()
        const [addAddressModal, setAddAddressModal] = useState(false)
        const [street, setStreet] = useState()
        const [alley, setAlley] = useState()
        const [number, setNumber] = useState()
        const [zipcode, setZipcode] = useState()






    return (
        <div className="flex flex-row justify-center items-center gap-6 w-full h-full">
            <div className="w-1/2 border-2" >
                <CustomNeshanMap setAddress={setAddress} setLatLang={setLatLang} />
            </div>
            <div className="w-1/2 flex flex-col gap-8 " >
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8 justify-around items-center" >
                    <TextField
                        className="md:w-[90%] w-full p-3"
                        id="input-with-icon-textfield"
                        placeholder=" خیابان  "
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                            <Category className='text-asliLight' />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        className="md:w-[90%] w-full p-3 "
                        id="input-with-icon-textfield"
                        placeholder=" کوچه  "
                    value={alley}
                        onChange={(e) => setAlley(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                            <Category className='text-asliLight' />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        className="md:w-[90%] w-full p-3 "
                        id="input-with-icon-textfield"

                        placeholder=" پلاک  "
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                            <Category className='text-asliLight' />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        className="md:w-[90%] w-full p-3 "
                        id="input-with-icon-textfield"
                        placeholder=" کدپستی  "
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                            <Category className='text-asliLight' />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                </div>

                <h2 className="border-b-2 text-lg max-w-min" > آدرس </h2>
                <Textarea
                    className="w-[95%]"
                    placeholder="آدرس کامل را وارد کنید" 
                    minRows={3}
                    value={Address === undefined ? " " : `${Address?.state} ${Address?.formatted_address}`}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
        </div>
    );
}

export default UpdateAddress;