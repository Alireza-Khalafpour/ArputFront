import { Search } from "@mui/icons-material";
import { Button, Input } from "@mui/joy";
import Link from "next/link";
import CustomReactTable from "./CustomReactTable";
import { Divider } from "@mui/material";

const AddTexturePage = () => {
    return (
        <div className="w-full flex flex-col gap-4">

            <p className="text-paszamine3"> جستجو یا درج تکسچر | تکسچری که قصد استفاده از آن را دارید را جستجو کنید، در غیر اینصورت از "ایجاد تکسچر جدید" اقدام به افزودن تکسچر خود کنید. </p>

            <Divider/>

            <div className="w-full flex flex-row justify-center items-center gap-6" >

                <Input
                    className="p-0 w-4/12"
                    startDecorator={<Search />}
                    placeholder="جستجوی نام یا کد"
                    size="lg"
                    endDecorator={<Button className="bg-khas hover:bg-orange-500 w-28"> جستجو </Button>}
                />
                <div className="flex flex-row gap-3">
                    <h6> محصول مورد نظر رو پیدا نکردی؟  </h6>
                    <Link href="/dashboard/add-texture-main" className="border-b-2 border-dashed text-asliLight border-asliLight text-base hover:border-solid"> ایجاد تکسچر جدید </Link>
                </div>

            </div>

            <div className="w-full flex justify-center" >
                <CustomReactTable/>
            </div>
            
        </div>
    );
}

export default AddTexturePage;