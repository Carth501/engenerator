import { createSlice } from '@reduxjs/toolkit'

export const numsSlice = createSlice({
    name: 'nums',
    initialState: {
        shopData: []
    },
    reducers: {
        setNums: (state, action) => {
            state.shopData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setNums } = numsSlice.actions

export default numsSlice.reducer