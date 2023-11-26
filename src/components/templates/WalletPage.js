'use client'

import { AccountBalanceWalletOutlined, AccountCircle, FileDownloadOutlined, PaymentOutlined, Send } from "@mui/icons-material";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { Input } from "@mui/joy";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";
import { e2p } from "@/utils/replaceNumbers";





const WalletPage = () => {


    const data = [
        {
            date: "12/5/89",
            amount: "4580000000",
            paymentStatus: "موفق",
        },
        {
            date: "12/5/89",
            amount: "4580000000",
            paymentStatus: "ناموفق",
        },
        {
            date: "12/5/89",
            amount: "4580000000",
            paymentStatus: "در حال انجام",
        },
        {
            date: "12/5/89",
            amount: "4580000000",
            paymentStatus: "موفق",
        },
        {
            date: "12/5/89",
            amount: "4580000000",
            paymentStatus: "موفق",
        },
    ]


      const columns = [
        {
        accessorKey:'date',
          header: ' تاریخ واریز ',
          size: 150,
        },
        {
        accessorKey:'amount',
          header: ' مبلغ ',
          size: 150,
          Cell: ({ cell }) => (
            <Box component="span">
              {cell.getValue()?.toLocaleString('fa-IR')}
            </Box>
          ),
 
        },
        {
        accessorKey:'paymentStatus',
          header: ' وضعیت پرداخت  ' ,
          size: 150,
          Cell: ({ cell }) => (
            <Box
              className="px-4 py-1"
              component="span"
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue() === "موفق"
                    ? theme.palette.success.dark
                    : cell.getValue() === "ناموفق"
                    ? theme.palette.error.dark
                    : theme.palette.warning.dark,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
              })}
            >
              {cell.getValue()}
            </Box>
          ),
        },
      ];

        /* ********** CONTEXT MENU ************* */
//   const [contextMenuRowData, setContextMenuRowData] = useState({});
//   const [showContextMenu, setShowContextMenu] = useState(false);
//   const [contextMenuPosition, setContextMenuPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const handleContextMenu = (event, r) => {
//     event.preventDefault();
//     setContextMenuPosition({ x: event.clientX, y: event.clientY });
//     setShowContextMenu(true);
//     setContextMenuRowData(r);
//   };

//   const handleContextMenuClose = () => {
//     setShowContextMenu(false);
//   };

//   const handleShowHistoryForContext = (event, row) => {
//     dispatch(getReceiptChequeHistory(row.original.receiptChequeItemId));
//     setChequeSelectedInfo({ ...row.original });
//     setOpenHistoryModal(true);
//     handleContextMenuClose();
//   };

//   const contextMenuOptions = [
//     {
//       label: 'نمایش تاریخچه چک',
//       icon: (
//         <History
//           sx={{
//             color: '#4CAF50',
//           }}
//         />
//       ),
//       onClick: handleShowHistoryForContext,
//     },
//   ];

//   function handleClickHistoryBtn(rowInfo) {
//     dispatch(getReceiptChequeHistory(rowInfo.receiptChequeItemId));
//     setChequeSelectedInfo({ ...rowInfo });
//     setOpenHistoryModal(true);
//   }






    return (
        <div className="w-full">



            <div className="w-[80%] p-2 flex flex-col gap-4 mx-auto text-center" >

                <div className="flex justify-center items-center">
                    <div className="border-asliLight border-2 rounded-xl p-3 gap-3 flex flex-col w-[35%] h-48 justify-around items-center " >

                        <AccountBalanceWalletOutlined className="text-khas w-12 h-12" />

                        <Input className="w-[70%]" placeholder=" مبلغ واریزی را وارد کنید " endDecorator={<PaymentOutlined/>} />

                        <button className="bg-khas text-white rounded-xl font-semibold p-2 w-36 hover:bg-orange-500" > پرداخت </button>

                    </div>
                </div>
                <div>
                    <MaterialReactTable
                        columns={columns}
                        data={data}
                        enableColumnFilterModes
                        enableColumnOrdering
                        enableRowActions
                        localization={mrtLocalizationFa}
                        enableStickyFooter
                        enableStickyHeader
                        enableRowSelection
                        enableRowNumbers
                        positionActionsColumn="last"
                        // getRowId={(originalRow) => originalRow.receiptChequeItemId}
                        getrow
                        muiTableHeadCellProps={{
                            sx:{
                                backgroundColor:"#1D9BF0",
                                color:"white",
                                fontSize:"14px",
                                textAlign:"center"
                            }
                        }}
                        renderBottomToolbar={() => {
                            return(
                                <div className="w-full flex justify-end items-center flex-row gap-4 p-4 border-4" >
                                    <span className="p-2 border border-khas text-asliLight font-semibold rounded-xl " > موجودی : {e2p(56000000)} </span>
                                    <span className="p-2 border border-khas text-asliLight font-semibold rounded-xl " > مجموع کل واریزی ها : {e2p(4500000000)} </span>
                                </div>
                            )
                        }}


                    />
                </div>

            </div>



            
        </div>
    );
}

export default WalletPage;