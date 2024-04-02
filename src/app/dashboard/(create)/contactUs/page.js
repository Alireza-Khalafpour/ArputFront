'use client'





import * as shamsi from 'shamsi-date-converter';
import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DeleteRounded, DetailsOutlined, EditRounded, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RadioButtonChecked, RefreshOutlined, TableRowsRounded } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { CircularProgress, ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";
import { digitsEnToFa } from "@persian-tools/persian-tools";







const CreateContactUs = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])



      const Headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`
      }

      // fetch existing contact-us information for admin -----------------------

    async function ListApi() {
      
      await axios.get('https://supperapp-backend.chbk.run/contact_us/admin/show', {
        headers:Headers
        })
        .then((response) => {
            console.log(response.data)
            setData(response.data)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }

    useEffect(() => {
        ListApi();
    },[])

      // Confirm And Reject comment -----------------------------------------


      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }
      
  
      async function EditCommentApi(row) {
        setLoading(true);
        await axios.patch('https://supperapp-backend.chbk.run/comment/admin/confirm_comment', {
            "comment_id": row.original.id,
            "is_admin_confirmation": row.original.is_admin_confirmation == true ? false : true
          }, {
            headers: headers
          })
          .then((response) => {
            if (response.data.Done=== true) {
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
    
          ListApi()
      }
  
    


  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' آیدی ',
        accessorKey: 'id',
        id: 'id',
      },
      {
        header: ' موبایل ',
        accessorKey: 'mobile',
        id: 'mobile',

      },
      {
        header: ' تلفن ',
        accessorKey: 'tel',
        id: 'tel',
      },
      {
        header: ' ایمیل ',
        accessorKey: 'email',
        id: 'email',
      },
      {
        header: ' آدرس ',
        accessorKey: 'address',
        id: 'address',
      },

      
    ],
    []
  );


const table = useMaterialReactTable({
  columns,
  data,
  localization: mrtLocalizationFa,
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
        {
            row.original.is_admin_confirmation == true 
            ?
            <IconButton
              color="error"
              onClick={() => EditCommentApi(row)}
            >
                <DeleteRounded className="text-red-600" titleAccess="رد کردن" />
            </IconButton>

            :

            <IconButton
            color="success"
            onClick={() => EditCommentApi(row)}
          >
              <RadioButtonChecked titleAccess="تایید کردن" />
          </IconButton>

          }
      </Box>
    )
  },

});


    return (

      <div>

        <MaterialReactTable table={table}/>

        {/* <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        /> */}

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

export default CreateContactUs;