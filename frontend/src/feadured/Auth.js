import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import axios from "axios"


const BASE_URL = "http://localhost:8000/user/"
export const AddressListAction = createAsyncThunk('auth/AddressList', async (userId) => {
    const response = await axios.get(`${BASE_URL}addressbook/${userId}`);
    console.log(response.data)
    return response.data;
})



const initialState = {
    userInfo: localStorage.getItem('email')  ? localStorage.getItem('email') :  null,
    AddressBook:{},
    userToken: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),

};
 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            state.isAuthenticated = true;
            state.userInfo = action.payload.email ;
            state.userToken = action.payload.token ;
            if(state.userToken){
                localStorage.setItem('token', action.payload.token); 
                localStorage.setItem('email', action.payload.email); 
                toast.success('Login Successfull'); 
            }
        },
        logoutUser:(state) => {

            if(state.userToken){
                state.isLoggedIn = false;
                state.userId = false;
                localStorage.removeItem('token'); 
                localStorage.removeItem('email'); 
                // toast.success('Logout Successfull')
                return <Navigate to="/login" />
            }


        },
    },
    extraReducers: (builder) => {
            builder
                .addCase(AddressListAction.pending, (state, action) => {
                // state.status = 'loading';
                // state.product = null;
                // state.error = null;
                console.log(action.payload)

                })
                .addCase(AddressListAction.fulfilled, (state, action) => {
                // state.status = 'succeeded';
                state.AddressBook['Billing'] = action.payload.billing;
                state.AddressBook['Shipping'] = action.payload.shipping;
                console.log(action.payload.billing)
                console.log(state.AddressBook)
                })
                .addCase(AddressListAction.rejected, (state, action) => {
                // state.status = 'succeeded';
                // state.useraddress = action.payload;
                console.log(action.payload)
                })
        // .addCase(AddressListAction.failed,(state, action) => {
        //    console.log('FAILED')
        // })
    },
})

export  const {loginSuccess, logoutUser} = authSlice.actions;
export default authSlice.reducer;