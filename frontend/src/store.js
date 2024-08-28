import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feadured/Cart"
import authReducer from "./feadured/Auth"

export const store = configureStore(
    {
        reducer:{
            cart:cartReducer,
            auth:authReducer
        },
    }
);