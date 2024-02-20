'use client'

import { AccountBalanceWalletOutlined, AccountCircle, FileDownloadOutlined, PaymentOutlined, Send } from "@mui/icons-material";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { Input, Textarea } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, ListItemIcon, MenuItem, Snackbar, TextField } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";
import Cookies from "universal-cookie";
import axios from "axios";



// const data = [
//     {
//         date: "12/5/89",
//         amount: "4580000000",
//         paymentStatus: "موفق",
//     },
//     {
//         date: "12/5/89",
//         amount: "4580000000",
//         paymentStatus: "ناموفق",
//     },
//     {
//         date: "12/5/89",
//         amount: "4580000000",
//         paymentStatus: "در حال انجام",
//     },
//     {
//         date: "12/5/89",
//         amount: "4580000000",
//         paymentStatus: "موفق",
//     },
//     {
//         date: "12/5/89",
//         amount: "4580000000",
//         paymentStatus: "موفق",
//     },
// ]


const WalletPage = () => {

  const cookie = new Cookies();

  const Auth = cookie.get('tokenDastResi')

  const [paymentModal, setPaymentModal] = useState(false);
  const [data, setData] = useState([]);
  const [walletData, setWalletData] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("بابت شارژ کیف پول آرپوت")

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);


  // close payment modal
  const handlePaymentModal = () => {
    setPaymentModal((prev) => !prev )
  }

  // گرفتن اطلاعات کیف پول -----------

      async function GetWallet(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/wallet/', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
          }
          })
          .then((response) => {
            setWalletData(response.data)
            setData(response.data)
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
      }

      useEffect(() => {
        GetWallet(Auth)
        setData(walletData?.payments)
      },[])

      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }

      // انجام واریزی توسط کاربر
      async function MakePayment() {
        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/payment/create_payment', {
          "amount": amount,
          "currency": "IRT",
          "description": description
        }, 
        {
          headers: headers
        })
        .then((response) => {
          console.log(response.data)
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
      }



      const columns = [
        {
        accessorKey:'date',
          header: ' تاریخ واریز ',
          size: 150,
        },
        {
        accessorKey:'amount',
          header: ' مبلغ ',
          size: 150,
          Cell: ({ cell }) => (
            <Box component="span">
              {cell.getValue()?.toLocaleString('fa-IR')}
            </Box>
          ),
 
        },
        {
        accessorKey:'paymentStatus',
          header: ' وضعیت پرداخت  ' ,
          size: 150,
          Cell: ({ cell }) => (
            <Box
              className="px-4 py-1"
              component="span"
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue() === "موفق"
                    ? theme.palette.success.dark
                    : cell.getValue() === "ناموفق"
                    ? theme.palette.error.dark
                    : theme.palette.warning.dark,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
              })}
            >
              {cell.getValue()}
            </Box>
          ),
        },
      ];


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
      
        renderTopToolbar: ({ table }) => {
      
          return (
            <Box
              sx={() => ({
                display: 'flex',
                gap: '0.5rem',
                p: '8px',
                justifyContent: 'space-between',
              })}
            >
              <Box>
                <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="bg-khas text-white p-2 rounded-xl hover:bg-orange-500  "
                    onClick={() => handlePaymentModal()}
                  >
                    شارژ کیف پول <PaymentOutlined/> 
                  </button>
                </Box>
              </Box>
            </Box>
          );
        },
        renderBottomToolbar: ({ row }) => {
          return (
            <div className="w-full flex justify-end items-center flex-row gap-4 p-4 border-4" >
            <span className="p-2 border border-khas text-asliLight font-semibold rounded-xl " > موجودی : {e2p(walletData.balance ? walletData.payments : 0)} </span>
            <span className="p-2 border border-khas text-asliLight font-semibold rounded-xl " > مجموع کل واریزی ها : {e2p(0)} </span>
        </div>
          )
        },

      
      });

        /* ********** CONTEXT MENU ************* */
//   const [contextMenuRowData, setContextMenuRowData] = useState({});
//   const [showContextMenu, setShowContextMenu] = useState(false);
//   const [contextMenuPosition, setContextMenuPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const handleContextMenu = (event, r) => {
//     event.preventDefault();
//     setContextMenuPosition({ x: event.clientX, y: event.clientY });
//     setShowContextMenu(true);
//     setContextMenuRowData(r);
//   };

//   const handleContextMenuClose = () => {
//     setShowContextMenu(false);
//   };

//   const handleShowHistoryForContext = (event, row) => {
//     dispatch(getReceiptChequeHistory(row.original.receiptChequeItemId));
//     setChequeSelectedInfo({ ...row.original });
//     setOpenHistoryModal(true);
//     handleContextMenuClose();
//   };

//   const contextMenuOptions = [
//     {
//       label: 'نمایش تاریخچه چک',
//       icon: (
//         <History
//           sx={{
//             color: '#4CAF50',
//           }}
//         />
//       ),
//       onClick: handleShowHistoryForContext,
//     },
//   ];

//   function handleClickHistoryBtn(rowInfo) {
//     dispatch(getReceiptChequeHistory(rowInfo.receiptChequeItemId));
//     setChequeSelectedInfo({ ...rowInfo });
//     setOpenHistoryModal(true);
//   }






    return (
        <div className="w-full">



            <div className="w-[80%] p-2 flex flex-col gap-4 mx-auto text-center" >
              <MaterialReactTable table={table} />
            </div>

            <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={paymentModal} onClose={() => handlePaymentModal()}>

              <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
                شارژ کردن کیف پول
              </DialogTitle>
              <Divider />
              <DialogContent className="flex flex-col items-center gap-8 mt-12 h-full " >           

                <div className="flex flex-col justify-center items-center gap-8 w-full" >
                    <TextField
                        className="md:w-[80%] w-[90%]"
                        id="input-with-icon-textfield"
                        label="  مبلغ شارژ "
                        placeholder=" مبلغ واریزی را (به ریال) وارد کنید "
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <PaymentOutlined className='text-asliLight' />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />

              <Textarea 
                className="md:w-[80%] w-[90%]" 
                minRows={2}
                placeholder="توضیحات"
                // value={Address === undefined ? " " : `${Address?.state} ${Address?.formatted_address}`}
                onChange={(e) => setDescription(e.target.value)}
              />



                </div>

              </DialogContent>
              <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
                <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => MakePayment()}>
                  {loading ? <CircularProgress size="medium" /> : " پرداخت "}
                </Button>
                <Button variant="soft" color='danger'  onClick={() => handlePaymentModal()}>
                  انصراف
                </Button>
              </DialogActions>
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

            
        </div>
    );
}

export default WalletPage;