import React, { useState } from 'react';
import './CartItem.css';
import ProductQty from '../ProductQty/ProductQty';
import { useDispatch } from 'react-redux';
import { removeCart, updateCart } from '../../feadured/Cart';



function CartItem({cartItem, Qty}) {
  const {id, title, thumbnail, price, description, quantity} = cartItem; 
  const [qty,setQty] = useState(quantity);
  const dispatch = useDispatch()

const handleRemove = (id) => {
  if (id){
    dispatch(removeCart(id))
  }
 
}
const handleUpdate = (qty) => {
  setQty(qty)
  dispatch(updateCart({id:id, qty:qty}))

}

  
  return (
    <>
    <div className="cart-list-content">
           <div className="cart-list-item">
           
            <div className="item-title" value={id}>
          
              <img src={thumbnail} alt="" />
            
              <span>{title}</span>
            </div>
            <div className="item-price">
              <span>{price}</span>
            </div>
            <div className="item-qty">
              <ProductQty  quantity={qty} setQuantity={handleUpdate}/>
            </div>
            <div className="item-total-price">
              <h3>{price}</h3>
            </div>
            <div className="item-remove">
              <span onClick={() => handleRemove(id)}><i style={{cursor:"pointer"}} className="fa fa-close"></i></span>
            </div>
           </div>
           
          </div>
    
      
    </>
  )
}

export default CartItem
