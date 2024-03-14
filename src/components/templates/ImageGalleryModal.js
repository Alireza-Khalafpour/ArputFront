'use client'

import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
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






const ImageGalleryModal = ({handleCloseImages,openImages}) => {



    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    return (
        <>


    <Dialog
        fullScreen
        open={openImages}
        onClose={handleCloseImages}
        aria-labelledby="responsive-dialog-title"
        className="w-full"
      >
        <DialogContent className="grid-wrap" >

                <ul className="grid-wrap-ul" >
                    <li className="grid-wrap-li" >
                        <Image src={img1} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img2} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img3} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img4} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img5} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img6} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img7} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img8} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img9} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img10} className="grid-wrap-img" />
                    </li>
                    <li className="grid-wrap-li" >
                        <Image src={img11} className="grid-wrap-img" />
                    </li>
                    
                </ul>
                        
        </DialogContent>
      </Dialog>
            
        </>
    );
}







export default ImageGalleryModal;