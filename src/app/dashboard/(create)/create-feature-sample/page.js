'use client'

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, Category, DeleteRounded, LocationCity, LocationOnRounded, RadioButtonChecked, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useRouter } from "next/navigation";



export const CreateFeatureSample = ()=> {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [featureSampleModal, setFeatureSampleModal] = useState(false)
    const [sampleName, setSampleName] = useState("")
    const [features, setFeatures] =useState([])
    const [featureId, setFeatureId] =useState("")


    // Feature-sample List--------------
    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/feature_samples/list', {
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

    // Feature-list--------------------
    async function FeatureList(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/feature/list', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
          }
          })
          .then((response) => {
            setFeatures(response.data.data)
            console.log(response)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
      }


    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
      FeatureList(Auth);
    },[])
    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
  
    async function AddFeatureSampleApi() {
        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/feature_samples/create', {
            "feature_id": featureId,
            "feature_sample_name": sampleName
        }, 
        {
          headers: headers
        })
        .then((response) => {

          if(response.data.Done === true){
            setAlert(true)
            setMessage(" فیچر سمپل جدید اضافه شد ")
            setLoading(false)
            setFeatureSampleModal(false)
            setSampleName("")
            setFeatureId("")
            ListApi(Auth)
          }else {
            setMessage(response.data.Message)
            setErrorAlert(true)
            setSampleName("")
            setFeatureId("")
            setLoading(false)
            setFeatureSampleModal(false)
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setSampleName("")
          setFeatureId("")
          setLoading(false)
          setFeatureSampleModal(false)
        });
  
    }

              // Activate Feature-sample -----------------------------------------
              const headersActivate = {
                'accept': 'application/json',
                'Authorization': `Bearer ${Auth}`,
            }
      
              async function GetRowIdForActivate(id) {
                setLoading(true);
    
                const ActiveMethod = {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${Auth}`,
                    },
                   }
                   
                   fetch(`https://supperapp-backend.chbk.run/feature_samples/active?feature_sample_id=${id}`, ActiveMethod)
                   .then((response) => {
                        response.json()
                    })
                   .then((d) => {
                      setAlert(true)
                      setMessage(" سمپل فعال شد ")
                      setLoading(false)
                      ListApi(Auth)
                    }) 
                   .catch(err => console.log(err)) 
          
            }
    
    
        // Deactive a Feature-sample -----------------------------------------
    
        const GetRowIdForDelete = (id) => {
    
          setLoading(true);
    
          const deleteMethod = {
              method: 'PUT',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer ${Auth}`,
              },
             }
             
             fetch(`https://supperapp-backend.chbk.run/feature_samples/deactive?feature_sample_id=${id}`, deleteMethod)
             .then((response) => {
                  response.json()
              })
             .then((d) => {
                setAlert(true)
                setMessage(" سمپل حذف شد ")
                setLoading(false)
                ListApi(Auth)
              }) 
             .catch(err => console.log(err)) 
    
        }


  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
      header: ' سمپل ',
      accessorKey: 'sample_data.feature_sample_name',
      id: 'sample_data.feature_sample_name',
      },
        {
        header: '  ویژگی ',
        accessorKey: 'feature_data.name',
        id: 'feature_data.name',
        },

        {
            header: ' وضعیت ',
            accessorKey: 'sample_data.active',
            id: 'sample_data.active',
            Cell: ({ cell }) => <span>{cell.getValue() === true ? "فعال" : "غیرفعال"}</span>,
        },
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
              onClick={() => setFeatureSampleModal(true)}
            >
                ثبت سمپل جدید <AddCircleOutline/> 
            </button>
          </Box>
        </Box>
      </Box>
    );
  },
  renderRowActions: ({ row }) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                  {
            row.original.sample_data.active == true 
            ?
            <IconButton
              color="error"
              onClick={() => GetRowIdForDelete(row.original.sample_data?.id)}
            >
                <DeleteRounded titleAccess="غیرفعال کردن" />
            </IconButton>

            :

            <IconButton
            color="success"
            onClick={() => GetRowIdForActivate(row.original.sample_data?.id)}
          >
              <RadioButtonChecked titleAccess="فعال کردن" />
          </IconButton>

          }
      </Box>
    )
  },

});

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

      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={featureSampleModal} onClose={() => setFeatureSampleModal(false)}>

          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد سمپل جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >
                <TextField
                  className="md:w-[50%] w-[90%]"
                  id="input-with-icon-textfield"
                  label=" نام سمپل  "
                  placeholder=" نام سمپل   "
                  value={sampleName}
                  onChange={(e) => setSampleName(e.target.value)}
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
                    className="md:w-[50%] w-[90%]"
                    noOptionsText=" داده ای موجود نیست "
                    options={features}
                    getOptionLabel={(i)=> i.name}
                    // value={addCateg ? addCateg[0] : " "}
                    onChange={(event, val) =>{
                    setFeatureId(val.id);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" label=" افزودن ویژگی " />}
                />



              </div>

            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddFeatureSampleApi()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setFeatureSampleModal(false)}>
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

export default CreateFeatureSample;