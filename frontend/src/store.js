import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feadured/Cart"
import authReducer from "./feadured/Auth"
// import productReducer from "./feadured/Product"

export const store = configureStore(
    {
        reducer:{
            cart:cartReducer,
            // product:productReducer,
            auth:authReducer
        },
    }
);