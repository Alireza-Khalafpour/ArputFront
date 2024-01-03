'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, CloudUpload, CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DeleteRounded, DetailsOutlined, Edit, EditRounded, FireTruckOutlined, FireTruckRounded, History, Payment, PostAddRounded, RefreshOutlined, TableRowsRounded } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Modal, Snackbar, TextField, Tooltip } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { ModalDialog } from "@mui/joy";
import { e2p } from "@/utils/replaceNumbers";



export const CreateFeature = ()=> {

    const cookie = new Cookies();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [featureList, setFeatureList] = useState([])
    const [featureName, setFeatureName] = useState("")
    const [addFeatureType, setAddFeatureType] = useState("")
    const [featureId, setFeatureId] = useState("")

    
    const [FeaturesData, setFeaturesData] = useState({name : "" , main: "", others:[] })


    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/features/list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
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

    async function FeatureListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/features_sample/list', {
        headers:{
          'accept': 'application/json',
          'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
          setFeatureList(response.data.data)
          console.log(response.data.data)
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
    


    // Create Feature ----------------------------------------
    const formData = new FormData();

    const Auth = cookie.get('tokenDastResi')
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
    }
  
  
    async function AddFeatureApi() {
      // setLoading(true);
      await axios.post('https://supperapp-backend.chbk.run/features/create', FeaturesData , {
          headers: headers
        })
        .then((response) => {
          setAlert(true)
          setMessage(" ویژگی جدید با موفقیت افزوده شد ")
          setLoading(false)
          setAddFeatureModal(false)
          setFeaturesData({name : "" , main: "", others:[] })
          setAddFeatureModal(false)
          ListApi(Auth)
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setFeaturesData({name : "" , main: "", others:[] })
          setLoading(false)
          setAddFeatureModal(false)
        });
  
    }


    // Add Other Feature --------------------------------------

    const changeHandler = (e, index) => {
      const {value} = e.target;
      const List = [...FeaturesData['others']]
      List[index] = value;
      setFeaturesData({...FeaturesData, ['others'] : List})
    }

    const addHandler = () => {
        setFeaturesData({...FeaturesData, 'others': [...FeaturesData['others'],'']})
    }

    const deleteHandler = (index) => {
        const List = [...FeaturesData['others']]
        List.splice(index, 1)
        setFeaturesData({...FeaturesData, ['others']: List})
    }


    // update Features ---------------------------------------------

    const [editFeatureModal, setEditFeatureModal] = useState(false)

    const EditFeature = (row) => {

      setFeaturesData({
        "name" : row?.original.name,
        "main": row?.original.main,
        "others":row?.original.others,
        "id": row?.original.id,
        "active": row.original.active
      })

      setEditFeatureModal(true)
    }


    // Edit Feature Part ----------------------------------------------
    async function EditFeatureApi() {
      setLoading(true);
      await axios.put('https://supperapp-backend.chbk.run/features/update',
        FeaturesData
      , {
        headers: headers
        })
        .then((response) => {
          console.log(response.data)
          if(response.data.Done === true){
            setAlert(true)
            setMessage(" ویژگی به روزرسانی شد ")
            setLoading(false)
            setEditFeatureModal(false)
            setFeaturesData({name : "" , main: "", others:[] })
          }else if(response.data.message.length > 1){
            setMessage(response.data.message)
            setErrorAlert(true)
            setEditFeatureModal(false)
            setFeaturesData({name : "" , main: "", others:[] })
          }
        })
        .catch(function (error) {
          console.log(error, "Error");
          setLoading(false)
          setEditFeatureModal(false)
          setFeaturesData({name : "" , main: "", others:[] })
        });
  
    }




    /* *************** CONTEXT MENU *********************** */

      const [contextMenuRowData, setContextMenuRowData] = useState({});
      const [showContextMenu, setShowContextMenu] = useState(false);
      const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
      });

      const handleContextMenu = (event, r) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setShowContextMenu(true);
        setContextMenuRowData(r);
      };

      const handleContextMenuClose = () => {
        setShowContextMenu(false);
      };

      const contextMenuOptions = [
        {
          label: ' ویرایش ویژگی ',
          icon: (
            <Edit
              sx={{
                color: '#FF9900',
              }}
            />
          ),
          onClick: () => EditFeature(),
        },
      ];



  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' نوع ویژگی ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' نام ویژگی ',
        accessorKey: 'main',
        id: 'main',
      },
      {
        header: ' active ',
        accessorKey: 'active',
        id: 'active',
        Cell: ({ cell }) => <span> {cell.getValue() === true ? 'فعال' : 'غیر فعال ' } </span> ,
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
                onClick={() => setAddFeatureModal(true)}
              >
                 ویژگی جدید <AddCircleOutline/> 
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
            title="ویرایش ویژگی"
            onClick={() => EditFeature(row)}
          >
            <EditRounded />
          </IconButton>
        </Box>
      )
    }
  });
  
  // modal part -------------------------------------------------------------
  const[addFeatureModal, setAddFeatureModal] = useState(false);
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

        <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        />

      <Modal className="h-[80vh]" open={addFeatureModal} onClose={() => setAddFeatureModal(false)}>
        <ModalDialog variant="outlined" role="definition" className="w-[50vw] h-[75vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
             ایجاد ویژگی جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10 h-full" >           

            <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                id="input-with-icon-textfield"
                label=" نوع ویژگی "
                placeholder=" نوع ویژگی  "
                value={FeaturesData.name}
                onChange={(e) => setFeaturesData({...FeaturesData, 'name' : e.target.value})}
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
                label=" نام ویژگی "
                placeholder=" نام ویژگی  "
                value={FeaturesData.main}
                onChange={(e) => setFeaturesData({...FeaturesData, 'main' : e.target.value})}
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

            <div className="w-full flex flex-col justify-center items-center gap-3" >


            {
              FeaturesData["others"].map((i,index)=> (
                    <div className="w-full text-center flex flex-row justify-center gap-4 items-center " >
                        <TextField
                          id="input-with-icon-textfield"
                          label=" ویژگی های بیشتر "
                          value={i}
                          onChange={e => changeHandler(e, index)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <Category className='text-asliLight' />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                        />
                        <button className=" px-1 text-red-500 " type='button' onClick={() => deleteHandler(index)} >
                            <DeleteForeverOutlined/>
                        </button>
                    </div>
                ))
            }
            <button className="w-56 p-2 border-b-asliLight border-dashed border-b-2 hover:border-b-asliDark  " onClick={ () => addHandler()} > <AddRounded/> افزودن ویژگی های بیشتر </button>



            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFeatureApi()}>
              {loading ? <CircularProgress className="text-black" size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddFeatureModal(false)}>
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>



      <Modal open={editFeatureModal} onClose={() => setEditFeatureModal(false)}>
        <ModalDialog variant="outlined" role="definition" className="w-[40vw] h-[65vh] p-0" >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              ویرایش ویژگی
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10" >           

          <div className='w-full flex flex-row justify-around items-center' >
              <TextField
                id="input-with-icon-textfield"
                label=" نوع ویژگی "
                placeholder=" نوع ویژگی  "
                value={FeaturesData.name}
                onChange={(e) => setFeaturesData({...FeaturesData, 'name' : e.target.value})}
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
                label=" نام ویژگی "
                placeholder=" نام ویژگی  "
                value={FeaturesData.main}
                onChange={(e) => setFeaturesData({...FeaturesData, 'main' : e.target.value})}
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

            <div className="w-full flex flex-col justify-center items-center gap-3" >


            {
              FeaturesData["others"].map((i,index)=> (
                    <div className="w-full text-center flex flex-row justify-center gap-4 items-center " >
                        <TextField
                          id="input-with-icon-textfield"
                          label=" ویژگی های بیشتر "
                          value={i}
                          onChange={e => changeHandler(e, index)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <Category className='text-asliLight' />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                        />
                        <button className=" px-1 text-red-500 " type='button' onClick={() => deleteHandler(index)} >
                            <DeleteForeverOutlined/>
                        </button>
                    </div>
                ))
            }
            <button className="w-56 p-2 border-b-asliLight border-dashed border-b-2 hover:border-b-asliDark  " onClick={ () => addHandler()} > <AddRounded/> افزودن ویژگی های بیشتر </button>



            </div>


          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => EditFeatureApi()}>
            {loading ? <CircularProgress className="text-black" size="medium" /> : " ویرایش "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddFeatureModal(false)}>
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

export default CreateFeature;