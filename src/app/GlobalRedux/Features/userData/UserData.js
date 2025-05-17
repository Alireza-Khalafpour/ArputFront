import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const UserDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.value = action.payload
    },
    removeData: (state) => {
      state.value = {}
    },
  },
})


export const { setData, removeData } = UserDataSlice.actions

export default UserDataSlice.reducer