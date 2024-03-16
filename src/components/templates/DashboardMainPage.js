'use client'

import { Alert, Grid, Snackbar } from "@mui/material";
import AdminCard from "../module/AdminCard";
import { Chart } from "../module/Chart";
import { Bars } from "../module/Bars";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const DashboardMainPage = () => {
    
    const route = useRouter()
    const cookie = new Cookies();
    const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 

    
    const [message, setMessage] = useState("")
    const[alert, setAlert] = useState(false)


    async function getUSer(Auth) {
        await axios.get('https://supperapp-backend.chbk.run/register/current_user', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Auth}`,
          }
          })
          .then((response) => {
            setMessage(` ${response.data.data[0]?.name} ${response.data.data[0]?.family} خوش آمدید  `)
            setAlert(true)
            cookie.set("welcommed", true)
          })
            .catch((error) => {
              console.log("Error on getting current user");
            });
          }


    useEffect(() => {
        setTimeout(() => {
            route.refresh()
        }, 200);
        setTimeout(() => {
            if(cookie.get("welcommed") == false ){
                getUSer(Au);
            }else{
                null
            }
        }, 400);
    },[])





    return (

            <div className="w-full gap-8 flex flex-col h-full" >
                <Grid className='w-full flex flex-row justify-between items-center gap-6' >
                    <div className='md:w-1/5 w-full' >
                        <AdminCard/>
                    </div>
                    <div className='w-1/5 md:block hidden ' >
                        <AdminCard/>
                    </div>
                    <div className='w-1/5 md:block hidden ' >
                        <AdminCard/>
                    </div>
                    <div className='w-1/5 md:block hidden' >
                        <AdminCard/>
                    </div>
                </Grid>

                    <Grid className='w-full flex md:flex-row flex-col justify-center items-center gap-12' >
                        <Grid className='md:w-3/5 w-full shadow-xl' >
                        <Chart/>
                        </Grid>
                        <Grid className='md:w-2/5 w-full shadow-xl' >
                        <Bars/>
                        </Grid>
                    </Grid>
                    <Grid className='w-full border-2 text-center shadow-xl' >
                        table
                    </Grid>


                    <Snackbar
                    open={alert}
                    autoHideDuration={4000}
                    onClose={() => setAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <Alert variant='filled' severity='info' className='text-lg text-white font-semibold p-4 border-2 border-white animate-bounce' > {message} </Alert>
                    </Snackbar>

            </div>

    );
}

export default DashboardMainPage;