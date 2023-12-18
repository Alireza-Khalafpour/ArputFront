import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import img1 from "../../../public/images/c3.jpg"
import img2 from "../../../public/images/c1.jpg"
import img3 from "../../../public/images/c2.jpg"

export default function Example(props)
{
    var items = [
        {
            image: img1,
            name: img1,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: img1,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: img1,
            description: "Probably the most random thing you have ever seen!"
        },
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Image key={i} width={1200} src={item.image} /> )
            }
        </Carousel>
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