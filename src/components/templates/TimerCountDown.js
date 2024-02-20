'use client'


import { useEffect, useRef, useState } from "react";


const TimerCountDown = () => {

    const [Day, setDay] = useState("00")
    const [Hour, setHour] = useState("00")
    const [Minute, setMinute] = useState("00")
    const [Second, setSecond] = useState("00")

    let interval = useRef()

    const StartTimer = () => {
        const CountDownDate = new Date('February 30, 2024 00:00:00').getTime();

        interval = setInterval(() => {
            
            const now = new Date().getTime();
            const distance = CountDownDate - now

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
            const seconds = Math.floor((distance % (1000 * 60) / 1000))

            if(distance < 0) {
                clearInterval(interval.current)
            }else {
                setDay(days)
                setHour(hours)
                setMinute(minutes)
                setSecond(seconds)
            }

        }, 1000);
    }


    useEffect(() =>{
        StartTimer()
        return () =>{
            clearInterval(interval.current)
        }
        
    },[])


    return (
        <div className="w-full flex flex-row-reverse justify-center items-center gap-4 " >



            <div className="md:w-1/5 w-full flex flex-col text-center p-5 rounded-xl backdrop-blur-md bg-gray-200 text-khas text-3xl font-bold" > 
                {Day} 
                <p className="text-xl" > روز </p>
            </div>

            <div className="md:w-1/5 w-full flex flex-col text-center p-5 rounded-xl backdrop-blur-md bg-gray-200 text-khas text-3xl font-bold" > 
                {Hour} 
                <p className="text-xl" > ساعت </p>
            </div>

            <div className="md:w-1/5 w-full flex flex-col text-center p-5 rounded-xl backdrop-blur-md bg-gray-200 text-khas text-3xl font-bold" > 
                {Minute} 
                <p className="text-xl" > دقیقه </p>
            </div>

            <div className="md:w-1/5 w-full flex flex-col text-center p-5 rounded-xl backdrop-blur-md bg-gray-200 text-khas text-3xl font-bold" > 
                {Second} 
                <p className="text-xl" > ثانیه </p>
            </div>

        </div>
    );
}

export default TimerCountDown;