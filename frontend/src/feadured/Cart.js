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
            get_item(state,action){
                console.log(action.payload.sku);
                
                // axios(`http://localhost:8000/products/${action.payload.id}`).then(response =>{
      
                //     const product = response.data
                //     if (product.variants.some( variant =>  variant.sku === action.payload.sku )) {
                //       const getVariantBySku =  product.variants.find(variant => variant.sku === action.payload.sku);
                //       console.log(getVariantBySku);
                //       return {product:product,variant:getVariantBySku};
                //     }
                //     return product
              
                //   }).catch(error => {
                //     console.error("There was an error fetching the product!", error);
                //       })

            },
            
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
                const  cartItem = state.cartItems.find(item => item.sku === action.payload.sku);
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

export const {addToCart,removeCart, calTotal,updateCart,get_item} = cartSlice.actions;
export default cartSlice.reducer;