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
    const [representationName, setRepresentationName] = useState()
    const [repNumber, setRepNumber] = useState()

    const [currentId, setCurrentId] = useState()

    const [DeleteCategoryIds, setDeleteCategoryIds] = useState()


    const currentUserHeaders ={
      'accept': 'application/json',
      'Authorization': `Bearer ${Auth}`,
      }

    async function GetCurrentUser() {
      
      await axios.get('https://supperapp-backend.chbk.run/register/current_user', {
        headers:currentUserHeaders
        })
        .then((response) => {
            console.log(response)
            setCurrentId(response.data.data[0].id)
            ListApi(response.data.data[0].id)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
      }

      
      // get current user on modal open-------------------------
  
      const handleOpen = () => {
        // GetCurrentUser()
        setAddCategoryModal(true)
      }


      const RepresentationListHeaders = {
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`
      }


    async function ListApi(currentid) {
      
      await axios.get(`https://supperapp-backend.chbk.run/branch/branch_list_by_factory_id?factory_id=${currentid}`, {
        headers:RepresentationListHeaders
        })
        .then((response) => {
            console.log(response)
            setData(response.data.data[0].branch_data)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }


    useEffect(() => {
      // const Auth = cookie.get('tokenDastResi')
      // ListApi(Auth);
      GetCurrentUser()
    },[])


    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    }
  

    const addBranchData= {
      "factory_id": currentId,
      'name': representationName,
      'mobile':repNumber
    }
  
    async function AddBranchApi() {
      // setLoading(true);
      console.log(addBranchData)
      await axios.post('https://supperapp-backend.chbk.run/branch/create', addBranchData, {
          headers: headers
        })
        .then((response) => {
          if (response.data.Done === true) {
            console.log(response)
            setAlert(true)
            setMessage(" نمایندگی جدید با موفقیت افزوده شد ")
            setLoading(false)
            setAddCategoryModal(false)
            setTimeout(() => {
              window.location.reload()
            }, 500);
          } else if (response.data.Done === false) {
            setMessage(response.data.Message)
            setErrorAlert(true)
            setLoading(false)
          }
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

    // Update a category -----------------------------------------


    // // Delete a category -----------------------------------------

    // async function DeleteCategoryApi() {
    //   setLoading(true);
    //   await axios.delete('https://supperapp-backend.chbk.run/category/delete', {'ids':DeleteCategoryIds}, {
    //       headers: headers
    //     })
    //     .then((response) => {
    //       console.log(response)
    //       setAlert(true)
    //       setMessage(" دسته بندی حذف شد ")
    //       setLoading(false)
    //       ListApi(Auth)
    //     })
    //     .catch((error) => {
    //       console.log(error, "Error");
    //       setMessage(" متاسفیم،خطایی رخ داده است ")
    //       setErrorAlert(true)
    //       setLoading(false)
    //     });
  
    // }

    // const [DeleteCategName, setDeleteCategName] = useState("")

    // const GetRowIdForDelete = (row) => {
    //   setDeleteCategoryIds([row.original.id])
    //   setDeleteCategName(row.original.name)
    //   setDeleteCategoryModal(true)
    //   console.log(row)
    // }

    // const OmitRowIdForDelete = () => {
    //   setDeleteCategoryIds([])
    //   setDeleteCategoryModal(false)
    // }




  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نام نمایندگی ',
        accessorKey: 'branch_name',
        id: 'branch_name',
      },
      {
        header: ' آیدی ',
        accessorKey: 'branch_id',
        id: 'branch_id',
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
              onClick={() => handleOpen()}
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
                value={representationName}
                onChange={(e) => setRepresentationName(e.target.value)}
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
                value={repNumber}
                onChange={(e) => setRepNumber(e.target.value)}
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
                <h2> آیااز حذف  <span className="font-semibold text-khas " > DeleteCategName </span> اطمینان دارید؟ </h2>
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