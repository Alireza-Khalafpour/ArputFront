'use client'

import axios from "axios";
import * as shamsi from 'shamsi-date-converter';
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, Category, DeleteRounded, Edit, LocationCity, LocationOnRounded, RadioButtonChecked, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useRouter } from "next/navigation";
import { digitsEnToFa } from "@persian-tools/persian-tools";



export const CreateDepartment = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [addCateg, setaddCategs] = useState([])
    const [CategoryIds, setCategoryIds] = useState([])
    const [departmentName, setDepartmentName] = useState("")
    const [EditDepartmentId, setEditDepartmentId] = useState("")
    const [editDepartment, setEditDepartment] = useState(false)


    const [addDepartmentModal, setAddDepartmentModal] = useState(false)



    // Fetch department list ---------------------------

    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/department/department_list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setData(response.data.data)
          console.log(response.data.data)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }

    

    useEffect(() => {
      setCategoryIds(addCateg.map((i) => i.id))
    },[addCateg])

    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
    },[])
    
    // Create new department------------------------------------------

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

        // Edit Department Api -------------------------------

        const GetRowIdForEdit = (row) => {
          setEditDepartmentId(row.original.id)
          setDepartmentName(row.original.dep_name)
          setEditDepartment(true)
          setAddDepartmentModal(true)
        }
    
        async function EditDepartmentApi() {
          setLoading(true);
          await axios.patch('https://supperapp-backend.chbk.run/department/update', {
            "id": EditDepartmentId,
            "dep_name":departmentName,
            "is_active": true
          }, {
              headers: headers
            })
            .then((response) => {
              if (response.data.Done=== true) {
                setAlert(true)
                setMessage(response.data.message)
              }else {
                setMessage(response.data.message)
                setErrorAlert(true)
              }
            })
            .catch(function (error) {
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
            });
      
            ListApi(Auth)
            setDepartmentName("")
            setEditDepartmentId("")
            setLoading(false)
            setAddDepartmentModal(false)
            setEditDepartment(false)
        }

        // Activate Department -----------------------------------------

        async function GetRowIdForActivate(id) {
          setLoading(true);

          const ActiveMethod = {
              method: 'PATCH',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer ${Auth}`,
              },
              }
              
              fetch(`https://supperapp-backend.chbk.run/department/active?department_id=${id}`, ActiveMethod)
              .then((response) => {
                  response.json()
              })
              .then((d) => {
                setAlert(true)
                setMessage(" دپارنمان فعال شد ")
                setLoading(false)
                ListApi(Auth)
              }) 
              .catch(err => console.log(err)) 
          
        }
    
    
        // Deactive Department -----------------------------------------
    
        const GetRowIdForDelete = (id) => {
    
          setLoading(true);
    
          const deleteMethod = {
              method: 'PATCH',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer ${Auth}`,
              },
             }
             
             fetch(`https://supperapp-backend.chbk.run/department/deactive?department_id=${id}`, deleteMethod)
             .then((response) => {
                  response.json()
              })
             .then((d) => {
                setAlert(true)
                setMessage(" دپارتمان حذف شد ")
                setLoading(false)
                ListApi(Auth)
              }) 
             .catch(err => console.log(err)) 
    
        }


  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام دپارتمان ',
        accessorKey: 'dep_name',
        id: 'dep_name',
      },
      {
        header: '  تاریخ ایجاد ',
        accessorKey: 'created_at',
        id: 'created_at',
        Cell: ({ cell }) => <span>{ digitsEnToFa(shamsi.gregorianToJalali(cell.getValue()).join('/')) }</span>,
      },
      {
        header: ' ایجاد توسط ',
        accessorKey: 'created_by_name',
        id: 'created_by_name',
      },
      {
          header: '  تاریخ بروزرسانی ',
          accessorKey: 'updated_at',
          id: 'updated_at',
          Cell: ({ cell }) => <span>{ cell.getValue() ? digitsEnToFa(shamsi.gregorianToJalali(cell.getValue()).join('/')) : ""}</span>,
        },
        {
            header: ' بروزرسانی توسط ',
            accessorKey: 'updated_by_name',
            id: 'updated_by_name',
        },
        {
          header: ' وضعیت ',
          accessorKey: 'is_active',
          id: 'is_active',
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
                ثبت دپارتمان جدید <AddCircleOutline/> 
            </button>
          </Box>
        </Box>
      </Box>
    );
  },
  renderRowActions: ({ row }) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton
          className=" hover:bg-slate-300 p-1 rounded-xl "
          onClick={() => GetRowIdForEdit(row)}
        >
          <Edit />
          
        </IconButton>
        {
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

          }
      </Box>
    )
  },

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
            {editDepartment ? " ویرایش دپارتمان " : "ایجاد دپارتمان جدید"}
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >
                <TextField
                  className="md:w-[50%] w-[90%]"
                  id="input-with-icon-textfield"
                  label=" نام دپارتمان  "
                  placeholder=" نام دپارتمان   "
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
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
            {
              editDepartment
              ?
              <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => EditDepartmentApi()}>
                {loading ? <CircularProgress size="medium" /> : " ویرایش "}
              </Button>
              :
              <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryApi()}>
                {loading ? <CircularProgress size="medium" /> : " ثبت "}
              </Button>
            }
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

export default CreateDepartment;