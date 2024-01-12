import Image from "next/image";
import testimage from "../../../public/Icons/پرسپولیس.webp"
import testimage2 from "../../../public/Icons/نگین.webp"
import testimage3 from "../../../public/Icons/مریم.webp"
import testimage4 from "../../../public/Icons/48498640-3ca8-4e3f-be18-089dfcdb735a.jpg"
import testimage5 from "../../../public/Icons/779b7133-a972-4453-8bc6-a528386d069c.jpg"
import testimage6 from "../../../public/Icons/8752fa06-c9ae-4243-8e06-4e9102118341.jpg"
import testimage7 from "../../../public/Icons/96dc745a-ee7d-4919-80f6-e070c2e3ebe4.jpg"
import testimage8 from "../../../public/Icons/9ace7948-9f8a-4c60-ac9a-cd89204115c9.jpg"
import testimage9 from "../../../public/Icons/9b01f619-5a58-4bba-b0b7-f93cef9e59ff.jpg"
import testimage10 from "../../../public/Icons/c663e4b3-812b-414d-a95e-15e3ba20d485.jpg"
import "../styles/BrandSlider.css"

const BrandSlider = () => {
    return (
        <>

            <div className="slider h-48 rounded-xl m-auto w-[90%] relative grid place-items-center overflow-hidden " >

                <div className="slider-track flex flex-row w-full" >
                    
                    <div className="slide flex items-center p-1 h-40 w-40 " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40 " >
                        <Image src={testimage4} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage5} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage6} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40 " >
                        <Image src={testimage7} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage8} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage9} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40 " >
                        <Image src={testimage10} className="rounded-full" />
                    </div>



                </div>

            </div>
            
        </>
    );
}

export default BrandSlider;