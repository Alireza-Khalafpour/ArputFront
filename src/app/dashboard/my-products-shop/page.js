'use client'

import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { Category, CloudUpload, Delete} from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, Modal, Slide, TextField,  } from "@mui/material";
import {  MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { Alert, ModalDialog, Snackbar, Textarea } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";
import Image from "next/image";
import ProuductsTableOfShopAndFactory from "@/components/templates/ProuductsTableOfShopAndFactory";
import { digitsEnToFa } from "@persian-tools/persian-tools";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const MyProductsShop = ()=> {

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

    const [triggerGetShopProductApi, setTriggerGetShopProductApi] = useState(1)

    const [productName, setProductName] = useState('');
    const [preProductId, setPreProductId] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    // -----------------------------------------------
    const [imageFiles, setImageFiles] = useState([])
    console.log(imageFiles)
    
    // Alerts---------------------------------------
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/pre_product/shop/list/all', {
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

          if(productName === "" || price === 0 ){
            setMessage(" فیلد های خالی را تکمیل کنید ")
            setErrorAlert(true)
          }else{
                      // setLoading(true);
          await axios.post('https://supperapp-backend.chbk.run/product/create', {
              "name": productName,
              "pre_product_id": preProductId,
              "price": price,
              "description": description,
              "other_image_url": []

          }, {
              headers: headers
            })
            .then((response) => {
              setAlert(true)
              setMessage(response.data.message)
              setLoading(false)
              ListApi(Auth)
              setProductName("")
              setPreProductId("")
              setPrice(0)
              setDescription("")
              setAddProductModal(false)
              setTriggerGetShopProductApi((prev) => prev + 1 )
            })
            .catch(function (error) {
              console.log(error, "Error");
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
              // setLoading(false)
            });
          }

      
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
      {
        header: ' برند/کارخانه ',
        accessorKey: 'factory_name',
        id: 'factory_name',
        filterVariant: 'select',
        // filterSelectOptions: BrandsList,
      },
      {
        header: ' وضعیت دسترسی ',
        accessorKey: 'is_public',
        id: 'is_public',
        Cell: ({ cell }) => <span>{cell.getValue() === true ? "در تمام فروشگاه ها" : "فقط در نمایندگی ها"}</span>,
      },
      
      // {
      //   header: ' قیمت ',
      //   Cell: ({ cell }) => <span>{e2p(cell.getValue().toLocaleString())}</span>,
      // },
      // {
      //   header: ' تخفیف ',
      //   Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,
      // },

    ],
    []
  );

  // handle close modal add product--------------------------

    const handleCloseAddProductModal = () =>{
      setProductName("")
      setPreProductId("")
      setPrice(0)
      setDescription("")
      setImageUrl([])
      setAddProductModal(false)
    }

  // --------------------------------------

  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const handleDetailModal = (row) => {

    setInfo(row.original.info)
    setFeatures(row.original.features)
    setImageUrl(row.original.image_url)
    setOpenDetail(true)
    setHasBundle(row.original.has_bundle)

  }

  const handleAddProductModal = (row) => {

    setAddProductModal(true)
    setPreProductId(row.original.pre_product_id)
    setProductName(row.original.name)
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
  
  renderRowActions: ({ row, table }) => {
    return (
      <div className="max-w-min gap-3 flex flex-row">
        <Button
          size="small" 
          className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "
          onClick={() => handleAddProductModal(row)}
          title=" افزودن کالا "
        >
          افزودن کالا 
        </Button>
        <Button onClick={() => handleDetailModal(row)} size="small" className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "  >
          جزییات
        </Button>
      </div>
    )
  },

  displayColumnDefOptions: {
    'mrt-row-actions': {
      size: 80,
    },
  },

 
});






    return (


      <div className="flex flex-col gap-4" >

        <p className="text-paszamine3 py-4">  لیست پیش محصول ها | برای ایجاد محصول بر روی پیش محصول مورد نظر کلیک راست کنید یا دکمه " افزودن کالا " را بفشارید.  </p>

        <Divider/>

        <MaterialReactTable table={table}/>

        <span className="text-xl font-bold pt-4 " > لیست کالا های شما  </span> 

        <Divider/>

        <ProuductsTableOfShopAndFactory triggerGetShopProductApi={triggerGetShopProductApi} />


      <Modal open={AddProductModal} onClose={() => handleCloseAddProductModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[50vw] h-[70vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              افزودن کالا
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full grid grid-cols-2 gap-4 justify-center items-center' >


              <TextField
                id="input-with-icon-textfield"
                className="w-1/2"
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


              {/* <div className="w-1/2" >
                  <label class="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size"> همه عکس ها را انتخاب کنید </label>
                  <input class="w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" multiple/>
              </div> */}

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
            <Button variant="soft" color='danger'  onClick={() => handleCloseAddProductModal()}>
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

                  <p>طول : {digitsEnToFa(`${info.height}`)} سانتی متر  </p>
                  <p>عرض: {digitsEnToFa(`${info.width}`)} سانتی متر  </p>
                  <p>وزن: {digitsEnToFa(`${info.weight}`)} کیلوگرم  </p>

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
          className="bg-green-700 text-white text-center"
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert variant='filled' severity='success' className='text-lg text-white font-semibold bg-green-700 mx-auto' > {message} </Alert>
          </Snackbar>

          <Snackbar
          className="bg-rose-700 text-white text-center"
          open={errorAlert}
          autoHideDuration={4000}
          onClose={() => setErrorAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert variant='filled' severity='error' className='text-lg text-white font-semibold bg-rose-700 mx-auto ' > {message} </Alert>
      </Snackbar>


      </div>



    );
}

export default MyProductsShop;