'use client'


import { Add, AddCircleOutline, DeleteRounded, Edit, RadioButtonChecked, Telegram } from "@mui/icons-material";
import { Alert, Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import Cookies from "universal-cookie";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import * as shamsi from 'shamsi-date-converter';
import { Textarea } from "@mui/joy";

const AdminTicket = () =>  {


    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')

    const [data, setData] = useState([]);
    // ----------------
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    //-----------------
    const [openDetails, setOpenDetails] = useState(false);
    const [subResponses, setSubResponses] = useState([])
    const [idToRespond, setIdToRespond] = useState("")
    const [content, setContent] = useState("")


        

    // Get Tickets list -----------------
    async function GetTicketsList(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/ticket/list', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
          }
          })
          .then((response) => {
            setData(response.data.data)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
      }

      useEffect(() => {
        const Auth = cookie.get('tokenDastResi')
        GetTicketsList(Auth)
      },[])



      // send Ticket api  -------------------------
      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }
      
      
        async function RespondToTicket() {
            if(subject != ""){

                setLoading(true);
                await axios.post('https://supperapp-backend.chbk.run/ticket/create', {
                  "subject": subject,
                  "content": content,
                  "department_id": departmentId,
                  "factory_id": userId,
                  "file": ""
                }, 
                {
                  headers: headers
                })
                .then((response) => {
                  if(response.data.Done === true){
                    setAlert(true)
                    setMessage(response.data.Message)
                    
                  }else {
                    setMessage(response.data.Message)
                    setErrorAlert(true)
                    
                  }
                })
                .catch(function (error) {
                  setMessage(" متاسفیم،خطایی رخ داده است ")
                  setErrorAlert(true)
                  
                });
          
                setDepartmentId("")
                setSubject("")
                setContent("")

            }else{
                setMessage(" موضوع را مشخص کنید")
                setErrorAlert(true)
            }
      }

      // Handle open Detial Modal for tickets ------------------------------

      const GetRowSubResponses = (row) => {
        console.log(row)
        setIdToRespond(row.original.id)
        setSubResponses(row.original.sub_response)
        setOpenDetails(true)
      }

      // Handle response to ticket-------------------------------------------
      const headersSendTicket ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }
      
      
        async function RespondTicket() {

          setLoading(true);
          await axios.patch('https://supperapp-backend.chbk.run/ticket/update_sub_response' , 
            {
              "id": idToRespond,
              "content": content
            }, 
          {
            headers: headersSendTicket
          })
          .then((response) => {
            if(response.data.Done === true){
              setAlert(true)
              setMessage(response.data.Message)
              
            }else {
              setMessage(response.data.Message)
              setErrorAlert(true)
              
            }
          })
          .catch(function (error) {
            setMessage(" متاسفیم،خطایی رخ داده است ")
            setErrorAlert(true)
            
          });
    
          setIdToRespond("")
          setContent("")
      }



        // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' دپارتمان ',
        accessorKey: 'department',
        id: 'department',
        grow: false,
        maxSize: 60,
      },
      {
        header: ' از طرف ',
        accessorKey: 'factory_name',
        id: 'factory_name',
        grow: false,
        maxSize: 60,
      },
      {
        header: ' موضوع ',
        accessorKey: 'subject',
        id: 'subject',
        grow: false,
        maxSize: 100,
      },
      {
          header: ' متن ',
          accessorKey: 'content',
          id: 'content',
          minSize:300,
        },
    ],
    []
  );


const table = useMaterialReactTable({
  columns,
  data,
  localization: mrtLocalizationFa,
  rowNumberDisplayMode: true,
  columnResizeMode:true,
  enableStickyHeader: true,
  enableStickyFooter: true,
  enableRowActions: true,
  muiTableBodyCellProps:{
    sx:{
      align: 'right',
      textAlign:'right',
    }
  },
  muiTableHeadCellProps:{
    sx:{
      textAlign:"right",
      fontWeight: '600',
      fontSize: '14px',
      backgroundColor: '#ECEFF1',
      alignItems: 'center',
      background: '#1D9BF0',
      borderRight: '1px solid rgba(224,224,224,1)',
      color: 'white',
    }
  },
  muiTableContainerProps: { sx: { maxHeight: '500px' } },

  renderRowActions: ({ row }) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton
          className=" text-white text-sm bg-khas cursor-pointer hover:bg-orange-500 p-1 rounded-lg "
          size="small"
          onClick={() => GetRowSubResponses(row)}
        >
          جزییات
        </IconButton>
        {/* {
            row.original.is_active == true 
            ?
            <IconButton
              color="error"
              onClick={() => GetRowIdForDelete(row.original?.id)}
            >
                <DeleteRounded className="text-red-600" titleAccess="غیرفعال کردن" />
            </IconButton>

            :

            <IconButton
            color="success"
            onClick={() => GetRowIdForActivate(row.original?.id)}
          >
              <RadioButtonChecked titleAccess="فعال کردن" />
          </IconButton>

          } */}
      </Box>
    )
  },
});


    return (
        <>

      <MaterialReactTable table={table}/>



      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="md" open={openDetails} onClose={() => setOpenDetails(false)}>

        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
          تیکت ها
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

          <div className="flex flex-col justify-center items-center gap-10 w-full" >
            
            <div className="flex flex-col justify-center items-start w-full gap-6" >

                {
                  subResponses.map((i) => (
                <p className={`border ${i.role == "کارخانه" ? "border-khas" : "border-asliLight"} rounded-xl py-6 px-2 relative`} >
                    {i.content}
                    <span className="absolute bottom-0 left-1 text-xs" > {i.updated_at} </span>
                </p>

                  ))
                }
              
            </div>

            <div className="w-full" >

            <Textarea
                placeholder=" اینجا بنویسید... "
                value={content}
                onChange={(event) => setContent(event.target.value)}
                minRows={2}
                maxRows={3}
                // startDecorator={
                //     <div className="flex flex-row gap-1">
                //     <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                //         👍
                //     </IconButton>
                //     <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                //         🏖
                //     </IconButton>
                //     <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                //         😍
                //     </IconButton>
                //     <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                //         <Add/> 
                //     </Button>
                //     </div>
                // }
                endDecorator={
                    <div className="w-full flex flex-row justify-between">
                        {/* <Typography sx={{ ml: 'auto' }} className="bg-paszamine2 text-center items-center my-auto" >
                        {content.length} تعداد کاراکتر
                        </Typography> */}
                        <button onClick={() => RespondTicket()} className="p-3 flex flex-row w-20 rounded-xl bg-khas text-paszamine1 hover:bg-orange-500 hover:font-bold   "> <Telegram/> ارسال </button>
                    </div>
                }
                sx={{ minWidth: 300 }}
            />

            </div>
            

          </div>

        </DialogContent>

        </Dialog>



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
            
        </>
    );
}

export default AdminTicket;