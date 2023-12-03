'use client'

import { CurrencyExchangeRounded, Delete, DeleteForeverOutlined, DetailsOutlined, Edit, FireTruckOutlined, FireTruckRounded, History, PostAddRounded, RefreshOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { e2p } from "@/utils/replaceNumbers";



const MyProducts = () => {



     /* ********** CONTEXT MENU ************* */
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
      label: ' ویرایش کالا ',
      icon: (
        <Edit
          sx={{
            color: '#FF9900',
          }}
        />
      ),
      onClick: () => alert("dbkjdfbk"),
    },
    {
      label: ' حذف کالا ',
      icon: (
        <Delete
          sx={{
            color: 'red',
          }}
        />
      ),
      onClick: () => console.log(contextMenuRowData),
    },
  ];



    // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' عنوان ',
        accessorKey: 'firstName',
        id: 'firstName',
        size: 250,
        // Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,

      },
      {
        header: ' عنوان کالا ',
        accessorKey: 'lastName',
        id: 'lastName',
        size: 250,
        // Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,

      },
      {
        header: ' قیمت ',
        accessorKey: 'email',
        id: 'email',
        columnFilterModeOptions: ['contains'],
        size: 350,
      },
      {
        header: ' وضعیت ',
        accessorKey: 'state',
        id: 'state',
        size: 250,
        // Cell: ({ cell }) => <span>{e2p(cell.getValue())}</span>,

      },
    //   {
    //     header: ' managerId ',
    //     accessorKey: 'managerId',
    //     id: 'managerId',
    //     maxSize: 250,
    //     // Cell: ({ cell }) => <span>{cell.getValue().toLocaleString()}</span>,
    //   },

    ],
    []
  );

    const data = [
        // {
        // id: '9s41rp',
        // firstName: ' لعاب ',
        // lastName: 'لعاب',
        // email: '85000',
        // state: 'م',
        // managerId: null,
        // },
        {
        id: '08m6rx',
        firstName: 'کاشی',
        lastName: 'کاشی',
        email: e2p(450000),
        state: 'م ',
        managerId: '655a24893a597cada94c46ec',
        },
        {
        id: '655a24893a597cada94c46ec',
        firstName: ' کاشی و سرامیک ',
        managerId: null, //top of a tree
        },
        // {
        // id: 'ek5b97',
        // firstName: 'Glenda',
        // lastName: 'Douglas',
        // email: 'Eric0@yahoo.com',
        // state: 'Montana',
        // managerId: '08m6rx',
        // },
        // {
        // id: 'xxtydd',
        // firstName: 'Leone',
        // lastName: 'Williamson',
        // email: 'Ericka_Mueller52@yahoo.com',
        // state: 'Colorado',
        // managerId: '08m6rx',
        // },
        // {
        // id: 'wzxj9m',
        // firstName: 'Mckenna',
        // lastName: 'Friesen',
        // email: 'Veda_Feeney@yahoo.com',
        // state: 'New York',
        // managerId: null, //top of a tree
        // },
        // {
        // id: '21dwtz',
        // firstName: 'Wyman',
        // lastName: 'Jast',
        // email: 'Melvin.Pacocha@yahoo.com',
        // state: 'Montana',
        // managerId: 'wzxj9m',
        // },
        // {
        // id: 'o8oe4k',
        // firstName: 'Janick',
        // lastName: 'Willms',
        // email: 'Delfina12@gmail.com',
        // state: 'Nebraska',
        // managerId: 'wzxj9m',
        // },
    ];

    const rootData = useMemo(() => data.filter((r) => !r.managerId), [data])


    return (
        <div>
            <MaterialReactTable
                muiTableBodyCellProps={({ row }) => ({
                    onContextMenu: (e) => handleContextMenu(e, row),
                  })}

                displayColumnDefOptions={{
                'mrt-row-actions': {
                    muiTableHeadCellProps: {
                    align: 'center',
                    },
                    size: 120,
                },
                }}
                getSubRows={(row) => data.filter((r) => r.managerId === row.id)}
                enableExpanding
                columns={columns}
                data={rootData}
                enableRowSelection // enable some features
                enableColumnOrdering
                enableGlobalFilter // turn off a feature
                enableRowActions
                manualPagination
                manualFiltering
                enableColumnResizing
                enableMultiRowSelection
                enableRowNumbers
                rowNumberMode="original"
                enableStickyHeader
                enableStickyFooter
                muiTableContainerProps={{
                sx: { maxHeight: '63vh',width: '98vw'},
                }}
                enableFullScreenToggle={false}
                positionActionsColumn="last"
                positionToolbarAlertBanner="none"
                localization={mrtLocalizationFa}
                getRowId={(originalRow) => originalRow.receiptChequeItemId}
                // onRowSelectionChange={setRowSelection}
                // onGlobalFilterChange={setGlobalFilter}
                // onColumnFiltersChange={setColumnFilters}
                // state={{
                // pagination,
                // columnFilters,
                // rowSelection,
                // showColumnFilters,
                // }} 
                // pass our managed row selection state to the table to use
                muiTableHeadCellProps={{
                sx: {
                    fontWeight: '800',
                    fontSize: '14px',
                    backgroundColor: '#ECEFF1',
                    alignItems: 'center',
                    background: '#1D9BF0',
                    borderRight: '1px solid rgba(224,224,224,1)',
                    color: 'white',
                },
                }}
                muiTableBodyProps={{
                sx: {
                    '& tr:nth-of-type(odd)': {
                    backgroundColor: '#e6f9ff',
                    },
                    width: '100%',
                },
                }}
                // renderRowActions={({ row, table }) => (
                // <Box sx={{ display: 'flex', gap: '1rem' }}>
                //     <Tooltip arrow className="z-50 bg-teal-800" placement="top" title="مشاهده تاریخچه">
                //     <IconButton
                //         className="edit-button bg-teal-800 hover:bg-teal-600"
                //         // onClick={() => handleClickHistoryBtn(row.original)}
                //     >
                //         <History /> مشاهده تاریخچه
                //     </IconButton>
                //     </Tooltip>
                // </Box>
                // )}
            />

        <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        />
        </div>
    );
}

export default MyProducts;