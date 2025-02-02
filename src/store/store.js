import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { authSlice } from "./auth/authSlice";
import { revistaSlice } from "./revista/revistaSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: revistaSlice.reducer,
        uid: uiSlice.reducer
        
    }
})