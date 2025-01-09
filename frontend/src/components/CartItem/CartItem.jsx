import React, {  useState } from 'react';
import './CartItem.css';
import ProductQty from '../ProductQty/ProductQty';
import { useDispatch, useSelector } from 'react-redux';
import {  updatefetchCart,  removefetchCart } from '../../feadured/Cart';



function CartItem({cartItem, Qty}) {
  const { id,quantity, product,variant} = cartItem; 
  const {userInfo } = useSelector((state)=>(state.auth));
  const [qty,setQty] = useState(quantity);
  const dispatch = useDispatch()

const handleRemove = (sku) => {
  if (sku){
    dispatch(removefetchCart({sku, userInfo}))
  }
}
const handleUpdate = (qty) => {
  setQty(qty)
  dispatch(updatefetchCart({email:userInfo,sku:variant?variant.sku:product.sku, qty:qty}))

}
 
  return (
    <>
    <div className="cart-list-content">
           <div className="cart-list-item">
           
            <div className="item-title" value={id}>
          
              {/* <img width={70} height={70} src={product?.thumbnail} alt="" /> */}
              <p>
              
              { 
 
                  product?.title.length > 20 ?`${product?.title.slice(0, 17)}...`: product?.title
              }
              <br/>
              
                {  
                  variant &&  `(${ variant?.title})`
                  
                }
                  
              
              </p>
              
            </div>
            <div className="item-price">
              <p>{product?.price}</p>
            </div>
            <div className="item-qty">
              <ProductQty  quantity={qty} setQuantity={handleUpdate}/>
            </div>
            <div className="item-total-price">
              <h3>{(quantity * product?.price).toFixed(2)}</h3>
            </div>
            <div className="item-remove">
              <span onClick={() => handleRemove(variant?variant.sku:product.sku)}><i style={{cursor:"pointer"}} className="fa fa-close"></i></span>
            </div>
           </div>
           
          </div>
    
      
    </>
  )
}

export default CartItem
