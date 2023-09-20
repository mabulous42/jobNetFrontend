import { configureStore } from "@reduxjs/toolkit";
import CurrentUserSlice from "./StateManagement/CurrentUserFetch"


export const store = configureStore({
    reducer: {
       CurrentUserSlice 
    }
})