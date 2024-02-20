"use client"

import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddCircleRounded, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DetailsOutlined, FilterAlt, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, Search, TableRowsRounded } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, InputAdornment, Modal, Slide, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { Alert, Input, ModalDialog, Snackbar, Textarea } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";
import Image from "next/image";




const CreateBundle = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')



    const [data, setData] = useState([])
    // add Bundle states----------------------------
    const[AddBundleModal, setAddBundleModal] = useState(false);

    const [preProductId, setPreProductId] = useState('');
    const [albedo_texture_url, set_albedo_texture_url] = useState("");
    const [metalic_texture_url, set_metalic_texture_url] = useState("");
    const [normal_map_texture_url, set_normal_map_texture_url] = useState("");
    const [height_map_texture_url, set_height_map_texture_url] = useState("");
    const [smoothness, set_smoothness] = useState(0);
    const [height_map_intensity, set_height_map_intensity] = useState(0);
    const [tile_in_texture, set_tile_in_texture] = useState(0);
    const [number_of_product_in_box, set_number_of_product_in_box] = useState(0);

    const [preProductName, setPreProductName] = useState("")
    
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
          await axios.patch('https://supperapp-backend.chbk.run/bundle/update', {

            "id": preProductId,
            "albedo_texture_url": albedo_texture_url,
            "metalic_texture_url": metalic_texture_url,
            "normal_map_texture_url": normal_map_texture_url,
            "height_map_texture_url": height_map_texture_url,
            "smoothness": smoothness,
            "height_map_intensity":height_map_intensity,
            "tile_in_texture": tile_in_texture,
            "number_of_product_in_box":number_of_product_in_box

          }, {
              headers: headers
            })
            .then((response) => {
              console.log(response)
              setAlert(true)
              setMessage(response.message)
              setLoading(false)
              handleCloseBundleModal()
              ListApi(Auth)
            })
            .catch(function (error) {
              console.log(error, "Error");
              setMessage(" متاسفیم،خطایی رخ داده است ")
              setErrorAlert(true)
              handleCloseBundleModal()
            });
      
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

  // open modal and set pre-product Id----------


  const GetRowId = (row) => {
    console.log(row.original)
    setPreProductId(row.original.pre_product_id)
    setPreProductName(row.original.name);
    setAddBundleModal(true)
  }

  // -----------------------------------------



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
      <div className="w-auto">
        <Button onClick={() => GetRowId(row)} size="small" className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "  >
          ایجاد باندل
        </Button>
      </div>
    )
  }
});



function handleCloseBundleModal() {
  setAddBundleModal(false)
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

      <Modal open={AddBundleModal} onClose={() => handleCloseBundleModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[50vw] h-[70vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
               ایجاد باندل برای <span className="text-khas mx-1" >{preProductName}</span>
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-[90%] grid grid-cols-2 gap-8 justify-center mx-auto items-center' >
              <TextField
                id="input-with-icon-textfield"
                className="w-full"
                label=" albedo_texture_url "
                placeholder=" albedo_texture_url "
                value={albedo_texture_url}
                onChange={(e) => set_albedo_texture_url(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label=" metalic_texture_url "
                placeholder=" metalic_texture_url "
                value={metalic_texture_url}
                onChange={(e) => set_metalic_texture_url(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label="normal_map_texture_url "
                placeholder="normal_map_texture_url "
                value={normal_map_texture_url}
                onChange={(e) => set_normal_map_texture_url(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label="  height_map_texture_url "
                placeholder=" height_map_texture_url "
                value={height_map_texture_url}
                onChange={(e) => set_height_map_texture_url(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label=" smoothness "
                placeholder=" smoothness "
                value={smoothness}
                onChange={(e) => set_smoothness(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label=" height_map_intensity "
                placeholder=" height_map_intensity "
                value={height_map_intensity}
                onChange={(e) => set_height_map_intensity(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label=" tile_in_texture "
                placeholder=" tile_in_texture "
                value={tile_in_texture}
                onChange={(e) => set_tile_in_texture(e.target.value)}
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
                id="input-with-icon-textfield"
                className="w-full"
                label=" number_of_product_in_box "
                placeholder=" number_of_product_in_box "
                value={number_of_product_in_box}
                onChange={(e) => set_number_of_product_in_box(e.target.value)}
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


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button onClick={() => AddProductApi()} className='text-white bg-khas hover:bg-orange-600 w-28'>
                ثبت
            </Button>
            <Button variant="soft" color='danger'  onClick={() => handleCloseBundleModal()}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>


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

export default CreateBundle;