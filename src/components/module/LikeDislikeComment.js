'use client'

import { ThumbDownOffAltOutlined, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";


const LikeDislikeComment = ({CommentId, single_product, Like, DisLike}) => {

    const cookie = new Cookies();
    const url = process.env.NEXT_PUBLIC_URL
    const Auth = cookie.get('tokenDastResi')
    
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);


      // Like and dislike Comment ------------------------


      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }


        async function SendLikeDislikeComment(e) {
            setLoading(true);
            if(e == 'like'){

                await axios.patch(`${url}/comment/comment_like`, 
                {
                    "like":true,
                    "dislike": false,
                    "pre_product_id": `${single_product}`,
                    "comment_id": CommentId
                }, {
                    headers: headers
                })
                .then((response) => {
                    setMessage(response.data?.Message)
                    setAlert(true);
                })
                .catch(function (error) {
                    setMessage(" متاسفیم،خطایی رخ داده است ")
                    setErrorAlert(true)
                    setLoading(false)
                });

            }else if(e == 'dislike'){

                await axios.patch(`${url}/comment/comment_like`, 
                {
                    "like": false,
                    "dislike": true,
                    "pre_product_id": `${single_product}`,
                    "comment_id": CommentId
                }, {
                    headers: headers
                })
                .then((response) => {
                    setMessage(response.data?.Message)
                    setAlert(true);
                })
                .catch(function (error) {
                    setMessage(" متاسفیم،خطایی رخ داده است ")
                    setErrorAlert(true)
                    setLoading(false)
                });

            }


        }



    return (
        <>
        <div className="flex flex-row justify-center items-center gap-3">
                <button onClick={() => SendLikeDislikeComment("like")} ><ThumbUpOffAltOutlined className="cursor-pointer hover:text-khas" /> <span> {digitsEnToFa(Like)} </span></button>
                <button onClick={() => SendLikeDislikeComment("dislike")} ><ThumbDownOffAltOutlined className="cursor-pointer hover:text-khas" /> <span> {digitsEnToFa(DisLike)} </span> </button>
            </div>


            <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          className="bg-green-700 text-white"
          se
          >
          <Alert variant='filled' className='text-lg text-white font-semibold bg-green-700 mx-auto ' > {message} </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="bg-rose-700"
        se
        >
        <Alert variant='filled' className='text-lg text-white font-semibold bg-rose-700 mx-auto' > {message} </Alert>
      </Snackbar>
        </>
    );
}

export default LikeDislikeComment;