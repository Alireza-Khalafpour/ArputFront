'use client'

import { Dns, Email, Smartphone } from "@mui/icons-material";
import { FormControl, FormLabel, Input, Textarea } from "@mui/joy";

const CompleteInfoPage = () => {


    return (
        <>


            <div className="flex flex-col gap-14 md:w-[90%] w-full p-12">

                    <div className="flex md:flex-row flex-col justify-around items-center" >

                        <FormControl className="w-full">
                            <FormLabel> کد اقتصادی </FormLabel>
                            <Input className="md:w-[85%] w-full shadow-lg " endDecorator={<Dns/>} size="lg" placeholder=" کد اقتصادی " />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        <FormControl className="w-full" >
                            <FormLabel> نام فروشگاه </FormLabel>
                            <Input id="f2" className="md:w-[85%] w-full shadow-lg " size="lg" endDecorator={<Dns/>} placeholder="  نام فروشگاه" />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        <FormControl className="w-full" >
                            <FormLabel> کدملی </FormLabel>
                            <Input className="md:w-[85%] w-full shadow-lg " size="lg" endDecorator={<Dns/>} placeholder="  کدملی صاحب فروشگاه" />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        </div>

                        <div className="flex md:flex-row flex-col justify-around items-center" >

                        <FormControl className="w-full" >
                            <FormLabel> ایمیل </FormLabel>
                            <Input className="md:w-[85%] w-full shadow-lg " endDecorator={<Smartphone/>} size="lg" placeholder=" ایمیل " />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        <FormControl className="w-full">
                            <FormLabel> شماره حساب </FormLabel>
                            <Input className="md:w-[85%] w-full shadow-lg " endDecorator={<Email/>} size="lg" placeholder=" شماره حساب " />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        <FormControl className="w-full">
                            <FormLabel> شماره شبا </FormLabel>
                            <Input className="md:w-[85%] w-full shadow-lg " endDecorator={<Email/>} size="lg" placeholder=" شماره شبا " />
                            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                        </FormControl>

                        </div>


                        <div className="flex flex-row justify-center items-center w-full" >

                        <button className="bg-khas py-2 rounded-full shadow-2xl w-48 text-white hover:bg-orange-500 transition-all duration-150" >
                            ثبت مشخصات
                        </button>

                    </div>


            </div>

            
        </>
    );
}

export default CompleteInfoPage;