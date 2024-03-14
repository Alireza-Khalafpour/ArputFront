'use client'


import axios from "axios";
import * as shamsi from 'shamsi-date-converter';
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, AddRounded, Category, Delete, DeleteRounded, Edit, LocationCity, LocationOnRounded, PaymentOutlined, RadioButtonChecked, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_ActionMenuItem, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useRouter } from "next/navigation";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";





const page = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])

    const [fac, setfac] = useState("")

    const [facId, setFacId] = useState("")

    const [MakeBranchModal, setMakeBranchModal] = useState(false);
    const [addBalanceModal, setAddBalanceModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [user_id, set_user_id] = useState("");





    // Fetch All Shops and representations list ---------------------------

    async function ListApi(Au) {
      
      await axios.get('https://supperapp-backend.chbk.run/register/all_shop', {
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

        async function GetFactoryList() {
      
          await axios.get('https://supperapp-backend.chbk.run/template/brand/data')
            .then((response) => {
              setfac(response.data.data)
            })
            .catch((error) => {
              console.log(error, "Error");
            });
        }
    

    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
      GetFactoryList()
    },[])

    // Handle switch to Branch or Shop ---------------------------

    const headers = {
      'accept': 'application/json',
      'Authorization': `Bearer ${Auth}`,
      'Content-Type': 'application/json',
  }
        
        async function GetRowIdToShop(id) {
          setLoading(true);
          await axios.put('https://supperapp-backend.chbk.run/register/admin/not-representative',
          {
            "shop_id": id,
          }
          , {
            headers: headers
            })
            .then((response) => {
              if(response.data.Done === true){
                setAlert(true)
                setMessage(response.data?.Error_text)
                setLoading(false)
              }else{
                setMessage(response.data?.Error_text)
                setErrorAlert(true)
              }
            })
            .catch(function (error) {
              console.log(error, "Error");
              setLoading(false)
              setMessage("متاسفیم، خطایی رخ داده است.")
              setErrorAlert(true)
            });
            ListApi(Auth)
      
        }

        const [shopid, setShopId] = useState(0)

      function handleShopToBranch(id) {
        setMakeBranchModal(true)
        setShopId(id)
      }
  
          async function GetRowIdToBranch() {
            setLoading(true);
            await axios.put('https://supperapp-backend.chbk.run/register/admin/is-representative',
            {
              "shop_id": shopid,
              "factory_id": facId
            }
            , {
              headers: headers
              })
              .then((response) => {
                if(response.data.Done === true){
                  setAlert(true)
                  setMessage(response.data?.Error_text)
                  setLoading(false)
                }else{
                  setMessage(response.data?.Error_text)
                  setErrorAlert(true)
                }
              })
              .catch(function (error) {
                console.log(error, "Error");
                setLoading(false)
                setMessage("متاسفیم، خطایی رخ داده است.")
                setErrorAlert(true)
              });
              ListApi(Auth)
        
          }

  // increase Balance amount ----------------------------------

      async function handleAddBalance(id){

        setAddBalanceModal(true)
        set_user_id(id)
        GetBalanceHistory(id)

      }
      
      async function AddBalanceAdmin() {
        setLoading(true);
        await axios.put('https://supperapp-backend.chbk.run/wallet/update_wallet',
        {
          "balance": amount,
          "user_id": user_id
        }
        , {
          headers: headers
          })
          .then((response) => {
            if(response.data.Done === true){
              setAlert(true)
              setMessage(`${response.data?.message} | موجودی جدید ${digitsEnToFa(addCommas(response.data?.balance))} ریال ` )
              setLoading(false)
            }else{
              setMessage(response.data?.message)
              setErrorAlert(true)
            }
          })
          .catch(function (error) {
            console.log(error, "Error");
            setLoading(false)
            setMessage("متاسفیم، خطایی رخ داده است.")
            setErrorAlert(true)
          });
          ListApi(Auth)
          setAddBalanceModal(false)
    
      }


  // columns and data =============================================
  const columns = useMemo(
    () => [
    {
            header: ' عکس ',
            accessorKey: 'image',
            id: 'image',
      },
      {
        header: ' نام  ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: '  نام خانوادگی  ',
        accessorKey: 'family',
        id: 'family',
      },
      {
        header: ' نام فروشگاه ',
        accessorKey: 'shop_name',
        id: 'shop_name',
      },
      {
        header: ' موجودی ',
        accessorKey: 'balance',
        id: 'balance',
        Cell: ({ cell }) => digitsEnToFa(addCommas(cell.getValue())),
      },
      {
          header: ' تلفن ',
          accessorKey: 'telephone',
          id: 'telephone',
        },
        {
            header: ' ایمیل ',
            accessorKey: 'email',
            id: 'email',
        },
        {
          header: ' برنامه پالس ',
          accessorKey: 'pulse_plan_name',
          id: 'pulse_plan_name',
        },
        {
            header: ' آدرس ',
            accessorKey: 'address',
            id: 'address',
            Cell: ({ cell }) => <div className="flex flex-col justify-center items-center gap-2" >{cell.getValue().map((i) => <p> {i} </p>)}</div>,

          },
          {
            header: ' وضعیت ',
            accessorKey: 'active',
            id: 'active',
            Cell: ({ cell }) => <span>{cell.getValue() === true ? " فعال " : <span className="bg-red-500 text-white rounded-2xl p-1" > غیرفعال </span>}</span>,
          },
          {
            header: ' وضعیت ',
            accessorKey: 'نام کارخانه',
            id: 'نام کارخانه',
          },
          {
            header: ' فروشگاه/نمایندگی ',
            accessorKey: 'is_branch',
            id: 'is_branch',
            Cell: ({ cell }) => <span>{cell.getValue() === true ? "نمایندگی" : "فروشگاه"}</span>,

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
  muiTableContainerProps: { 
    sx: {
     maxHeight: '500px' ,
     borderRadius: "30px",
    } 
  },
  muiTablePaperProps: {
    sx: {
      borderRadius: "30px",
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
  muiTableContainerProps: { sx: { maxHeight: '450px' } },
  enableCellActions:true,
  renderCellActionMenuItems:({ closeMenu, row, table }) => [
    <MRT_ActionMenuItem
      key={1}
      label=" تبدیل به فروشگاه "
      onClick={() => {
        GetRowIdToShop(row.original?.id)
        closeMenu();
      }}
      table={table}
    />,
    <Divider/>,
    
    <MRT_ActionMenuItem
      key={2}
      label="  تبدیل به نمایندگی "
      onClick={async () => {
        handleShopToBranch(row.original?.id)
        closeMenu()
      }}
      table={table}
    />,

  ],
  renderRowActionMenuItems: ({ row, table }) => [
    <MRT_ActionMenuItem
      icon={<Edit />}
      label=" تبدیل به فروشگاه"
      table={table}
      disabled={row.original?.is_branch == false}
      onClick={() => GetRowIdToShop(row.original?.id)}
    />,
    <MRT_ActionMenuItem
      icon={<Edit />}
      disabled={row.original?.is_branch == true}
      label=" تبدیل به نمایندگی"
      table={table}
      onClick={() => handleShopToBranch(row.original?.id)}
    />,
    <MRT_ActionMenuItem
    icon={<AddRounded />}
    label=" شارژ کیف پول "
    table={table}
    onClick={() => handleAddBalance(row.original?.id)}
  />
  ],
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

<Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={MakeBranchModal} onClose={() => setMakeBranchModal(false)}>

<DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
      تبدیل فروشگاه به نمایندگی
</DialogTitle>
<Divider />
<DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

  <div className="flex flex-col justify-center items-center gap-10 w-full" >
    <div className='w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ' >
      <Autocomplete
        className="md:w-[28%] w-[90%]"
        disablePortal
        noOptionsText=" داده ای موحود نیست "
        options={fac}
        getOptionLabel={(i)=> i.brand_name}
        onChange={(event, val) =>{
          setFacId(val.brand_id);
        }}
        sx={{ width:"190px"}}
        renderInput={(params) => <TextField {...params} variant="outlined" label=" کارخانه " />}
      />

    </div>

  </div>

</DialogContent>
<DialogActions className="p-4 flex flex-row gap-4 mt-10" >
    <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => GetRowIdToBranch()}>
      {loading ? <CircularProgress size="medium" /> : " ثبت "}
    </Button>

  <Button variant="soft" color='danger'  onClick={() => setMakeBranchModal(false)}>
    انصراف
  </Button>
</DialogActions>
</Dialog>



<Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={addBalanceModal} onClose={() => setAddBalanceModal(false)}>

<DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
       افزودن موجودی کیف پول
</DialogTitle>
<Divider />
<DialogContent className="flex flex-col items-center gap-10 mt-12 h-full " >           

  <div className="flex flex-col justify-center items-center gap-8 w-full" >
    
    <TextField
      className="md:w-[70%] w-[90%]"
      id="input-with-icon-textfield"
      label="  مبلغ شارژ "
      placeholder=" مبلغ واریزی را (به ریال) وارد کنید "
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <PaymentOutlined className='text-asliLight' />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />

  </div>

</DialogContent>
<DialogActions className="p-4 flex flex-row gap-4 mt-10" >
    <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => AddBalanceAdmin()}>
      {loading ? <CircularProgress size="medium" /> : " افزودن موجودی "}
    </Button>

  <Button variant="soft" color='danger'  onClick={() => setAddBalanceModal(false)}>
    انصراف
  </Button>
</DialogActions>
</Dialog>


        <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>

        <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>

    </div>



    );
}

export default page;