'use client'

import { CurrencyExchangeRounded, DeleteForeverOutlined, DetailsOutlined, FireTruckOutlined, FireTruckRounded, History, PostAddRounded, RefreshOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";



const ProcessingOrders = () => {



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
      label: ' ارسال محموله ',
      icon: (
        <FireTruckOutlined
          sx={{
            color: '#FF9900',
          }}
        />
      ),
      onClick: () => alert("dbkjdfbk"),
    },
    {
      label: ' نمایش جزییات خریداران ',
      icon: (
        <DetailsOutlined
          sx={{
            color: '#FF9900',
          }}
        />
      ),
      onClick: () => alert("dbkjdfbk"),
    },
    {
      label: ' حذف سفارش ',
      icon: (
        <DeleteForeverOutlined
          sx={{
            color: 'red',
          }}
        />
      ),
      onClick: () => alert("dbkjdfbk"),
    },
  ];



    // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: ' تاریخ سفارش',
        accessorKey: 'datePer',
        id: 'datePer',
        size: 250,
      },
      {
        header: ' عنوان ',
        accessorKey: 'dueDatePer',
        id: 'dueDatePer',
        columnFilterModeOptions: ['contains'],
        size: 350,
      },
      {
        header: ' کد محصول ',
        accessorKey: 'chequeStateTitle',
        id: 'chequeStateTitle',
        columnFilterModeOptions: ['equal'],
        size: 250,

      },
      {
        header: ' تعداد سفارش ',
        accessorKey: 'amount',
        id: 'amount',
        maxSize: 250,
        columnFilterModeOptions: ['between', 'lessThan', 'greaterThan', 'equal'],
        // Cell: ({ cell }) => <span>{cell.getValue().toLocaleString()}</span>,
      },

    ],
    []
  );

  const data = [
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
    {datePer:"1402/09/07", dueDatePer: "سرامیک لعاب دار", chequeStateTitle:"1200"},
  ]


    return (
        <div>
            <MaterialReactTable
                muiTableBodyCellProps={({ row }) => ({
                    onContextMenu: (e) => handleContextMenu(e, row),
                  })}
                  renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <div className="flex gap-5">
                        <Button
                            className="bg-khas hover:bg-orange-500"
                            // onClick={handleClickAction}
                            variant="contained"
                        >
                            <FireTruckRounded />
                            ارسال محموله های انتخاب شده
                        </Button>
    
                        </div>
                    );
                  }}
                displayColumnDefOptions={{
                'mrt-row-actions': {
                    muiTableHeadCellProps: {
                    align: 'center',
                    },
                    size: 120,
                },
                }}
                columns={columns}
                data={data}
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

export default ProcessingOrders;