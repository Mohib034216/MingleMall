import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const CheckoutSummary = () => {
  const { cartItems} = useSelector(state => state.cart)
  const { userInfo} = useSelector(state => state.auth)
  const {id, quantity, product,variant} = cartItems; 
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
 
  const [promoCode, setPromoCode] = useState("");

  const handlePromoChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoApply = () => {
    alert(`Promo Code "${promoCode}" applied!`);
  };



    const handleProceedToPay = async () => {
      // var data = cartItems
      try {
        // Create Order in Backend
        const response = await axios.post(`http://localhost:8000/orders/place-order/`, {cart:cartItems,customer:userInfo});

        setOrderId(response.data.id);
        navigate(`/payment-method?order_id=${response.data.id}`);
      } catch (error) {
        console.error("Order Placement Error:", error);
        alert("Failed to place order. Please try again.");
      }
      
    };
 

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const qty = cartItems.reduce((total, product) => total + product.quantity, 0);
  const shipping = 100;
  const total = subtotal + shipping ;


  return (
    <div className="checkout-summary">

        <div className="promotion">
          <h3>Promotion</h3>
          <input
            type="text"
            placeholder="Enter Store Code"
            value={promoCode}
            onChange={handlePromoChange}
          />
          <button onClick={handlePromoApply}>APPLY</button>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Items Total ({qty} items)</span>
            <span>Rs. 775</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>Rs. 979</span>
          </div>
          <div className="summary-item">
            <span>Delivery Discount</span>
            <span>-Rs. 979</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>Rs. 775</span>
          </div>
          <button className="proceed-button" onClick={handleProceedToPay}>
            Proceed to Pay
          </button>
        </div>  
      </div>
  );
};

export default CheckoutSummary;