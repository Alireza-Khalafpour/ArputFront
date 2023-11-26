'use client'

import { Filter, Filter1Rounded, FilterAlt, Search } from "@mui/icons-material";
import { Button, Input } from "@mui/joy";
import Link from "next/link";
import CustomReactTable from "./CustomReactTable";
import { Divider, SwipeableDrawer } from "@mui/material";
import { useState } from "react";

const PreProductListPage = () => {

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

            <div className="w-full flex justify-center" >
                <CustomReactTable/>
            </div>

            <SwipeableDrawer
                anchor="bottom"
                open={openFilter}
                onClose={ () => setOpenFilter(false)}
                // onOpen={toggleDrawer(anchor, true)}
            >
                <div className="h-96" >
                    Filter
                </div>
            </SwipeableDrawer>
            
        </div>
    );
}

export default PreProductListPage;