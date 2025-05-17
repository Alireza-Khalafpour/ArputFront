'use client'

import { Button, Dialog, DialogContent, Slide } from "@mui/material";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import axios from "axios";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const ProuductsTableOfShopAndFactory = ({triggerGetShopProductApi}) => {

  const url = process.env.NEXT_PUBLIC_URL


    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')
    const [data, setData] = useState([])
    //-------------
    const [openDetail, setOpenDetail] = useState(false);
    const [info, setInfo] = useState([])
    const [features, setFeatures] = useState([])
    const [imageUrl, setImageUrl] = useState()
    const [hasBundle, setHasBundle] = useState(false)

    async function ListApi(Au) {
      
        await axios.get(`${url}/product/shop`, {
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

      useEffect(() => {
        ListApi(Auth)
      },[triggerGetShopProductApi])

        // columns and data =============================================
  const columns = useMemo(
    () => [
        {
            header: ' امتیاز ',
            accessorKey: 'rate',
            id: 'rate',
        },
      {
        header: ' نام محصول ',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: ' قیمت ',
        accessorKey: 'price',
        id: 'price',
        Cell: ({ cell }) => <span>{ cell.getValue() ? digitsEnToFa(addCommas(cell.getValue())) : ""} ریال </span>,
      },
      {
        header: ' کارخانه ',
        accessorKey: 'factory_name',
        id: 'factory_name',
      },
      {
        header: ' دسته بندی ',
        accessorKey: 'category_name',
        id: 'category_name',
      },

      {
        header: ' توضیحات ',
        accessorKey: 'description',
        id: 'description',
      },
      

    ],
    []
  );

  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const handleDetailModal = (row) => {
    setInfo(row.original.info)
    setFeatures(row.original.feature_info)
    setImageUrl(row.original?.image_url)
    setOpenDetail(true)
  }


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
          <div className="w-max gap-3 flex flex-row justify-center items-center">
            <Button onClick={() => handleDetailModal(row)} size="small" className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "  >
              جزییات
            </Button>
          </div>
        )
      }
  
  });

    return (
        <>
            <MaterialReactTable table={table}/>
            <Dialog
                open={openDetail}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                onClose={handleCloseDetail}
                aria-describedby="alert-dialog-slide-description"
                className="rounded-xl shadow-lg"
            >

        <DialogContent>

          <div className="flex flex-col mx-auto gap-4 w-full" >

            <h2  className="p-2 rounded-2xl bg-sky-200" > اطلاعات جانبی </h2>
            <div className="flex flex-row gap-1 justify-center items-center w-full" >

                <div className="w-1/3" > <Image src={imageUrl ? imageUrl : ""} width={150} height={150} /> </div>
                <div className="w-2/3  grid grid-cols-2 gap-4 " >

                  <p>طول : {digitsEnToFa(`${info.height}`)} سانتی متر  </p>
                  <p>عرض: {digitsEnToFa(`${info.width}`)} سانتی متر  </p>
                  <p>وزن: {digitsEnToFa(`${info.weight}`)} کیلوگرم  </p>

                </div>
            </div>

            <h2 className="p-2 rounded-2xl bg-sky-200" > ویژگی ها </h2>


            <div className="grid grid-cols-2 gap-4 justify-around items-center w-full" >

              {features.map((x) => (
                <p> {x.feature_name} : {x.feature_sample_name} </p>
              ))} 

            </div>
            <h2 className="p-2 rounded-2xl bg-sky-200" > واقعیت افزوده: {hasBundle == true ? "دارد" : "ندارد"} </h2>

          </div>

        </DialogContent>
      </Dialog>
        </>
    );
}

export default ProuductsTableOfShopAndFactory;