import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css'
import axios from 'axios';

const CheckoutSummary = () => {
  const { cartItems} = useSelector(state => state.cart)
  const {id, quantity, product,variant} = cartItems; 
  const [useSameAddress, setUseSameAddress] = useState(true);
  // const [product,setProduct] = useState()
  // const [variant,setVariant] = useState(undefined)
  console.log(cartItems)
  const [promoCode, setPromoCode] = useState("");

  const handlePromoChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoApply = () => {
    alert(`Promo Code "${promoCode}" applied!`);
  };



    const handleProceedToPay = () => {
      alert("Proceeding to payment...");
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