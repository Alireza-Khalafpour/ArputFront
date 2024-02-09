'use client'

import { CloseRounded, PlayArrow } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { useState } from "react";


const BannerVideoMainPage = () => {

    const [videoModal, setVideoModal] = useState(false);



    return (
        <>

            <div className="mx-auto w-fit h-fit relative blobVideo overflow-hidden">
                <button onClick={() => setVideoModal(true)} className="absolute top-[50%] left-[45%] p-4 bg-khas rounded-full z-20 w-20 h-20 " >
                    <PlayArrow className="text-purple-900 text-4xl animate-pulse " />
                </button>
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-30 rounded-2xl md:rounded-tr-[190px]  rounded-tr-2xl md:rounded-bl-[190px] rounded-bl-2xl " ></div>
                <video src="https://superapp-storage.storage.iran.liara.space/video/1.mp4" className="object-cover w-full " autoPlay loop muted />
            </div>




            <Modal open={videoModal} onClose={() => setVideoModal(false)} >
                <div className='w-full h-full flex justify-center items-center text-center' >

                    <button className='bg-red-600 rounded-full p-3 absolute top-[9%] right-[15%] font-bold hover:bg-red-700 transition-all duration-150 ' onClick={() => setVideoModal(false)} >
                        <CloseRounded className="text-white font-bold" />
                    </button>
                    
                    <div className="w-[70vw] h-[70vh]">
                        <span className='block m-auto' ></span>
                        <iframe 
                        className='w-full h-full'
                        src="https://www.aparat.com/video/video/embed/videohash/cY0jN/vt/frame?titleShow=true&autoplay=true" 
                        allow="autoplay" 
                        allowFullScreen="true" 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true"
                        ></iframe>
                    </div>

                </div>
            </Modal>


        </>
    );
}

export default BannerVideoMainPage;