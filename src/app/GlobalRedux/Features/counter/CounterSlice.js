'use client'

import { createSlice } from "@reduxjs/toolkit"
import { useState } from "react"

// const initialState ={
//     value: 0
// }

// {
//     id: "",
//     ProductName: "",
//     productCount: 0,
// }


const initialState ={
    items: [],
    Otp:"",
}

export const counterSlice = createSlice({
    
    name: 'counter',
    initialState,
    reducers:{
        increment : (state, action) => {
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            )
            state.items[itemIndex].cartQty += 1
        },
        decrement : (state, action) => {
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            )
            if(state.items[itemIndex].cartQty <= 1){
                const nextCartItem = state.items.filter(
                    (cartItem) => cartItem.id !== action.payload
                )
    
                state.items = nextCartItem
            } else {
                state.items[itemIndex].cartQty -= 1
            }
        },
        addCart: (state, action) =>{
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            )
            if(itemIndex >= 0){
                state.items[itemIndex].cartQty += 1
            }else {
                const tempProduct = {...action.payload, cartQty: 1}
                state.items.push(tempProduct)
            }
        },
        removeCart: (state, action) =>{
            const nextCartItem = state.items.filter(
                (cartItem) => cartItem.id !== action.payload
            )

            state.items = nextCartItem
        },
        OtpCode: (state, action) => {
            state.Otp = action.payload
        },
    }

})

export const {increment, decrement, addCart, removeCart, OtpCode} = counterSlice.actions;

export default counterSlice.reducer