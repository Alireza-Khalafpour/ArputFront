'use client'


import { AddCircleOutlined, AddOutlined, CurrencyExchangeRounded, DeleteForeverOutlined, DetailsOutlined, FireTruckOutlined, FireTruckRounded, HdrPlus, History, PostAddRounded, RefreshOutlined } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import ContextMenu from "@/utils/ContextMenu";
import { Filter, Filter1Rounded, FilterAlt, Search } from "@mui/icons-material";
import { Button, Input } from "@mui/joy";
import Link from "next/link";
import { Divider } from "@mui/material";

const PreProductListPage = () => {
    
    
    
    
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
    const [openFilter, setOpenFilter] = useState(false)
    

    return (
        <div className="w-full flex flex-col gap-4 p-2">

            <p className="text-paszamine3 py-4"> جستجو یا درج تکسچر | تکسچری که قصد استفاده از آن را دارید را جستجو کنید، در غیر اینصورت از "ایجاد تکسچر جدید" اقدام به افزودن تکسچر خود کنید. </p>

            <Divider/>

            <div className="w-full flex flex-row justify-center items-center gap-6 py-10" >

                <div className="p-0 w-5/12 flex flex-row" >
                    <button onClick={() => setOpenFilter(true)} className="rounded-lg bg-khas text-white p-0 rounded-l-none hover:bg-orange-500 flex flex-row-reverse justify-center items-center px-1 " >
                        فیلتر <FilterAlt/>
                    </button>
                    <Input
                        className="w-full rounded-none"
                        startDecorator={<Search />}
                        placeholder="جستجوی نام یا کد"
                        size="lg"
                    />
                    <Button size="md" className="bg-khas hover:bg-orange-500 w-28 rounded-r-none"> جستجو </Button>
                </div>


                <div className="flex flex-row gap-3">
                    <h6> محصول مورد نظر رو پیدا نکردی؟  </h6>
                    <Link href="/dashboard/add-pre-product" className="border-b-2 border-dashed text-asliLight border-asliLight text-base hover:border-solid"> ایجاد کالای جدید </Link>
                </div>

            </div>

            <div className="w-[95%] flex justify-center items-center " >

                <div>
                    <MaterialReactTable
                        muiTableBodyCellProps={({ row }) => ({
                            onContextMenu: (e) => handleContextMenu(e, row),
                        })}
                        renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <div className="flex gap-5">
                            <Button
                                className="bg-khas hover:bg-orange-500 text-white font-light"
                                // onClick={handleClickAction}
                                variant="contained"
                            >
                                <AddCircleOutlined className="mx-2" />
                                    اضافه کردن کالا ها به محصولات من
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
                        sx: { maxHeight: '63vh',width: '98%'},
                        }}
                        enableFullScreenToggle={false}
                        positionActionsColumn="last"
                        positionToolbarAlertBanner="none"
                        localization={mrtLocalizationFa}
                        getRowId={(originalRow) => originalRow.receiptChequeItemId}
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
                    />

                <ContextMenu
                    open={showContextMenu}
                    position={contextMenuPosition}
                    onClose={handleContextMenuClose}
                    rowData={contextMenuRowData}
                    options={contextMenuOptions}
                />
                </div>


            </div>

            
        </div>
    );
}

export default PreProductListPage;