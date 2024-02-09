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



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });





const MyProductsFactory = () => {


    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [data, setData] = useState([])

    const [openDetail, setOpenDetail] = useState(false);
    const [info, setInfo] = useState([])
    const [features, setFeatures] = useState([])
    const [imageUrl, setImageUrl] = useState()
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
      
      await axios.get('https://supperapp-backend.chbk.run/pre_product/factory/list', {
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

          if(productName == "" || price === 0 ){
            setMessage(" فیلد های خالی را تکمیل کنید ")
            setErrorAlert(true)
          }else{
                      // setLoading(true);
          await axios.post('https://supperapp-backend.chbk.run/product/create', {
            "name": productName,
            "pre_product_id": preProductId,
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
              ListApi(Auth)
              setProductName("")
              setPreProductId("")
              setPrice(0)
              setOff(0)
              setDescription("")
              setImageUrl([])
              setAddProductModal(false)
            })
            .catch(function (error) {
              console.log(error, "Error");
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
              // setLoading(false)
            });
          }

      
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
      setOff(0)
      setDescription("")
      setImageUrl([])
      setAddProductModal(false)
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
  }

  const handleAddProductModal = (row) => {
    console.log(row.original)
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
  // renderRowActionMenuItems
  renderRowActions: ({ row, table }) => {
    return (
      <div className="w-max gap-3 flex flex-row justify-center items-center">
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
  }

  // renderTopToolbar: ({ table }) => {

  //   return (
  //     <Box
  //       sx={() => ({
  //         display: 'flex',
  //         gap: '0.5rem',
  //         p: '8px',
  //         justifyContent: 'space-between',
  //       })}
  //     >
  //       <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
  //         {/* import MRT sub-components */}
  //         <MRT_GlobalFilterTextField table={table} />
  //         <MRT_ToggleFiltersButton table={table} />
  //       </Box>
  //       <Box>
  //         <Box sx={{ display: 'flex', gap: '0.5rem' }}>
  //           <button
  //             className="bg-khas text-white p-2 rounded-xl hover:bg-orange-500  "
  //             onClick={() => setAddCategoryModal(true)}
  //           >
  //             دسته بندی جدید <AddCircleOutline/> 
  //           </button>
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // },
});






    return (


      <div className="flex flex-col gap-4" >

        <p className="text-paszamine3 py-4">  لیست پیش محصول ها | برای ایجاد محصول بر روی پیش محصول مورد نظر کلیک راست کنید یا دکمه " افزودن کالا " را بفشارید.  </p>

        <Divider/>

        {/* <div className="p-0 md:w-5/12 w-full flex flex-row" >
          <button onClick={() => setOpenFilter(true)} className="rounded-lg bg-khas text-white p-0 rounded-l-none hover:bg-orange-500 flex flex-row-reverse justify-center items-center px-1 " >
              فیلتر <FilterAlt/>
          </button>
          <Input
              className="w-full rounded-none"
              startDecorator={<Search />}
              placeholder="جستجوی نام یا کد"
              size="lg"
          />
          <Button size="md" className="bg-khas hover:bg-orange-500 w-28 rounded-r-none text-white font-semibold"> جستجو </Button>
      </div> */}

        <MaterialReactTable table={table}/>

        {/* <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        /> */}

      <Modal open={AddProductModal} onClose={() => handleCloseAddProductModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[50vw] h-[70vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              افزودن کالا
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full gap-8 justify-center mx-auto text-center items-center' >

              <TextField
                id="input-with-icon-textfield"
                className="w-[35%] mx-auto"
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

                  <p>طول : {e2p(`${info.height}`)} سانتی متر  </p>
                  <p>عرض: {e2p(`${info.width}`)} سانتی متر  </p>
                  <p>وزن: {e2p(`${info.weight}`)} کیلوگرم  </p>

                </div>
            </div>

            <h2 className="p-2 rounded-2xl bg-sky-200" > ویژگی ها </h2>


            <div className="grid grid-cols-2 gap-4 justify-around items-center w-full" >

              {features.map((x) => (
                <p> {x.main_feature} : {x.main_sample} </p>
              ))} 

            </div>

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

export default MyProductsFactory;