'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DetailsOutlined, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, RingVolume, RingVolumeOutlined, SmartphoneOutlined, TableRowsRounded } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip, Typography } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";



export const CreateCategory = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [categoryList, setcategoryList] = useState([])
    const [addCateg, setaddCategs] = useState([])
    const [CategoryIds, setCategoryIds] = useState([])
    const [addFactoryName, setaddFactoryName] = useState("")
    const [addMobile, setAddMobile] = useState("")
    const [addTelephone, setAddTelephone] = useState("")


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/factory/list', {
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

    

    async function categoryListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/category/list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setcategoryList(response.data.data)
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
      categoryListApi(Auth);
    },[])
    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
  
    async function AddFactoryApi() {
        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/factory/create', {
            'name': addFactoryName, 
            'categories':CategoryIds,
            'telephone': addTelephone,
            'mobile': addMobile,
        }, 
        {
          headers: headers
        })
        .then((response) => {
            console.log(response)
          setAlert(true)
          setMessage("  کارخانه جدید با موفقیت افزوده شد، آدرس را اضافه کنید. ")
          setLoading(false)
        //   setAddCategoryModal(false)
          ListApi(Auth)
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

      



  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام کارخانه ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' نام کاربری ',
        accessorKey: 'username',
        id: 'username',
      },
      {
        header: ' موبایل ',
        accessorKey: 'mobile',
        id: 'mobile',
        Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,
      },
      {
        header: ' تلفن ',
        accessorKey: 'telephone',
        id: 'telephone',
        Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,
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
  muiDetailPanelProps:{
    sx:{
        backgroundColor:"rgba(249,115,22,0.3)"
    }
  },
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
              onClick={() => setAddCategoryModal(true)}
            >
                ثبت کارخانه جدید <AddCircleOutline/> 
            </button>
          </Box>
        </Box>
      </Box>
    );
  },
  renderDetailPanel: ({ row }) => (

    <>
        <h3 className="w-full text-start font-extrabold" > اطلاعات آدرس و دسته بندی ها: </h3>
        <Divider className="my-2" />
        <Box
        sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            textAlign:"justify",
        }}
        >

        
        {row.original.address.map((i) => (
            <>
                <Typography> آدرس : {i.main_address} </Typography>
                <Typography> خیابان : {i.street}  </Typography>
                <Typography> کوچه : {i.alley} </Typography>
                <Typography> کد پستی : {e2p(i.zip_code)} </Typography>
            </>
        ) )}
        <Divider/>
        <Divider/>
            {row.original.category.map((i) => (
            <>
                <Typography className="mt-2 w-full text-start" > نام دسته بندی : {i.name} </Typography>
            </>
        ) )}

        </Box>
    </>
  ),



});

  // modal part -------------------------------------------------------------
  const[addCategoryModal, setAddCategoryModal] = useState(false);
  const[count, setCount] = useState(0);
  const[price, setPrice] = useState(0);
  const [image, setImage] = useState([])
  const[fileName, setFileName] = useState("فایلی انتخاب نشده...")

  const DeleteImg = () => {
    setFileName("فایلی انتخاب نشده...")
    setImage([])
  }

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

      <Modal className="w-full" open={addCategoryModal} onClose={() => setAddCategoryModal(false)}>
        <ModalDialog variant="outlined" role="definition" className="w-[60vw] h-[65vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
             ایجاد کارخانه جدید و ثبت آدرس
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                className="md:w-[28%] w-[90%]"
                id="input-with-icon-textfield"
                label=" نام کارخانه  "
                placeholder=" نام کارخانه   "
                value={addFactoryName}
                onChange={(e) => setaddFactoryName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className='text-asliLight' />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            
              <Autocomplete
                className="md:w-[28%] w-[90%]"
                disablePortal
                multiple
                limitTags={1}
                noOptionsText=" داده ای موحود نیست "
                options={categoryList}
                getOptionLabel={(i)=> i.name}
                onChange={(event, val) =>{
                  setaddCategs([...val]);
                }}
                sx={{ width:"190px"}}
                renderInput={(params) => <TextField {...params} variant="standard" label=" افزودن دسته بندی " />}
              />
            </div>
            <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                className="md:w-[28%] w-[90%]"
                id="input-with-icon-textfield"
                label=" شماره همراه "
                placeholder=" شماره همراه "
                value={e2p(addMobile)}
                onChange={(e) => setAddMobile(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SmartphoneOutlined className='text-asliLight' />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

              <TextField
                className="md:w-[28%] w-[90%]"
                id="input-with-icon-textfield"
                label=" تلفن "
                placeholder=" تلفن  "
                value={e2p(addTelephone)}
                onChange={(e) => setAddTelephone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <RingVolumeOutlined className='text-asliLight' />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            

            </div>


            <h2 className="border-t-2 w-[100%] text-center pt-6 text-lg font-bold " > ثبت آدرس </h2>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddCategoryModal(false)}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

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

export default CreateCategory;