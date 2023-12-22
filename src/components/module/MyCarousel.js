'use client'
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import img1 from "../../../public/images/b1.jpg"
import img2 from "../../../public/images/b2.jpg"
import img3 from "../../../public/images/b3.jpg"

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

        <div className='w-full' >
        <Carousel NextIcon="<" PrevIcon=">" animation='slide' className='w-full' >
            {
                items.map( (item, i) => <Image key={i} className='w-full h-96 rounded-xl'  src={item.image} /> )
            }
        </Carousel>
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