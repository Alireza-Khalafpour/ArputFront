'use client'


import axios from "axios";
import * as shamsi from 'shamsi-date-converter';
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { AddCircleOutline, Category, Delete, DeleteRounded, Edit, LocationCity, LocationOnRounded, RadioButtonChecked, RingVolumeOutlined, SmartphoneOutlined } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { MRT_ActionMenuItem, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useRouter } from "next/navigation";
import { digitsEnToFa } from "@persian-tools/persian-tools";





const page = () => {

    const cookie = new Cookies();

    const Auth = cookie.get('tokenDastResi')

    const route = useRouter();

    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])

    const [MakeBranchModal, setMakeBranchModal] = useState(false);




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
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    }

    

    useEffect(() => {
      const Auth = cookie.get('tokenDastResi')
      ListApi(Auth);
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
      onClick={() => GetRowIdToBranch(row.original?.id)}
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
        multiple
        limitTags={1}
        noOptionsText=" داده ای موحود نیست "
        // options={categoryList}
        // getOptionLabel={(i)=> i.name}
        // onChange={(event, val) =>{
        //   setaddCategs([...val]);
        // }}
        sx={{ width:"190px"}}
        renderInput={(params) => <TextField {...params} variant="outlined" label=" کارخانه " />}
      />

    </div>

  </div>

</DialogContent>
<DialogActions className="p-4 flex flex-row gap-4 mt-10" >
    <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => EditDepartmentApi()}>
      {loading ? <CircularProgress size="medium" /> : " ثبت "}
    </Button>

  <Button variant="soft" color='danger'  onClick={() => setAddDepartmentModal(false)}>
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