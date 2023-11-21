'use client'

import {MaterialReactTable} from 'material-react-table';
import { MRT_Localization_FA as mrtLocalizationFa } from "material-react-table/locales/fa";
import { useMemo } from 'react';
import { ContentCopy } from '@mui/icons-material';

  
  const data = []
  
  const CustomReactTable = () => {
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name.firstName',
          header: ' عنوان کالا ',
        },
        {
          accessorKey: 'address',
          header: 'ویژگی ها',
        },
        {
          accessorKey: 'email',
          header: 'قیمت',
          enableClickToCopy: true,
          muiCopyButtonProps: {
            fullWidth: true,
            startIcon: <ContentCopy />,
            sx: { justifyContent: 'flex-start' },
          },
        },
        {
          accessorKey: 'name.firstName',
          header: ' عنوان کالا ',
        },
        {
          accessorKey: 'address',
          header: 'ویژگی ها',
        },
        {
          accessorKey: 'address',
          header: 'ویژگی ها',
        },
      ],
      [],
    );
  
    return (
    <MaterialReactTable
     localization={mrtLocalizationFa}
      columns={columns}
       data={data} 
       muiTableContainerProps={{
        sx: { maxHeight: "63vh", width: "99vw" },
      }}
      muiSelectCheckboxProps={{
        color: "secondary",
        sx: { borderRadius: "2px" },
      }}
      muiTableHeadCellProps={{
        sx: {
          fontWeight: "400",
          fontSize: "16px",
          backgroundColor: "#ECEFF1",
          height: "40px",
          alignItems: "center",
        },
      }}
      muiTableBodyProps={{
        sx: {
          "& tr:nth-of-type(odd)": {
            backgroundColor: "#F0FFFF",
          },
          width: "100%",
        },
      }}
    />
    )
  };
  
  export default CustomReactTable;
  