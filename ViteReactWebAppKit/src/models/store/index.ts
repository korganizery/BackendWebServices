import { configureStore } from '@reduxjs/toolkit'
import * as rootSlices from '../slices'

export default configureStore({
    reducer: {
        counter: rootSlices.counterSlice.reducer,
    },
})