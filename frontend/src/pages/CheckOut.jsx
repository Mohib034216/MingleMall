import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

function CheckOut() {
    const {quantity} = useSelector(state => state.cart)
    // if(quantity === 0){
    //     toast.warning('Cart is Empty');
    //     return <Navigate to={"/cart"} replace={true}/>
        
    // }
    if(!localStorage.getItem('token')){
        toast.warning("Login Required")
        return <Navigate to={"/login"} replace={true}/>
    }
        
  return (
    <>
     <CheckoutForm/>   
    </>
  )
}

export default CheckOut
