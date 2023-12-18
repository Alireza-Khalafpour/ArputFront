'use client'

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const BigSize = 100;
const SmallSize = 25;
const Per_Px = 0.35;


const Dot = ({mousePos}) => {


    let size = useSpring(SmallSize, 
        { damping: 30 , stiffness: 200 });

    const dotRef = useRef(null)

    useEffect(() =>{
        if(!dotRef.current) return;
        const {x, y} = mousePos;
        const {x:dotX, y:dotY} = dotRef.current.getBoundingClientRect();


        const distance = Math.sqrt(
            Math.pow(Math.abs(x - dotX), 2) +
            Math.pow(Math.abs(y - dotY), 2)
        );
    
        size.set(Math.max(BigSize - Per_Px * distance), SmallSize)

    },[mousePos, size])




    return (
        <div ref={dotRef} className="relative" >
            <motion.div
                className="bg-khas rounded-full absolute -translate-y-1/2 translate-x-1/2" 
                style={{width: size , height: size}}
            />
        </div>
    );
}

export default Dot;