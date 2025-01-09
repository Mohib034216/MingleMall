import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = 'http://127.0.0.1:8000/cart';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    const response = await axios.get(`${BASE_URL}/email/${userId}/`);
    
    return response.data;
});

export const addToCartAction = createAsyncThunk('cart/addToCartAction',
    async ({userInfo,product},thunkAPI) => {
        if(userInfo){
            product['customer'] = userInfo
            try{
                const response = await axios.post(`${BASE_URL}/add/`,product)
                return response.data
                
            }
            catch(error){
                return thunkAPI()
            }
        }
        else{
            return product
        }

});

export const updatefetchCart = createAsyncThunk('cart/UpdateToCartAction',
    async ({email,sku,qty},thunkAPI) => {
       if(email){

       
        try{
            const response = await axios.put(`${BASE_URL}/item/update/${email}/`, { qty, sku })
            console.log(response)
            return response.data
            
        }
        catch(error){
            return thunkAPI()
        }
        }
        else{
            return {sku,qty}
        }

});



export const removefetchCart = createAsyncThunk('cart/removefetchCart', async ({sku, userInfo}) => {
    // const {userInfo} = useSelector((state) => (state.auth));
    console.log(sku);
    console.log(userInfo);
    const response = await axios.delete(`${BASE_URL}/item/delete/`, {data: { sku , userInfo},});
    // const response = await axios.get(`${BASE_URL}/email/${userId}/`);
    console.log(response)
    return response.data;
  });
  


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
                const  cartItem = state.cartItems.find(item => item.sku === action.payload.sku);
                if(!cartItem){
                   state.cartItems.push(action.payload);                    
                }
                else{
                    cartItem.quantity += action.payload.quantity;
                } 
                console.log(state.cartItems)
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
        extraReducers:(builders)=>{
            builders
            .addCase(fetchCart.fulfilled,(state,action)=>{
                // state.cartItems = action.payload[0].items
                // cartSlice.caseReducers.addToCart(state,action.payload[0].items)
                if(action){
                    state.cartItems = action.payload.items
                    cartSlice.caseReducers.calTotal(state);
                    
                }
           
            })
            .addCase(removefetchCart.fulfilled,(state,action)=>{
                if(action){
                    state.cartItems = action.payload.items
                    cartSlice.caseReducers.calTotal(state);
              
                }
                toast.success('Product Remove to the cart!');
           
            })
            .addCase(addToCartAction.fulfilled,(state,action)=>{
             
                if(action){
                    state.cartItems = action.payload.items
                    cartSlice.caseReducers.calTotal(state);
              
                }
                toast.success('Product added to the cart!');
                
           
            })
            .addCase(updatefetchCart.fulfilled,(state,action)=>{
             
                if(action){
                    state.cartItems = action.payload.items
                    cartSlice.caseReducers.calTotal(state);
              
                }
                toast.success('Product Updated to the cart!');
                
           
            })

        }

    }
)

export const {addToCart,removeCart, calTotal,updateCart,get_item} = cartSlice.actions;
export default cartSlice.reducer;