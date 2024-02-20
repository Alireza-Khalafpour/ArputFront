'use client'

import Image from "next/image";
import RepairSVG from "../../../public/images/RepairingWebsite.svg"


const RepairingWebsite = () => {
    return (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center" >
            <Image src={RepairSVG} width={400} height={400} />
            <h2 className="text-2xl" >سایت در دست تعمیر... </h2>
        </div>
    );
}

export default RepairingWebsite;