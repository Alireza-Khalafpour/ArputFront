'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddAPhoto, AddCircleOutline, Category, DeleteRounded, DetailsOutlined, EditRounded, MiscellaneousServices, RadioButtonChecked} from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { ModalDialog, Typography } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";



export const CreateFactory = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')
  // --------------
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
  // --------------
    const [data, setData] = useState([])
    const [featureList, setFeatureList] = useState([])
    const [addFeature, setAddFeatures] = useState([])
    const [addCategName, setAddCategName] = useState("")
    const[addCategoryModal, setAddCategoryModal] = useState(false);
    const[deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const[editCategoryModal, setEditCategoryModal] = useState(false);
    const[editCategoryId, setEditCategoryId] = useState("");
    const [DeleteCategoryIds, setDeleteCategoryIds] = useState()


    // Get Categories api -------------
    async function ListApi(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/category/all', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setData(response.data.data)
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }

    // Get feature List ------------------

    async function FeatureListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/features/list', {
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
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
      FeatureListApi(Auth);
    },[])
    
    // add new category-------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
    async function AddCategoryApi() {
      setLoading(true);
      await axios.post('https://supperapp-backend.chbk.run/category/create', {'name': addCategName}, {
          headers: headers
        })
        .then((response) => {
          if (response.data.Done=== true) {
            setAlert(true)
            setMessage(" دسته بندی جدید با موفقیت افزوده شد ")
            setLoading(false)
            setAddCategoryModal(false)
            ListApi(Auth)
            setAddCategName("")
          }else {
            setMessage(response.data.message)
            setErrorAlert(true)
            setLoading(false)
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

    // Edit Category Api -------------------------------

    const GetRowIdForEdit = (row) => {
      setEditCategoryId(row.original.id)
      setAddCategName(row.original.name)
      setEditCategoryModal(true)
    }

    async function EditCategoryApi() {
      setLoading(true);
      await axios.patch('https://supperapp-backend.chbk.run/category/admin/update', {
        "name": addCategName,
        "id": editCategoryId,
        "active": true
      }, {
          headers: headers
        })
        .then((response) => {
          if (response.data.Done=== true) {
            setAlert(true)
            setMessage(response.data.message)
            setLoading(false)
            setEditCategoryModal(false)
            ListApi(Auth)
            setAddCategName("")
          }else {
            setMessage(response.data.message)
            setErrorAlert(true)
            setLoading(false)
            setEditCategoryModal(false)
            ListApi(Auth)
            setAddCategName("")
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });
  
    }

    // handle close Edit category modal -----------------------

    const handleCloseEditModal= () =>{
      setAddCategName("")
      setEditCategoryModal(false)
    }


    
    // Activate category -----------------------------------------
      
        async function GetRowIdForActivate(id) {
            setLoading(true);
            await axios.patch('https://supperapp-backend.chbk.run/category/active', {
                "ids": [`${id}`],
            }, 
            {
              headers: headers
            })
            .then((response) => {
                setAlert(true)
              if(response.data.Done == true){
                setAlert(true)
                setMessage(" دسته بندی فعال شد ")
                setLoading(false)
                ListApi(Auth)

              }else {
                setLoading(false)
                setMessage(response.data.Message)
                setErrorAlert(true)

              }
            })
            .catch(function (error) {
                console.log(error)
                setMessage(" متاسفیم،خطایی رخ داده است ")
                setErrorAlert(true)
                setLoading(false)
            });
      
        }


    // Delete a category (Deactive) -----------------------------------------

    const DeleteCategoryApi = (i) => {

      setLoading(true);

      const data = {
        ids:DeleteCategoryIds
      }

      const deleteMethod = {
          method: 'Delete',
          headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${Auth}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
         }
         
         fetch('https://supperapp-backend.chbk.run/category/delete', deleteMethod)
         .then((response) => {
              response.json()
          })
         .then((d) => {
            setAlert(true)
            setMessage(" دسته بندی حذف شد ")
            setLoading(false)
            ListApi(Auth)
            setDeleteCategoryModal(false)
          }) 
         .catch(err => console.log(err)) 

    }

    const [DeleteCategName, setDeleteCategName] = useState("")

    const GetRowIdForDelete = (row) => {
      setDeleteCategoryIds([row.original.id])
      setDeleteCategName(row.original.name)
      setDeleteCategoryModal(true)
    }

    const OmitRowIdForDelete = () => {
      setDeleteCategoryIds([])
      setDeleteCategoryModal(false)
    }

    // handle close category modal--------------------------------------------------

    function OnCloseModal() {
      setAddCategoryModal(false)
      setAddCategName("")
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
        header: ' وضعیت ',
        accessorKey: 'active',
        id: 'active',
        Cell: ({ cell }) => <span>{cell.getValue() === true ? "فعال" : "غیرفعال"}</span>,

      },
    ],
    []
  );

  // table ------------------

const table = useMaterialReactTable({
  columns,
  data,
  enableExpandAll: true, //hide expand all double arrow in column header
  enableExpanding: true,
  positionExpandColumn:"first",
  initialState: { expanded: false }, //expand all rows by default
  paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
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
              دسته بندی جدید <AddCircleOutline/> 
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
          onClick={() => GetRowIdForEdit(row)}
        >
          <EditRounded />
        </IconButton>
          {
            row.original.active == true 
            ?
            <IconButton
              color="error"
              onClick={() => GetRowIdForDelete(row)}
            >
                <DeleteRounded titleAccess="غیرفعال کردن" />
            </IconButton>

            :

            <IconButton
            color="success"
            onClick={() => GetRowIdForActivate(row.original.id)}
          >
              <RadioButtonChecked titleAccess="فعال کردن" />
          </IconButton>

          }
      </Box>
    )
  },
  renderDetailPanel: ({ row }) => (

    <div className="bg-paszamine1 p-2">
        <h3 className="w-full text-start font-extrabold mb-2" > <span className="border-b-2 p-1 text-base" > ویژگی ها </span> </h3>
        <Box
          sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr ',
              width: '50%',
              textAlign:"justify",
              gap: "15px"
          }}
        >

          {
  
            row?.original?.features.map((item) => ( 
              <>
                <Typography> نام ویژگی : {item.name}  </Typography>
                <Typography className="flex flex-row gap-1 items-center">  <p>وضعیت   : </p>{item.active === true ? <p className="rounded-full p-2 bg-green-700 w-2 h-2" ></p> : <p className="rounded-full p-2 bg-rose-700 w-2 h-2"></p>}  </Typography>
              </>
             ))
          } 

        </Box>
    </div>
  ),
});




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

      <Modal open={editCategoryModal} onClose={() => handleCloseEditModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[40vw] h-[65vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              ویرایش 
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

              <TextField
                id="input-with-icon-textfield"
                label=" نام دسته بندی "
                placeholder=" نام دسته بندی  "
                className="w-full"
                value={addCategName}
                onChange={(e) => setAddCategName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className='text-asliLight' />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            
          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => EditCategoryApi()}>
              {loading ? <CircularProgress size="medium" className="text-white w-12 h-12" /> : " ویرایش "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => handleCloseEditModal()}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Modal open={addCategoryModal} onClose={() => OnCloseModal()}>
        <ModalDialog variant="outlined" role="definition" className="w-[40vw] h-[65vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              ایجاد دسته بندی
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
                variant="outlined"
              />
            
            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddCategoryApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => OnCloseModal()}>
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

export default CreateFactory;