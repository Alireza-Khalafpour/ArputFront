"use client"

import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";
import { useState } from "react";

const MySlider = ({title}) => {

    const [expand, setExpand] = useState(false)
    const [content, setContent] = useState(false)

    function handleExpand() {
        setExpand((p) => !p)
        document.getElementById("noScroll").scrollTo(0, 0)
    }

    return (
        <>

            <h1 className='hover:text-khas max-w-max hover:cursor-pointer font-bold text-2xl' > {title} </h1>
                <br />

            <div id="noScroll" className={`w-full flex flex-row justify-start items-center ${expand ? "overflow-scroll" : "overflow-hidden"} gap-10 flex-wrap !max-h-[70vh] ${expand ? "h-[70vh]" : "h-52"} transition-all duration-700 `} >

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>

                <div onMouseEnter={() => setTimeout(() => setContent(true), 300)} onMouseLeave={() => setTimeout(() => setContent(false), 300)} className=" h-52 bg-[url('../../public/images/b1.jpg')] bg-[auto 100%] bg-center bg-no-repeat flex-[0.28] hover:flex-1  transition-all duration-700 rounded-xl cursor-pointer !min-w-[13%] " >
                    {content && <h2> نام محصول </h2>}
                </div>






            </div>

            <div className="w-full text-center my-6 border-b border-paszamine3 rounded-b-3xl" >
                <button onClick={() => handleExpand()} className="w-14 h-14 rounded-full bg-khas text-white transition-all duration-700" > {expand ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>} </button>
            </div>
            
        </>
    );
}



export default MySlider;