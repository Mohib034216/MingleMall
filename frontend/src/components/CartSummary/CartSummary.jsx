import React from 'react'
import './CartSummary.css';
import { useSelector } from 'react-redux';
import { calTotal } from '../../feadured/Cart';
import { useNavigate } from 'react-router-dom';



function CartSummary() {
    // const {qty} = useSelector((state) => {state.cart});
    const {total, quantity} = useSelector((state) => state.cart);
    const shipping = 100 ; 
    const navigate = useNavigate();

    const handleClick = () => {
      return navigate('/checkout');
    }
    if(quantity === 0){
      return <h1>Cart is Empty</h1>

    }
  return (
    
          <div className="cart-summary-content">
         
             <div className="cart-subtotal">
              <h3>Subtotal</h3>
              <h3>${(total).toFixed(2)}</h3>
             </div>
              
             <div className="cart-shipping">
              <h3>Shipping</h3>
              <h3>${shipping}</h3>
             </div>
             <hr />
             <div className="cart-total">
              <h3>Total</h3>
              <h3>${(total + shipping).toFixed(2)}</h3>
             </div>
              
          <div className="checkout-btn">
            <button onClick={handleClick} className='checkout-btn'>Checkout</button>
          </div>
          
          
          </div>


  )
}

export default CartSummary
