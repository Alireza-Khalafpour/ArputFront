'use client'

import { Favorite, Share } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/joy";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";




const AddToFavoriteAndShare = ({pId}) => {


    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi') || null

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);


    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }

    async function AddToFavorites(pId) {
        await axios.post('https://supperapp-backend.chbk.run/favorite_product/create', {
        'product_id': `${pId}`
        }, 
        {
        headers: headers
        })
        .then((response) => {
            setMessage(response.data.Message)
            setAlert(true)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error, "Error");
            setMessage(" متاسفیم،خطایی رخ داده است یا وارد حساب خود شوید ")
            setErrorAlert(true)
            setLoading(false)
        });
    }



    return (
        <>
            <IconButton
                className="rounded-full z-10 text-rose-700 "
                onClick={() => AddToFavorites(pId)}
            >
                <Favorite />
            </IconButton>
            <IconButton
                className="rounded-full z-10 text-asliLight"
                >
            <Share />
            </IconButton>

            <Snackbar
                open={alert}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                className="bg-green-700"
                se
                >
                <Alert variant='filled' className='text-lg text-white font-semibold bg-green-700 text-center ' > {message} <Favorite className="text-rose-600"/> </Alert>
                </Snackbar>

                <Snackbar
                open={errorAlert}
                autoHideDuration={4000}
                onClose={() => setErrorAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                className="bg-rose-950"
                se
                >
                <Alert variant='filled' className='text-lg text-white font-semibold bg-rose-950 text-center' > {message} </Alert>
            </Snackbar>
        </>
    );
}

export default AddToFavoriteAndShare;