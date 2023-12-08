'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DetailsOutlined, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, TableRowsRounded } from "@mui/icons-material";
import { Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";



export const MyProducts = ()=> {

    const cookie = new Cookies();

    const [data, setData] = useState([])
    const [featureList, setFeatureList] = useState([])
    const [addFeature, setAddFeatures] = useState([])
    const [addCategName, setAddCategName] = useState("")


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/Product/', {
        headers:{
          'accept': 'application/json',
        }
        })
        .then((response) => {
          setData(response.data.data)
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
    

  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' نام دسته بندی ',
        accessorKey: 'category_name',
        id: 'category_name',
      },
      {
        header: ' قیمت ',
        accessorKey: 'price',
        id: 'price',
        Cell: ({ cell }) => <span>{e2p(cell.getValue().toLocaleString())}</span>,
      },
      {
        header: ' تخفیف ',
        accessorKey: 'off',
        id: 'off',
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
  enableRowNumbers: true,

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

      <Modal open={addCategoryModal} onClose={() => setAddCategoryModal(false)}>
        <ModalDialog variant="outlined" role="definition" className="w-[40vw] h-[65vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
             ایجاد دسته بندی جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                id="input-with-icon-textfield"
                label=" نام دسته بندی "
                placeholder=" نام دسته بندی  "
                value={addCategName}
                onChange={(e) => setAddCategName(e.target.value)}
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
                disablePortal
                multiple
                noOptionsText=" داده ای موحود نیست "
                options={featureList}
                getOptionLabel={(i)=> i.feature_data.name}
                onChange={(event, val) =>{
                  setAddFeatures([...val]);
                }}
                sx={{ width:"190px"}}
                renderInput={(params) => <TextField {...params} variant="standard" label=" افزودن ویژگی " />}
              />
            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddCategoryApi()}>
               ثبت
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddCategoryModal(false)}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>


      </div>



    );
}

export default MyProducts;