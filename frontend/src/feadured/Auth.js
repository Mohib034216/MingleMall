import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";


const initialState = {
    userInfo: localStorage.getItem('email')  ? localStorage.getItem('email') :  null,
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


        }
    }
})

export  const {loginSuccess, logoutUser} = authSlice.actions;
export default authSlice.reducer;