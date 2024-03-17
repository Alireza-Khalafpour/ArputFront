'use client'

import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import img1 from "../../../public/images/b1.jpg"
import img2 from "../../../public/images/b2.jpg"
import img3 from "../../../public/images/b3.jpg"
import img4 from "../../../public/images/EnamadLogo.png"
import img5 from "../../../public/images/features_frame.png"
import img6 from "../../../public/images/goodtile.webp"
import img7 from "../../../public/images/b1.jpg"
import img8 from "../../../public/images/b1.jpg"
import img9 from "../../../public/images/b1.jpg"
import img10 from "../../../public/images/b1.jpg"
import img11 from "../../../public/images/b1.jpg"
import Image from "next/image";
import "../styles/ImageGalleryModalStyles.css"






const ImageGalleryModal = ({handleCloseImages,openImages, ImgList}) => {


    console.log(ImgList)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedImg, setSelectedImg] = useState()



    useEffect(() => {
        setSelectedImg(ImgList[0])
    },[])



    return (
        <>


    <Dialog

        open={openImages}
        onClose={handleCloseImages}
        aria-labelledby="responsive-dialog-title"
        className="w-full"
      >
        <DialogContent className="grid max-h-min w-full " >

            <div class="flex flex-row gap-4 w-full">
                <div className="p-3 w-2/3">
                    <Image class=" max-w-full rounded-lg  mx-auto" src={selectedImg} quality={100} width={300} height={300} alt="" />
                </div>
                <div class="grid grid-cols-1 gap-4 w-1/3">
                    {
                        ImgList.map((i) => (
                            <div>
                                <img onClick={() => setSelectedImg(i)} class="h-auto max-w-full rounded-lg cursor-pointer" src={i} alt={i} />
                            </div>
                        ))
                    }
                    <div>
                        <img onClick={() => setSelectedImg(img2) } class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                    </div>
                </div>
            </div>
      
        </DialogContent>
      </Dialog>
            
        </>
    );
}







export default ImageGalleryModal;