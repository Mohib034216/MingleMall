import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    cartItems:[],
    quantity:0,
    total: 0,
    isLoading:true,

}

const cartSlice = createSlice(
    {
        name:'cart',
        initialState,
        reducers:{
            
            qtyTotal(state){
                const qty = state.cartItems
                return qty
                
            },

            calTotal(state){
            
                let qty = 0;
                let total = 0;
                
                state.cartItems.forEach(item =>{
                    qty  += item.quantity;
                    total += item.quantity * item.price
                });
                state.quantity = qty;
                state.total = total;
                



            },
            addToCart(state,action){
                const  cartItem = state.cartItems.find(item => item.id === action.payload.id);
                if(!cartItem){
                   state.cartItems.push(action.payload);                    
                }
                else{
                    cartItem.quantity += action.payload.quantity;
                } 
                cartSlice.caseReducers.calTotal(state);
                toast.success('Product added to the cart!');
                
            },
            removeCart(state,action){
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                cartSlice.caseReducers.calTotal(state);
                toast.success('Product remove to the cart!');

            },
            updateCart(state,action){
                const {id, qty} = action.payload
    
                const itemIndex = state.cartItems.findIndex((item) => item.id === id)
                if (itemIndex !== -1){
                    state.cartItems[itemIndex].quantity = qty
                    
                }
                cartSlice.caseReducers.calTotal(state);                    
                toast.success('Product update to the cart!');
                
                 

            },
           
        },
    }
)

export const {addToCart,removeCart, calTotal,updateCart} = cartSlice.actions;
export default cartSlice.reducer;