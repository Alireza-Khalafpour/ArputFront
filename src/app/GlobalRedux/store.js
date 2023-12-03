'use client'

import {configureStore} from "@reduxjs/toolkit"
import CounterSlice from "./Features/counter/CounterSlice"

export const store = configureStore({
    reducer:{
        counter: CounterSlice
    }
})