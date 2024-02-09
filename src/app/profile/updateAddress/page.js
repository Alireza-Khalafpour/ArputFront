'use client'


import GeneralLoader from "@/components/module/GeneralLoader";
import CustomNeshanMap from "@/components/module/NeshanMap";
import { Category } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const UpdateAddress = () => {

    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Address Part  -----------------------------------
    const [Address, setAddress] = useState()
    const [latLang, setLatLang] = useState()
    const [userId, setUserId] =useState()
    const [street, setStreet] = useState()
    const [alley, setAlley] = useState()
    const [number, setNumber] = useState()
    const [zipcode, setZipcode] = useState()
    
    // update address Api --------------------------------

    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
    }

    async function UpdateUserAddress() {
        setLoading(true);
        await axios.put('https://supperapp-backend.chbk.run/register/user_address',
         {
            "id": userId,
            "lat": latLang?.Lat,
            "lng": latLang?.Lng,
            "main_address": Address?.formatted_address,
            "street": street,
            "alley": alley,
            "number": number,
            "remain": "",
            "zip_code": zipcode
        },
        {
            headers: headers
            })
            .then((response) => {
                if(response.data.Done == true){
                    setAlert(true)
                    setMessage(" با موفقیت ثبت شد ")
                    setLoading(false)
                    setZipcode("")
                    setNumber("")
                    setAlley("")
                    setStreet("")
                    setLatLang("")
                    setAddress()

                }else{
                    setErrorAlert(true)
                    setMessage(" ناموفق ")
                    setLoading(false)
                }

            })
            .catch(function (error) {
                setErrorAlert(true)
                setMessage(" متاسفیم،خطایی رخ داده است ")
                setLoading(false)
                setZipcode("")
                setNumber("")
                setAlley("")
                setStreet("")
                setLatLang("")
                setAddress()
            });
            
        }
        
        // get userId -------------------------------------
        
        function getUSer(Au) {
            axios.get('https://supperapp-backend.chbk.run/register/current_user', {
              headers:{
                'accept': 'application/json',
                'Authorization': `Bearer ${Au}`,
              }
              })
              .then((response) => {
                  setUserId(response.data.data[0].id)
                })
                .catch((error) => {
                    console.log("Error on getting current user");
                });
            }
            
            useEffect(() =>{
                getUSer(Auth)
              },[])

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
                    placeholder=" مکان مورد نظر را روی نقشه انتخاب کنید "  
                    minRows={3}
                    value={Address === undefined ? " " : `${Address?.state} ${Address?.formatted_address}`}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button onClick={() => UpdateUserAddress()} className="p-2 bg-khas hover:bg-orange-500 text-white w-1/5 mx-auto rounded-xl " >
                    {loading ? <GeneralLoader/> : " ثبت آدرس "}
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

export default UpdateAddress;