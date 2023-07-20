import { configureStore } from "@reduxjs/toolkit";
import homeReducers from "./features/homeReducers";
import msfUserReducer from "./features/msfUserReducer";



export const store =configureStore({
    reducer:{
        home:homeReducers,
        msfUser:msfUserReducer
    }
})