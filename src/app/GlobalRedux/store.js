"use client";

import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./Features/counter/CounterSlice";
import UserDataSlice from "./Features/userData/UserData";

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    userData: UserDataSlice,
  },
});
