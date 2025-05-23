'use client'

import { CommentOutlined, ListAltOutlined, PlusOneRounded } from "@mui/icons-material";
import { IconButton, List, ListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


const TicketHistorySidebar = ({setSubResponse, alert , setResetChat}) => {

    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')
    const url = process.env.NEXT_PUBLIC_URL

    // ---------------
    const [ticketHistoryList, setTicketHistoryList] = useState([])


        // Get Tickets history list -----------------
        async function GetTicketHistoryList(Au) {
      
            await axios.get(`${url}/ticket/user_ticket`, {
              headers:{
                'accept': 'application/json',
                'Authorization': `Bearer ${Au}`,
              }
              })
              .then((response) => {
                setTicketHistoryList(response.data.data)
                
              })
              .catch((error) => {
                console.log(error, "Error");
              });
          }

    
          useEffect(() => {
            const Auth = cookie.get('tokenDastResi')
            GetTicketHistoryList(Auth)
          },[])

          useEffect(() => {
            const Auth = cookie.get('tokenDastResi')
            GetTicketHistoryList(Auth)
          },[alert])
 



    return (
        <>
            <div className="w-full border-2 border-paszamine2 rounded-xl flex-col flex justify-center items-center gap-3" >
                <h3 className="text-lg text-white bg-khas w-full px-2 py-5 rounded-t-xl text-center " >  سابقه تیکت ها </h3>

                <List className="w-full text-center max-h-[60vh] overflow-y-scroll">


                    {
                        ticketHistoryList?.map((i) => (
                            <ListItem
                                onClick={() => setSubResponse(i)}
                                className=" w-3/4 rounded-xl border border-gray-600 p-1 mx-auto hover:bg-paszamine2 cursor-pointer flex flex-row justify-between "
                                key={i.id}
                                disableGutters
                            >
                                <span> {i?.subject} </span>
                                <IconButton aria-label="comment">
                                    <ListAltOutlined />
                                </IconButton>
                            </ListItem>
                        ))
                    }


                </List>

            </div>
        </>
    );
}

export default TicketHistorySidebar;