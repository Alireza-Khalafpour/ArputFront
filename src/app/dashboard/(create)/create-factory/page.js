'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, Category, DeleteRounded, Edit, EditAttributes, LocationCity, LocationOnRounded, Person, RadioButtonChecked, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import {  IconButton, Textarea } from "@mui/joy";
import CustomNeshanMap from "@/components/module/NeshanMap";
import { useRouter } from "next/navigation";
import EditFactoryModalPage from "@/components/module/EditFactoryModalPage";
import { digitsEnToFa } from "@persian-tools/persian-tools";



export const CreateCategory = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    // when factory updated fetch Factory list Again ----------
    const [triggerUpdateFactory, setTriggerUpdateFactory] = useState()

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

    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
      categoryListApi(Auth);
    },[triggerUpdateFactory])
    
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
          if(response.data.Done === true){
            setAlert(true)
            setMessage("  کارخانه جدید با موفقیت افزوده شد، آدرس را اضافه کنید. ")
            setLoading(false)
            setAddCategoryModal(false)
            setaddFactoryName()
            setaddCategs([])
            setAddTelephone()
            setAddMobile()
            ListApi(Auth)
          }else {
            setMessage(response.data.Message)
            setErrorAlert(true)
            setaddFactoryName()
            setaddCategs([])
            setAddTelephone()
            setAddMobile()
            setLoading(false)
            setAddCategoryModal(false)
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setaddFactoryName()
          setaddCategs([])
          setAddTelephone()
          setAddMobile()
          setLoading(false)
          setAddCategoryModal(false)
        });
  
    }

    // Edit and Update factory part -------------------

    const [editFactoryModal, setEditFactoryModal] = useState(false);
    const [editFactoryInfo, setEditFactoryInfo] = useState();

    function GetRowIdForUpdateFactory(row) {
      setEditFactoryInfo(row.original)
      setEditFactoryModal(true)
    }

    // Edit Factory Username---------------------------------

    const [openEditUsernameModal, setOpenEditUsernameModal] = useState(false)

    const headersEditUsername ={
      'accept': 'application/json',
      'Authorization': `Bearer ${Auth}`,
      'Content-Type': 'application/json',
      }

      const handleEditFactoryUsername = (row) => {
        setOpenEditUsernameModal(true);
        setFactoryIdForAddress(row.original.id)
      }
    
    
      async function GetRowIdForUpdateUsername() {
          setLoading(true);
          await axios.patch('https://supperapp-backend.chbk.run/register/factory/change_username', {
            "factory_id": factoryIdForAddress,
            "new_mobile": addMobile
          }, 
          {
            headers: headersEditUsername
          })
          .then((response) => {
              setAlert(true)
            if(response.data.Done === true){
              setAlert(true)
              setMessage(response.data?.Error_text)
            }else {
              setMessage(response.data?.Error_text)
              setErrorAlert(true)
            }
          })
          .catch(function (error) {
              console.log(error)
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
          });
          setLoading(false)
          setOpenEditUsernameModal(false)
          setFactoryIdForAddress("")
          setAddMobile("")
          ListApi(Auth)

      } 

    // Factory Address Part  -----------------------------------

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

      if(zipcode == null || zipcode == '') {
        setMessage(" کدپستی را به درستی وارد کنید ")
        setErrorAlert(true)
      }else{
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
          setAlert(true)
          setMessage(" آدرس با موفقیت ثبت شد ")
          setLoading(false)
          setAddAddressModal(false)
          ListApi(Auth)
          setTimeout(() => {
            // route.refresh()
            window.location.reload();
          }, 800);
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setAddAddressModal(false)
          setLoading(false)
          setTimeout(() => {
            // route.refresh()
            window.location.reload();
          }, 800);
        });
      }

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
        Cell: ({ cell }) => <span>{digitsEnToFa(cell.getValue())}</span>,
      },
      {
        header: ' تلفن ',
        accessorKey: 'telephone',
        id: 'telephone',
        Cell: ({ cell }) => <span>{digitsEnToFa(cell.getValue())}</span>,
      },
      // {
      //   header: ' تلفن ',
      //   accessorKey: 'telephone',
      //   id: 'telephone',
      //   Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      // },
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

  displayColumnDefOptions:{    
    'mrt-row-expand': {
      size: 70
    },
  },
  muiTableContainerProps: { 
    sx: {
      maxHeight: '500px' ,
      borderRadius: "30px",
    } 
  },
  muiTablePaperProps: {
    sx: {
      borderRadius: "30px",
      } 
  },
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
          className=" hover:bg-slate-300 p-1 rounded-xl text-sm "
          onClick={() => GetRowIdForPatchAddress(row)}
        >
          <LocationOnRounded />
          آدرس
        </IconButton>
        <IconButton
          className=" hover:bg-slate-300 p-1 rounded-xl text-sm "
          onClick={() => GetRowIdForUpdateFactory(row)}
        >
          <Edit />
          ویرایش
        </IconButton>
        <IconButton
          className=" hover:bg-slate-300 p-1 rounded-xl text-sm "
          onClick={() => handleEditFactoryUsername(row)}
        >
          <EditAttributes />
          ویرایش نام کاربری
        </IconButton>
        {
            row.original.active == true 
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
  renderDetailPanel: ({ row }) => (

    <>
        <h3 className="w-full text-start font-extrabold border-b-2 p-1 " > اطلاعات آدرس و دسته بندی ها: </h3>
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

  // Activate Factory -----------------------------------------


  async function GetRowIdForActivate(id) {
      setLoading(true);

      const ActiveMethod = {
          method: 'PATCH',
          headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${Auth}`,
          },
          }
          
          fetch(`https://supperapp-backend.chbk.run/factory/admin/active/${id}`, ActiveMethod)
          .then((response) => {
              response.json()
          })
          .then((d) => {
            setAlert(true)
            setMessage(" کارخانه فعال شد ")
            setLoading(false)
            ListApi(Auth)
          }) 
          .catch(err => console.log(err)) 

  }


  // Deactive a Factory -----------------------------------------

  const GetRowIdForDelete = (id) => {

    setLoading(true);

    const deleteMethod = {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Auth}`,
        },
        }
        
        fetch(`https://supperapp-backend.chbk.run/factory/admin/deactive/${id}`, deleteMethod)
        .then((response) => {
            response.json()
        })
        .then((d) => {
          setAlert(true)
          setMessage(" کارخانه حذف شد ")
          setLoading(false)
          ListApi(Auth)
        }) 
        .catch(err => console.log(err)) 

  }


  // // modal part -------------------------------------------------------------
  // const[count, setCount] = useState(0);
  // const[price, setPrice] = useState(0);
  // const [image, setImage] = useState([])
  // const[fileName, setFileName] = useState("فایلی انتخاب نشده...")
  
  // const DeleteImg = () => {
    //   setFileName("فایلی انتخاب نشده...")
    //   setImage([])
    // }
    

  const[addCategoryModal, setAddCategoryModal] = useState(false);
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
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center ' >
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
                  variant="outlined"
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
                  renderInput={(params) => <TextField {...params} variant="outlined" label=" افزودن دسته بندی " />}
                />
              </div>
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center' >
                <TextField
                  className="md:w-[28%] w-[90%]"
                  id="input-with-icon-textfield"
                  label=" نام کاربری و رمزعبور "
                  placeholder="  نام کاربری و رمزعبور "
                  value={addMobile}
                  onChange={(e) => setAddMobile(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <SmartphoneOutlined className='text-asliLight' />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
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
                  variant="outlined"
                />
              

              </div>

            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFactoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => CloseHandler()}>
              انصراف
            </Button>
          </DialogActions>
      </Dialog>




      <Dialog fullWidth className="w-full" scroll="body" maxWidth="md" open={addAddressModal} onClose={() => CloseAddressModal()}>

        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ثبت آدرس برای کارخانه ی 
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 h-[90vh] " >           

          <div className="flex flex-col justify-center items-center gap-10 w-full h-full" >

              <div className="" >
                <CustomNeshanMap setAddress={setAddress} setLatLang={setLatLang} />
              </div>


              <div className='w-full flex flex-col justify-center items-start gap-1' >
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 justify-center items-center" >
                  <TextField
                    className="md:w-[90%] w-full p-3"
                    id="input-with-icon-textfield"
                    label=" خیابان  "
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
                    variant="outlined"
                  />
                  <TextField
                    className="md:w-[90%] w-full p-3 "
                    id="input-with-icon-textfield"
                    placeholder=" کوچه  "
                    label = "کوچه"
                value={alley}
                    onChange={(e) => setAlley(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Category className='text-asliLight' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                  <TextField
                    className="md:w-[90%] w-full p-3 "
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
                    variant="outlined"
                  />
                  <TextField
                    className="md:w-[90%] w-full p-3 "
                    id="input-with-icon-textfield"
                    placeholder=" کدپستی  "
                    label= "کدپستی"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Category className='text-asliLight' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
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



      
      <EditFactoryModalPage setTriggerUpdateFactory={setTriggerUpdateFactory} editFactoryModal={editFactoryModal} setEditFactoryModal={setEditFactoryModal} editFactoryInfo={editFactoryInfo} />


      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={openEditUsernameModal} onClose={() => setOpenEditUsernameModal(false)}>

        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ویرایش نام کاربری
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 " >           

        <div className="flex flex-col justify-center items-center gap-10 w-full h-full" >
                <div className="w-full flex flex-col gap-2 justify-center items-center mx-auto" >

                <TextField
                    className="md:w-1/2 w-full p-3"
                    id="input-with-icon-textfield"
                    placeholder=" نام کاربری جدید  "
                    label = "نام کاربری جدید "
                    value={addMobile}
                    onChange={(e) => setAddMobile(e.target.value)}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="end">
                        <Person className='text-asliLight' />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                />



                </div>

        </div>

        </DialogContent>
        <DialogActions className="p-4 flex flex-row gap-4" >
        <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => GetRowIdForUpdateUsername()} >
            {loading ? <CircularProgress size="medium" /> : " ثبت تغییرات "}
        </Button>
        <Button variant="soft" color='danger'  onClick={() => setOpenEditUsernameModal(false)}>
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