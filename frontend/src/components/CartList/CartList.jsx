import React from 'react';
import './CartList.css';
import CartItem from '../CartItem/CartItem';
import { useSelector } from 'react-redux';



function CartList() {
  const {cartItems } = useSelector((state)=>(state.cart));
  return (
    <>
    <div className="cart-list">
          <div className="cart-list-head">
          <h3>Products</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
          <h3>Total</h3>
          <h3>Remove</h3>
          </div>
          

        {    
      
        cartItems.map(
            (item)=>{
                return < CartItem key={item.id} cartItem={item}/>
            }

        )
        }
        </div>
    </>
  )
}

export default CartList
