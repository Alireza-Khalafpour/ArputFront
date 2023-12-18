'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DeleteRounded, DetailsOutlined, EditRounded, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, TableRowsRounded } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { CircularProgress, ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";



export const AddRepresentation = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [featureList, setFeatureList] = useState([])
    const [addFeature, setAddFeatures] = useState([])
    const [featureIds, setFeatureIds] = useState([])
    const [addCategName, setAddCategName] = useState("")

    const [DeleteCategoryIds, setDeleteCategoryIds] = useState()


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/branch/list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
            console.log(response)
            setData(response.data.data)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }

    

    async function FeatureListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/features_sample/list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setFeatureList(response.data.data)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }

    useEffect(() => {
      setFeatureIds(addFeature.map((i) => i.feature_data.id))
    },[addFeature])

    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
      FeatureListApi(Auth);
    },[])
    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
  
    async function AddBranchApi() {
      // setLoading(true);
      await axios.post('https://supperapp-backend.chbk.run/branch/create', {'name': addCategName, 'features':featureIds}, {
          headers: headers
        })
        .then((response) => {
          setAlert(true)
          setMessage("  نمایندگی جدید با موفقیت افزوده شد ")
          setLoading(false)
          setAddCategoryModal(false)
          ListApi(Auth)
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

    // Update a category -----------------------------------------


    // Delete a category -----------------------------------------

    async function DeleteCategoryApi() {
      setLoading(true);
      await axios.delete('https://supperapp-backend.chbk.run/category/delete', {'ids':DeleteCategoryIds}, {
          headers: headers
        })
        .then((response) => {
          console.log(response)
          setAlert(true)
          setMessage(" دسته بندی حذف شد ")
          setLoading(false)
          ListApi(Auth)
        })
        .catch((error) => {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

    const [DeleteCategName, setDeleteCategName] = useState("")

    const GetRowIdForDelete = (row) => {
      setDeleteCategoryIds([row.original.id])
      setDeleteCategName(row.original.name)
      setDeleteCategoryModal(true)
      console.log(row)
    }

    const OmitRowIdForDelete = () => {
      setDeleteCategoryIds([])
      setDeleteCategoryModal(false)
    }




  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام دسته بندی ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' نام ویژگی ',
        accessorKey: 'main',
        id: 'main',
      },
      {
        header: ' id ',
        accessorKey: 'id',
        id: 'id',
      },
    ],
    []
  );


const table = useMaterialReactTable({
  columns,
  data,
  enableExpandAll: false, //hide expand all double arrow in column header
  enableExpanding: true,
  filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
  initialState: { expanded: false }, //expand all rows by default
  paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
  getSubRows: (originalRow) => originalRow.features,
  localization: mrtLocalizationFa,
  columnResizeMode:true,
  enableStickyHeader: true,
  enableStickyFooter: true,
  enableRowActions: true,
  renderRowActionMenuItems: true,
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
             نمایندگی جدید <AddCircleOutline/> 
            </button>
          </Box>
        </Box>
      </Box>
    );
  },
  renderRowActions: ({ row, table }) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton
          color="secondary"
        >
          <EditRounded />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => GetRowIdForDelete(row)}
        >
          <DeleteRounded />
        </IconButton>
      </Box>
    )
  }
});

  // modal part -------------------------------------------------------------
  const[addCategoryModal, setAddCategoryModal] = useState(false);
  const[deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
             ایجاد نمایندگی جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                id="input-with-icon-textfield"
                label=" نام نمایندگی "
                placeholder=" نام نمایندگی  "
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

              <TextField
                id="input-with-icon-textfield"
                label=" شماره تماس "
                placeholder=" شماره تماس "
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
            
            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddBranchApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddCategoryModal(false)}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Modal open={deleteCategoryModal} onClose={() => OmitRowIdForDelete()}>
        <ModalDialog variant="outlined" role="definition" className="p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
             حذف دسته بندی
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

            <div className='w-full flex flex-row justify-around items-center' >
                <h2> آیااز حذف  <span className="font-semibold text-khas " > {DeleteCategName} </span> اطمینان دارید؟ </h2>
            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-red-500 hover:bg-red-600 w-28' onClick={() => DeleteCategoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " حذف "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => OmitRowIdForDelete()}>
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

export default AddRepresentation;