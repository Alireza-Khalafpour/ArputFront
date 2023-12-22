import Image from "next/image";
import proimg from "../../../../public/images/b2.jpg"
import proimgDet from "../../../../public/images/b3.jpg"
import { e2p, sp } from "@/utils/replaceNumbers";
import { Badge } from "@mui/material";
import { Textarea } from "@mui/joy";
import CommentTextArea from "@/components/module/CommentTextArea";

const SingleProduct = () => {
    return (
        <div className="flex flex-col gap-14 justify-start items-center w-full p-4" >

            <div className="flex md:flex-row flex-col-reverse gap-2 w-full h-full" >

                <div className="w-2/3 h-full" >
                    product info
                </div>

                <div className="md:w-1/3 w-full flex flex-col justify-center items-center gap-2 h-full" >
                    <div id="main-Image" className="w-full h-2/3 " >
                        <Image
                            className="w-full h-full rounded-xl"
                            src={proimg}
                            priority
                        />
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center max-h-1/3 overflow-y-scroll w-full mx-auto" >
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                        <Image width={140} height={140} src={proimgDet} className="rounded-xl" />
                    </div>
                </div>

            </div>

            <div className="w-full flex flex-col gap-12 justify-center items-center" >

                <div className="w-full" >
                    <span className="border-b-8 border-khas p-2 text-2xl" > فروشندگان این کالا </span>
                </div>

                <ul className="md:w-[90%] w-full flex flex-col gap-6 " >
                    <li className="w-full flex flex-row justify-between items-center p-4 odd:bg-slate-200 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>
                    <li className="w-full flex flex-row justify-between items-center p-4 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>
                    <li className="w-full flex flex-row justify-between items-center p-4 border-2 border-asliDark rounded-xl border-dashed " >
                        <h2> نام فروشنده </h2>
                        <span> نحوه عملکرد و امتیاز </span>
                        <h3 > {e2p(sp(45000000))} </h3>
                        <button className="p-3 rounded-xl bg-khas text-white hover:bg-orange-600 duration-200 transition-colors" >
                            افزودن به سبد خرید
                        </button>
                    </li>

                </ul>

            </div>


            <div className="w-full flex flex-col gap-12 justify-center items-center" >

                <div className="w-full" >
                    <span className="border-b-8 border-khas p-2 text-2xl" > دیدگاه و نظرات </span>
                </div>

                <div className="md:w-[90%] w-full" >
                    <CommentTextArea/>
                </div>

                <ul className="w-full flex flex-col gap-6 justify-center items-center " >
                    <li className="md:w-[90%] w-full flex flex-row justify-start items-center p-4 odd:bg-slate-200 border-black border-b-2 " >


                    </li>

                </ul>

            </div>


        </div>
    );
}

export default SingleProduct;