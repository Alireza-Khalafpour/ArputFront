'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DeleteRounded, DetailsOutlined, EditRounded, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, TableRowsRounded } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { CircularProgress, ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";






const CheckComments = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])



      const RepresentationListHeaders = {
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`
      }


    async function ListApi() {
      
      await axios.get('https://supperapp-backend.chbk.run/comment/admin/comment_list', {
        headers:RepresentationListHeaders
        })
        .then((response) => {
            setData(response.data.data)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }



    useEffect(() => {
        ListApi();
    },[])


  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' محصول ',
        accessorKey: 'pre_product_name',
        id: 'pre_product_name',
      },
      {
        header: ' وضعیت تایید ',
        accessorKey: 'is_admin_confirmation',
        id: 'is_admin_confirmation',
        maxSize:20
      },
      {
        header: ' عنوان دیدگاه ',
        accessorKey: 'title',
        id: 'title',
      },
      {
        header: ' تاریخ ',
        accessorKey: 'created_at',
        id: 'created_at',
      },
      {
        header: ' تعداد لایک ',
        accessorKey: 'like',
        id: 'like',
        maxSize:20
      },
      {
        header: ' تعداد دیس لایک ',
        accessorKey: 'dislike',
        id: 'dislike',
        maxSize:20
      },
      {
        header: ' متن دیدگاه ',
        accessorKey: 'content',
        id: 'content',
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


  renderDetailPanel: ({ row }) => (

    <div className="bg-paszamine1 p-2">
        <h3 className="w-full text-start font-extrabold mb-2" > <span className=" p-1 text-base" >  لیست نمایندگی ها </span> </h3>
        <Divider/>
        <Box
          sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              width: '100%',
              textAlign:"justify",
              gap: "12px"
          }}
        >

          {
  
            row?.original?.branch_data.map((item) => ( 
              <>
                <p className="text-lg p-2" > {item.branch_name} </p>
              </>
             ))
          } 


        </Box>
    </div>
  ),

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

export default CheckComments;