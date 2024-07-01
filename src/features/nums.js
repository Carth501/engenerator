import { createSlice } from '@reduxjs/toolkit'

export const numsSlice = createSlice({
    name: 'nums',
    initialState: {
        value: 0,
        shop: []
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        setNums: (state, action) => {
            state.shop = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setNums } = numsSlice.actions

export default numsSlice.reducer