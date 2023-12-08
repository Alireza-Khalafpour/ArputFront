'use client'
import { OtpCode } from "@/app/GlobalRedux/Features/counter/CounterSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const OtpInput = () => {

    const [otp, setOtp] = useState(new Array(4).fill(""));

    const dispatch = useDispatch();

    // const handleBackSpace = (e) => {
    //     console.log(e.key, "key")
    //     if(e.key === "Backspace") {
    //         e.previousSibling.focus();
    //         console.log("it is the right key")
    //     }
    // }

    const handleChange = (element, index) =>{

        if(isNaN(element.target.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? element.target.value : d)])

        // Focus on next input-----
        if(element.target.nextSibling){
             element.target.nextSibling.focus();
        }

        dispatch(OtpCode(otp.join("")))
    }



    return (
        <div className="flex flex-row-reverse gap-1 text-center justify-center items-center" >
            {
                otp.map((data, i) => {
                    return (
                        <input
                            type="text"
                            name="otp"
                            key={i}
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e, i)}
                            onFocus={e => e.target.select()}
                            // onKeyUp={(e) => handleBackSpace(e)}
                            className="w-12 h-14 text-lg text-center border-2 border-dotted border-indigo-400 "
                        />
                    )
                })
            }
        </div>
    );
}

export default OtpInput;