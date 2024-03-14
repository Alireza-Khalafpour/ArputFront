'use client'

import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddCircleRounded, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DeleteRounded, DetailsOutlined, EditRounded, FilterAlt, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RadioButtonChecked, RefreshOutlined, Search, TableRowsRounded } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, InputAdornment, Modal, Slide, TextField, Tooltip } from "@mui/material";
import { MRT_ActionMenuItem, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { Alert, Input, ModalDialog, Snackbar, Textarea } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";
import Image from "next/image";
import Link from "next/link";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const MyProducts = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [data, setData] = useState([])

    const [openDetail, setOpenDetail] = useState(false);
    const [info, setInfo] = useState([])
    const [features, setFeatures] = useState([])
    const [imageUrl, setImageUrl] = useState()
    const [hasBundle, setHasBundle] = useState(false)
    // add product states----------------------------
    const[AddProductModal, setAddProductModal] = useState(false);

    const [productName, setProductName] = useState('');
    const [preProductId, setPreProductId] = useState('');
    const [price, setPrice] = useState(0);
    const [off, setOff] = useState(0);
    const [description, setDescription] = useState("");
    const [productImgUrls, setProductImgUrls] = useState([]);
    
    // Alerts---------------------------------------
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/pre_product/list/all', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setData(response.data.Data)
          console.log(response)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }


    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
    },[])

    // Add product Api -------------------------------------------------------

      const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }

      
        async function AddProductApi() {
          // setLoading(true);
          await axios.post('https://supperapp-backend.chbk.run/Product/create', {
            "name": productName,
            "pre_product": preProductId,
            "price": price,
            "description": description,
          }, {
              headers: headers
            })
            .then((response) => {
              console.log(response)
              setAlert(true)
              setMessage(" کالا ایجاد شد ")
              setLoading(false)
              setAddProductModal(false)
              setPreProductId('')
              setProductName('')
              setPrice(0)
              setDescription('')
              ListApi(Auth)
            })
            .catch(function (error) {
              console.log(error, "Error");
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
              setAddProductModal(false)
              // setLoading(false)
            });
      
        }


            // Add image and Name for product-------------
            const [imageL, setImage] = useState()
            const[fileName, setFileName] = useState("فایلی انتخاب نشده...")
          
            const DeleteImg = () => {
              setFileName("فایلی انتخاب نشده...")
              setImage()
              setImgUrl()
            }

            // Drag and Drop image ---------------------------

            function DragHandler(e){
                e.preventDefault();
            }

            function DropHandler(e){
                e.preventDefault();
                setImage(e.dataTransfer.files[0])
            }

            // handle upload image and get url-----------------------------

            const ImgHeaders ={
              'accept': 'application/json',
              'Authorization': `Bearer ${Auth}`,
              'Content-Type': 'multipart/form-data'
              }

            async function handleImageUpload(e) {

                setImage(e.target.files[0])
                setFileName(e.target.files[0].name)
        
                // setLoading(true);
                await axios.post('https://supperapp-backend.chbk.run/upload/upload_texture', {"file" : e.target.files[0]},
                {
                  headers: ImgHeaders
                })
                .then((response) => {
                    console.log(response)
                    setProductImgUrls([response?.data.address])
                    // setLoading(false)
                })
                .catch((error) => {
                  console.log(error, "Error");
                //   setLoading(false)
                });
        
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            };

                    // Activate Factory -----------------------------------------


        async function GetRowIdForActivate(id) {
          setLoading(true);

          const ActiveMethod = {
              method: 'PUT',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer ${Auth}`,
              },
              }
              
              fetch(`https://supperapp-backend.chbk.run/pre_product/admin/active?pre_product_id=${id}`, ActiveMethod)
              .then((response) => {
                  response.json()
              })
              .then((d) => {
                setAlert(true)
                setMessage(" پیش محصول فعال شد ")
                setLoading(false)
                ListApi(Auth)
              }) 
              .catch(err => console.log(err)) 
          
        }
    
    
        // Deactive a Factory -----------------------------------------
    
        const GetRowIdForDelete = (id) => {
    
          setLoading(true);
    
          const deleteMethod = {
              method: 'PUT',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer ${Auth}`,
              },
             }
             
             fetch(`https://supperapp-backend.chbk.run/pre_product/admin/deactive?pre_product_id=${id}`, deleteMethod)
             .then((response) => {
                  response.json()
              })
             .then((d) => {
                setAlert(true)
                setMessage(" پیش محصول حذف شد ")
                setLoading(false)
                ListApi(Auth)
              }) 
             .catch(err => console.log(err)) 
    
        }
        


    

  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام پیش محصول ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' نام دسته بندی ',
        accessorKey: 'category_name',
        id: 'category_name',
      },
      
    ],
    []
  );

  // Admin pre-product Confirmation ----------------
      async function ConfirmPreProduct(row) {
    
        setLoading(true);
  
        const confirmMethod = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${Auth}`,
            },
           }
           
           fetch(`https://supperapp-backend.chbk.run/pre_product/admin/confirmation?pre_product_id=${row.original?.pre_product_id}`, confirmMethod)
           .then((response) => {
                response.json()
            })
           .then((d) => {
              setAlert(true)
              setMessage(" پیش محصول تایید شد ")
              setLoading(false)
              ListApi(Auth)
            }) 
           .catch(err => console.log(err)) 
  
      }

  // --------------------------------------

  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const handleDetailModal = (row) => {
    console.log(row)
    setInfo(row.original.info)
    setFeatures(row.original.features)
    setImageUrl(row.original.image_url)
    setOpenDetail(true)
    setHasBundle(row.original.has_bundle)
  }

  const handleAddProductModal = (row) => {
    console.log(row)
    setAddProductModal(true)
    setPreProductId(row.original.pre_product_id)
    console.log(row.original.pre_product_id)
  }

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
  // renderRowActionMenuItems
  enableCellActions:true,
  renderCellActionMenuItems:({ closeMenu, row, table }) => [
    <MRT_ActionMenuItem
      icon={<EditRounded className="text-asliDark" />}
      key={1}
      label=" جزییات "
      onClick={() => {
        handleDetailModal(row)
        closeMenu();
      }}
      table={table}
    />,
    <Divider/>,
    
    <MRT_ActionMenuItem
      icon={<DeleteRounded className="text-rose-500" />}
      key={2}
      label="غیرفعال کردن"
      onClick={async () => {
        GetRowIdForDelete(row.original?.pre_product_id)
        closeMenu()
      }}
      table={table}
    />,
    <Divider/>,
    <MRT_ActionMenuItem
    icon={<RadioButtonChecked className="text-teal-700" />}
    key={3}
    label="فعال کردن"
    onClick={async () => {
      GetRowIdForActivate(row.original?.pre_product_id)
      closeMenu()
    }}
    table={table}
  />,
  ],
  renderRowActions: ({ row, table }) => {
    return (
      <div className="w-auto">
        {/* <IconButton
          onClick={() => handleAddProductModal(row)}
          title=" افزودن کالا "
        >
          <AddCircleRounded className="text-khas" />
        </IconButton> */}
        <Button onClick={() => handleDetailModal(row)} size="small" className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "  >
          جزییات
        </Button>
        {
          row.original?.admin_confirmation == true
          ?
          null
          :
          <Button onClick={() => ConfirmPreProduct(row)} size="small" className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "  >
            تایید
          </Button>

        }
        {
            row.original.active == true 
            ?
            <IconButton
              color="error"
              onClick={() => GetRowIdForDelete(row.original?.pre_product_id)}
            >
                <DeleteRounded className="text-red-600" titleAccess="غیرفعال کردن" />
            </IconButton>

             :

            <IconButton
            color="success"
            onClick={() => GetRowIdForActivate(row.original?.pre_product_id)}
          >
              <RadioButtonChecked titleAccess="فعال کردن" />
          </IconButton>

          }
      </div>
    )
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
            <Link
              className="bg-khas text-white p-2 rounded-xl hover:bg-orange-500  "
              href="/dashboard/add-pre-product"
            >
              ساخت پیش محصول جدید <AddCircleOutline/> 
            </Link>
          </Box>
        </Box>
      </Box>
    );
  },
});



