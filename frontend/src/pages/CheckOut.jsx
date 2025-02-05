import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import AddressList from '../components/Address/AddressList';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import CheckoutItems from '../components/Checkout/CheckoutItems';
import axios from 'axios';




function CheckOut() {
    const {quantity} = useSelector(state => state.cart)
   
  
    if(quantity === 0){
        toast.warning('Cart is Empty');
        return <Navigate to={"/cart"} replace={true}/>
        
    }
    if(!localStorage.getItem('token')){ 
        toast.warning("Login Required")
        return <Navigate to={"/login"} replace={true}/>
    }
        
  return (
    <>
    {/* <div className="checkout"> */}
    <div className="checkout-page">
      {/* Left Section */}
      <div className="left-section">
      <AddressList/>
     
          <CheckoutItems/>
         
      </div>

      {/* Right Section */}
      <div className="right-section">
      
       
          <CheckoutSummary/>  
      </div>
    </div>
      
       
      
      {/* <button onClick={()=>{alert("chalgaya")}}>Proceed to Pay</button>
    </div> */}
    </>
  )
}

export default CheckOut
