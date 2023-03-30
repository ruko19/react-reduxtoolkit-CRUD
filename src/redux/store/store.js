import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../features/userSlice.js/userSlice"
export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
})