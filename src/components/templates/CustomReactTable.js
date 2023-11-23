'use client'

// import {MaterialReactTable} from 'material-react-table';
// import { MRT_Localization_FA as mrtLocalizationFa } from "material-react-table/locales/fa";
// import { useMemo } from 'react';
// import { ContentCopy } from '@mui/icons-material';

  
//   const data = []
  
//   const CustomReactTable = () => {
//     const columns = useMemo(
//       () => [
//         {
//           accessorKey: 'name.firstName',
//           header: ' عنوان کالا ',
//         },
//         {
//           accessorKey: 'address',
//           header: 'ویژگی ها',
//         },
//         {
//           accessorKey: 'email',
//           header: 'قیمت',
//           enableClickToCopy: true,
//           muiCopyButtonProps: {
//             fullWidth: true,
//             startIcon: <ContentCopy />,
//             sx: { justifyContent: 'flex-start' },
//           },
//         },
//         {
//           accessorKey: 'name.firstName',
//           header: ' عنوان کالا ',
//         },
//         {
//           accessorKey: 'address',
//           header: 'ویژگی ها',
//         },
//         {
//           accessorKey: 'address',
//           header: 'ویژگی ها',
//         },
//       ],
//       [],
//     );
  
//     return (
//     <MaterialReactTable
//      localization={mrtLocalizationFa}
//       columns={columns}
//        data={data} 
//        muiTableContainerProps={{
//         sx: { maxHeight: "63vh", width: "99vw" },
//       }}
//       muiSelectCheckboxProps={{
//         color: "secondary",
//         sx: { borderRadius: "2px" },
//       }}
//       muiTableHeadCellProps={{
//         sx: {
//           fontWeight: "400",
//           fontSize: "16px",
//           backgroundColor: "#ECEFF1",
//           height: "40px",
//           alignItems: "center",
//         },
//       }}
//       muiTableBodyProps={{
//         sx: {
//           "& tr:nth-of-type(odd)": {
//             backgroundColor: "#F0FFFF",
//           },
//           width: "100%",
//         },
//       }}
//     />
//     )
//   };
  
//   export default CustomReactTable;
  





// -----------------------------------------------------------------------------------------


import React, { useMemo } from 'react';

//MRT Imports
//import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

//Material UI Imports
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';


//Icons Imports
import { AccountCircle, Send } from '@mui/icons-material';


const CustomReactTable = () => {

  const data = [{"salary" : "9000000"}]

  const columns = useMemo(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Email',
            size: 300,
          },
        ],
      },
      {
        id: 'id',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: 'between',
            header: 'Salary',
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: 'jobTitle', //hey a simple column for once
            header: 'Job Title',
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterFn: 'lessThanOrEqualTo',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            //Custom Date Picker Filter from @mui/x-date-pickers
            // Filter: ({ column }) => (
            //   <LocalizationProvider dateAdapter={AdapterDayjs}>
            //     <DatePicker
            //       onChange={(newValue) => {
            //         column.setFilterValue(newValue);
            //       }}
            //       slotProps={{
            //         textField: {
            //           helperText: 'Filter Mode: Less Than',
            //           sx: { minWidth: '120px' },
            //           variant: 'standard',
            //         },
            //       }}
            //       value={column.getFilterValue()}
            //     />
            //   </LocalizationProvider>
            // ),
          },
        ],
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      // initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            alt="avatar"
            height={200}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Signature Catch Phrase:</Typography>
            <Typography variant="h1">
              &quot;{row.original.signatureCatchPhrase}&quot;
            </Typography>
          </Box>
        </Box>
      )}
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
      ]}
      renderTopToolbarCustomActions={({ table }) => {
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.getValue('name'));
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.getValue('name'));
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.getValue('name'));
          });
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              color="error"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
            <Button
              color="info"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="contained"
            >
              Contact
            </Button>
          </div>
        );
      }}
    />
  );
};

export default CustomReactTable;