function handleCloseProductModal() {
  setPreProductId('')
  setProductName('')
  setPrice(0)
  setOff(0)
  setDescription('')
  setProductImgUrls([])
  setAddProductModal(false)
}


    return (


      <div className="flex flex-col gap-4" >

        <MaterialReactTable table={table}/>

        {/* <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        /> */}

      <Modal open={AddProductModal} onClose={() => handleCloseProductModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[50vw] h-[70vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              افزودن کالا
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-[90%] grid grid-cols-2 gap-8 justify-center mx-auto items-center' >
              <TextField
                id="input-with-icon-textfield"
                className="w-[65%]"
                label=" نام کالا  "
                placeholder=" نام کالا  "
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-[65%]"
                label=" قیمت "
                placeholder=" قیمت "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

            <Textarea
                id="input-with-icon-textfield"
                className="w-full border-2 border-gray-500"
                minRows={3}
                label=" توضیحات "
                placeholder=" توضیحات "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className='text-asliLight' />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button onClick={() => AddProductApi()} className='text-white bg-khas hover:bg-orange-600 w-28'>
               افزودن محصول
            </Button>
            <Button variant="soft" color='danger'  onClick={() => handleCloseProductModal()}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Dialog
        open={openDetail}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleCloseDetail}
        aria-describedby="alert-dialog-slide-description"
        className="rounded-xl shadow-lg"
      >

        <DialogContent>

          <div className="flex flex-col mx-auto gap-4 w-full" >

            <h2  className="p-2 rounded-2xl bg-sky-200" > اطلاعات جانبی </h2>
            <div className="flex flex-row gap-1 justify-center items-center w-full" >

                <div className="w-1/3" > <Image src={imageUrl} width={150} height={150} /> </div>
                <div className="w-2/3  grid grid-cols-2 gap-4 " >

                  <p>طول : {e2p(`${info.height}`)} سانتی متر  </p>
                  <p>عرض: {e2p(`${info.width}`)} سانتی متر  </p>
                  <p>وزن: {e2p(`${info.weight}`)} کیلوگرم  </p>

                </div>
            </div>

            <h2 className="p-2 rounded-2xl bg-sky-200" > ویژگی ها </h2>


            <div className="grid grid-cols-2 gap-4 justify-around items-center w-full" >

              {features.map((x) => (
                <p> {x.feature_name} : {x.feature_sample_name} </p>

              ))} 

            </div>
            <h2 className="p-2 rounded-2xl bg-sky-200" > واقعیت افزوده: {hasBundle == true ? "دارد" : "ندارد"} </h2>

          </div>

        </DialogContent>
      </Dialog>

      <Snackbar
          className="bg-green-700 text-white"
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert variant='filled' severity='success' className='text-lg text-white font-semibold bg-green-700' > {message} </Alert>
          </Snackbar>

          <Snackbar
          className="bg-rose-700 text-white"
          open={errorAlert}
          autoHideDuration={4000}
          onClose={() => setErrorAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert variant='filled' severity='error' className='text-lg text-white font-semibold bg-rose-700 ' > {message} </Alert>
      </Snackbar>


      </div>



    );
}

export default MyProducts;