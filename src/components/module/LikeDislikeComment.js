'use client'

import { ThumbDownOffAltOutlined, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";


const LikeDislikeComment = ({CommentId, single_product}) => {

    const cookie = new Cookies();
  
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


        async function LikeDislikeComment(likeORdislike) {
            setLoading(true);
            await axios.patch('https://supperapp-backend.chbk.run/category/admin/update', 
            {
                "like": true,
                "dislike": false,
                "pre_product_id": `${single_product}`,
                "comment_id": CommentId
            }, {
                headers: headers
            })
            .then((response) => {
                console.log(response)
            })
            .catch(function (error) {
                setMessage(" متاسفیم،خطایی رخ داده است ")
                setErrorAlert(true)
                setLoading(false)
            });

        }



    return (
        <>
        <div className="flex flex-row justify-center items-center gap-3">
            <button onClick={() => LikeDislikeComment()} ><ThumbUpOffAltOutlined className="cursor-pointer" /></button>
            <ThumbDownOffAltOutlined/>
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