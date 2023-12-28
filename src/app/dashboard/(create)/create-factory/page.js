'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, Category, LocationCity, LocationOnRounded, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import {  IconButton, Textarea } from "@mui/joy";
import CustomNeshanMap from "@/components/module/NeshanMap";
import { useRouter } from "next/navigation";



export const CreateCategory = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

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

    // Address Part  -----------------------------------

    const [Address, setAddress] = useState()
    const [latLang, setLatLang] = useState()
    const [factoryIdForAddress, setFactoryIdForAddress] = useState()
    const [addAddressModal, setAddAddressModal] = useState(false)
    const [street, setStreet] = useState()
    const [alley, setAlley] = useState()
    const [number, setNumber] = useState()
    const [zipcode, setZipcode] = useState()



    const CloseAddressModal = () => {
      setAddAddressModal(false)
      setTimeout(() => {
        // route.refresh()
        window.location.reload();
      }, 300);
    }

    function GetRowIdForPatchAddress(row) {
      setFactoryIdForAddress(row.original.id)
      setAddAddressModal(true)
    }

    async function AddFactoryAddress() {
      setLoading(true);
      await axios.patch(`https://supperapp-backend.chbk.run/factory/set_address?factory_id=${factoryIdForAddress}`, {
        "lat": latLang?.lat,
        "lng": latLang?.lng,
        "main_address": Address.formatted_address,
        "street": street,
        "alley": alley,
        "number": number,
        "remain": "",
        "zip_code": zipcode
      }, 
      {
        headers: headers
      })
      .then((response) => {
        console.log(response.data.Done)
        setAlert(true)
        setMessage(" آدرس با موفقیت ثبت شد ")
        setLoading(false)
      //   setAddCategoryModal(false)
        ListApi(Auth)
        // setTimeout(() => {
        //   // route.refresh()
        //   window.location.reload()
        // }, 700);
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
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        header: ' تلفن ',
        accessorKey: 'telephone',
        id: 'telephone',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
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
  renderRowActions: ({ row }) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton
          color="error"
          onClick={() => GetRowIdForPatchAddress(row)}
        >
          <LocationOnRounded />
        </IconButton>
      </Box>
    )
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
        className="bg-paszamine1"
        >

        
        {row.original.address.map((i) => (
            <>
                <Typography> آدرس : {i.main_address} </Typography>
                <Typography> خیابان : {i.street}  </Typography>
                <Typography> کوچه : {i.alley} </Typography>
                <Typography> کد پستی : {(i.zip_code)} </Typography>
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

  const CloseHandler = () => {
    setAddCategoryModal(false)
  }

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

      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="md" open={addCategoryModal} onClose={() => CloseHandler()}>

          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد کارخانه جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-[90vh] " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex flex-row justify-around items-center ' >
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
                  value={addMobile}
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
                  value={addTelephone}
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

            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => CloseHandler()}>
              انصراف
            </Button>
          </DialogActions>
      </Dialog>




      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="md" open={addAddressModal} onClose={() => CloseAddressModal()}>

        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ثبت آدرس برای کارخانه ی 
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 h-[90vh] " >           

          <div className="flex flex-col justify-center items-center gap-10 w-full" >

              <div>
                <CustomNeshanMap setAddress={setAddress} setLatLang={setLatLang} />
              </div>


              <div className='w-full flex flex-col justify-center items-start gap-1 ' >
                <div className="w-full grid grid-cols-2 gap-2 justify-center items-center" >
                  <TextField
                    className="w-[90%]"
                    id="input-with-icon-textfield"
                    label="  خیابان  "
                    placeholder=" خیابان  "
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Category className='text-asliLight' />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    className="w-[90%]"
                    id="input-with-icon-textfield"
                    label=" کوچه "
                    placeholder=" کوچه  "
                value={alley}
                    onChange={(e) => setAlley(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Category className='text-asliLight' />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    className="w-[90%]"
                    id="input-with-icon-textfield"
                    label=" پلاک "
                    placeholder=" پلاک  "
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Category className='text-asliLight' />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    className="w-[90%]"
                    id="input-with-icon-textfield"
                    label=" کدپستی "
                    placeholder=" کدپستی  "
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
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
                <h2 className="border-b-2 text-lg" > آدرس </h2>
              <Textarea 
                className="w-full" 
                minRows={3}
                value={Address === undefined ? " " : `${Address?.state} ${Address?.formatted_address}`}
                onChange={(e) => setAddress(e.target.value)}
              />

              </div>

          </div>

        </DialogContent>
        <DialogActions className="p-4 flex flex-row gap-4" >
          <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryAddress()}>
            {loading ? <CircularProgress size="medium" /> : " ثبت آدرس "}
          </Button>
          <Button variant="soft" color='danger'  onClick={() => CloseAddressModal()}>
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

export default CreateCategory;