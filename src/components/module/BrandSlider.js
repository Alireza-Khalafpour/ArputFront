import Image from "next/image";
import testimage from "../../../public/images/پرسپولیس.webp"
import testimage2 from "../../../public/images/نگین.webp"
import testimage3 from "../../../public/images/مریم.webp"
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
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage2} className="rounded-full" />
                    </div>
                    <div className="slide flex items-center p-1 h-40 w-40  " >
                        <Image src={testimage3} className="rounded-full" />
                    </div>

                </div>

            </div>
            
        </>
    );
}

export default BrandSlider;