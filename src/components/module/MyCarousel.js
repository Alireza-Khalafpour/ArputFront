'use client'
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import img1 from "../../../public/images/Slider1.jpg"
import img2 from "../../../public/images/Slider2.jpg"
import img3 from "../../../public/images/Slider3.jpg"
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Fade } from 'react-reveal';

export default function MyCarousel()
{
    var items = [
        {
            image: img1,
            name: img1,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: img2,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: img3,
            description: "Probably the most random thing you have ever seen!"
        },
    ]

    return (

        <div className='w-full mx-auto' >
            <Fade bottom cascade>
                <Carousel NextIcon={<ChevronRight className='text-khas w-10 h-10' />} PrevIcon={<ChevronLeft className='text-khas w-10 h-10' />} animation='slide' className='w-[90%] relative h-[500px] rounded-xl text-center mx-auto' >
                    {
                        items.map( (item, i) => <Image key={i} fill quality={100} placeholder='blur' sizes='100vw' style={{objectFit:"cover"}} src={item.image} /> )
                    }
                </Carousel>
            </Fade>
        </div>

    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}