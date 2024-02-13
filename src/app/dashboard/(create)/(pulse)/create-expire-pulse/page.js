'use client'

import { AddCircleOutline, Category } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, Snackbar, TextField } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";


const ExpirePulse = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [departmentName, setDepartmentName] = useState("")


    const [addDepartmentModal, setAddDepartmentModal] = useState(false)


    // گرفتن لیست برنامه های تایم اکسپایر
    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/pulse/time/expire/admin/list', {
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


    //------------------------------------------------------------


    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
    },[])
    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
  
    async function AddFactoryApi() {
        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/department/create', {
            'dep_name': departmentName, 
        }, 
        {
          headers: headers
        })
        .then((response) => {
          if(response.data.Done === true){
            setAlert(true)
            setMessage(response.data.Message)
            setLoading(false)
            setAddDepartmentModal(false)
            setDepartmentName()
            ListApi(Auth)
          }else {
            setMessage(response.data.Message)
            setErrorAlert(true)
            setDepartmentName()
            setLoading(false)
            setAddDepartmentModal(false)
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setDepartmentName()
          setLoading(false)
          setAddDepartmentModal(false)
        });
  
    }


  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام  ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: '  زمان انقضا(ساعت)  ',
        accessorKey: 'hours',
        id: 'hours',
      },
      {
        header: ' پالس AR ',
        accessorKey: 'ar_pulse',
        id: 'ar_pulse',
        Cell: ({ cell }) => <span>{cell.getValue() === true ? "دارد" : "ندارد"}</span>,
      },
        {
          header: ' وضعیت ',
          accessorKey: 'active',
          id: 'active',
          Cell: ({ cell }) => <span>{cell.getValue() === true ? "فعال" : "غیرفعال"}</span>,
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
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* import MRT sub-components */}
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="bg-khas text-white p-2 rounded-xl hover:bg-orange-500  "
              onClick={() => setAddDepartmentModal(true)}
            >
                ثبت زمان جدید <AddCircleOutline/> 
            </button>
          </Box>
        </Box>
      </Box>
    );
  },
//   renderRowActions: ({ row }) => {
//     return (
//       <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
//         <IconButton
//           onClick={() => GetRowIdForPatchAddress(row)}
//         >
//           <LocationOnRounded />
//           آدرس
//         </IconButton>
//       </Box>
//     )
//   },

});



    return (

      <div className="w-full" >

        <MaterialReactTable table={table}/> 

        {/* <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        /> */}

      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={addDepartmentModal} onClose={() => setAddDepartmentModal(false)}>

          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد زمان جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >
                <TextField
                  className="md:w-[50%] w-[90%]"
                  id="input-with-icon-textfield"
                  label=" نام زمان  "
                  placeholder=" نام زمان   "
                //   value={departmentName}
                //   onChange={(e) => setDepartmentName(e.target.value)}
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

            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddDepartmentModal(false)}>
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

export default ExpirePulse;