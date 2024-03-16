'use client'

import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Cookies from "universal-cookie";
import axios from "axios";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";





const PreProductRateList = () => {
    

    const cookie = new Cookies();
  const Auth = cookie.get('tokenDastResi');



  const [data, setData] = useState([]);

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);




      async function GetRateList(Au) {
      
        await axios.get('https://supperapp-backend.chbk.run/rate/admin/star_list', {
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

      useEffect(() => {
        GetRateList(Auth)
      },[])





      const columns = [
          {
              header: ' تاریخ ',
              accessorKey:'created_at',
            id: 'created_at',
            
        },
        {
            header: ' نام کالا ',
            accessorKey:'pre_product_name',
            id: 'pre_product_name',
            
        },
        {
          header: ' امتیاز ',
          accessorKey:'range',
          id: 'range',
        },
          {
            header: ' کاربر ثبت کننده ',
            accessorKey:'username',
            id: 'username',

          },

      ];


      const table = useMaterialReactTable({
        columns,
        data,
        localization: mrtLocalizationFa,
        rowNumberDisplayMode: true,
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
      
      });




    return (
        <div className="w-full">

            <div className="w-[80%] p-2 flex flex-col gap-4 mx-auto text-center" >
              <MaterialReactTable table={table} />
            </div>
            
        </div>
    );
}

export default PreProductRateList;