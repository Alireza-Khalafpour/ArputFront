'use client'

import { Add, AddCircleOutline, Category } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import { MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";


const PulsePlan = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    const [priceData, setPriceData] = useState([])
    const [expireData, setExpireData] = useState([])
    const [allShops, setAllShops] = useState([])
    const [planName, setPlaneName] = useState("")
    const [pulse_price_with_ar_id, set_pulse_price_with_ar_id] = useState("")
    const [pulse_price_without_ar_id, set_pulse_price_without_ar_id] = useState("")
    const [pulse_time_expire_id, set_pulse_time_expire_id] = useState("")

    const [pulsePlanIdForShop, setPulsePlanIdForShop] = useState("")

    const [addDepartmentModal, setAddDepartmentModal] = useState(false)
    const [shopPlanModal, setShopPlanModal] = useState(false)


    // گرفتن لیست برنامه های پالس ------------
    async function GetPulsePlan(Au) {
      
        await axios.get( 'https://supperapp-backend.chbk.run/pulse/plan/admin/list', {
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

    // دریافت لیست شاپ ها ---------------
    async function GetShopsList(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/branch/admin/list', {
          headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
          }
          })
          .then((response) => {
            setAllShops(response.data.data)
            console.log(response.data.data)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
      }

        // گرفتن لیست برنامه های قیمت پالس ------------
        async function GetPulsePrice(Au) {
          
          await axios.get('https://supperapp-backend.chbk.run/pulse/price/admin/list', {
            headers:{
              'accept': 'application/json',
              'Authorization': `Bearer ${Au}`,
            }
            })
            .then((response) => {

              setPriceData(response.data.data)
            })
            .catch((error) => {
              console.log(error, "Error");
            });
        }
        // گرفتن لیست برنامه های تایم اکسپایر
        async function GetPulseExpire(Au) {
      
          await axios.get('https://supperapp-backend.chbk.run/pulse/time/expire/admin/list', {
            headers:{
              'accept': 'application/json',
              'Authorization': `Bearer ${Au}`,
            }
            })
            .then((response) => {

              setExpireData(response.data.data)
            })
            .catch((error) => {
              console.log(error, "Error");
            });
        }


    //------------------------------------------------------------


    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      GetPulsePlan(Auth)
      GetShopsList(Auth)
      GetPulseExpire(Auth)
      GetPulsePrice(Auth)
    },[])
    
    // -------------------------------------------------------

    const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }
  
  
    async function AddPulsePlan() {
      setLoading(true);
      await axios.post('https://supperapp-backend.chbk.run/pulse/plan/admin/create', {
          "name": planName,
          "pulse_price_with_ar_id": pulse_price_with_ar_id,
          "pulse_price_without_ar_id": pulse_price_without_ar_id,
          "pulse_time_expire_id": pulse_time_expire_id
      }, 
      {
        headers: headers
      })
      .then((response) => {
        if(response.data.Done === true){
          setAlert(true)
          setMessage(response.data.Message)
          
        }else {
          setMessage(response.data.Message)
          setErrorAlert(true)
          
        }
      })
      .catch(function (error) {
        setMessage(" متاسفیم،خطایی رخ داده است ")
        setErrorAlert(true)
        
      });

      setAddDepartmentModal(false)
      setLoading(false)
      set_pulse_price_with_ar_id("")
      set_pulse_price_without_ar_id("")
      set_pulse_time_expire_id("")
      setPlaneName("")
      GetPulsePlan(Auth)

  }
    // ایجاد برنامه برای فروشگاه انتخاب شده

    const GetRowId = (row) => {
        setPulsePlanIdForShop(row.original.id)
        setShopPlanModal(true)
    }


  // columns and data =============================================

    const columns = useMemo(
        () => [
          {
            header: ' نام  ',
            accessorKey: 'name',
            id: 'name',
          },
          {
            header: ' پالس AR ',
            accessorKey: 'ar_pulse',
            id: 'ar_pulse',
            Cell: ({ cell }) => <span>{cell.getValue() === true ? "دارد" : "ندارد"}</span>,
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
                    onClick={() => setAddDepartmentModal(true)}
                  >
                      ثبت برنامه پالس جدید <AddCircleOutline/> 
                  </button>
                </Box>
              </Box>
            </Box>
          );
        },
        renderRowActions: ({ row }) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton
                onClick={() => GetRowId(row)}
                className="text-sm rounded-xl bg-khas text-white hover:text-black"
              >
                <Add />
                فروشگاه ها
              </IconButton>
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

      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={addDepartmentModal} onClose={() => setAddDepartmentModal(false)}>

          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد برنامه پالس جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >
                <TextField
                    className="md:w-[50%] w-[90%]"
                    id="input-with-icon-textfield"
                    label=" نام برنامه "
                    placeholder=" نام برنامه "
                    value={planName}
                    onChange={(e) => setPlaneName(e.target.value)}
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
                    options={priceData.filter((x) => x.ar_pulse == true) }
                    getOptionLabel={(i)=> i.name}
                    // value={addCateg ? addCateg[0] : " "}
                    onChange={(event, val) =>{
                    set_pulse_price_with_ar_id(val.id);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" label=" قیمت با AR " />}
                  />

              </div>
              <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >

                  <Autocomplete
                    className="md:w-[50%] w-[90%]"
                    noOptionsText=" داده ای موجود نیست "
                    options={priceData.filter((x) => x.ar_pulse == false)}
                    getOptionLabel={(i)=> i.name}
                    // value={addCateg ? addCateg[0] : " "}
                    onChange={(event, val) =>{
                    set_pulse_price_without_ar_id(val.id);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" label=" قیمت بدون AR " />}
                  />

                  <Autocomplete
                    className="md:w-[50%] w-[90%]"
                    noOptionsText=" داده ای موجود نیست "
                    options={expireData}
                    getOptionLabel={(i)=> i.name}
                    // value={addCateg ? addCateg[0] : " "}
                    onChange={(event, val) =>{
                    set_pulse_time_expire_id(val.id);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" label=" زمان انقضا " />}
                  />

              </div>

            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddPulsePlan()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setAddDepartmentModal(false)}>
              انصراف
            </Button>
          </DialogActions>
      </Dialog>



      <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={shopPlanModal} onClose={() => setShopPlanModal(false)}>

          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
              اختصاص برنامه پالس به فروشگاه
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

            <div className="flex flex-col justify-center items-center gap-10 w-full" >

                  <Autocomplete
                    className="md:w-[50%] w-[90%]"
                    noOptionsText=" داده ای موجود نیست "
                    options={allShops}
                    getOptionLabel={(i)=> i.branch_data.branch_name}
                    // value={addCateg ? addCateg[0] : " "}
                    onChange={(event, val) =>{
                    set_pulse_price_with_ar_id(val.id);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" label=" انتخاب فروشگاه " />}
                  />


            </div>

          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4 mt-10" >
            <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddPulsePlan()}>
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button variant="soft" color='danger'  onClick={() => setShopPlanModal(false)}>
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

export default PulsePlan;