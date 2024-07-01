import { configureStore } from '@reduxjs/toolkit'
import numsReducer from '../features/nums'

export default configureStore({
    reducer: {
        nums: numsReducer,
    },
})