import React, { useEffect, useState } from 'react';
import './CartItem.css';
import ProductQty from '../ProductQty/ProductQty';
import { useDispatch } from 'react-redux';
import { removeCart, updateCart, get_item } from '../../feadured/Cart';

import axios from 'axios';
import { useParams } from 'react-router-dom';



function CartItem({cartItem, Qty}) {
  // const params = useParams();
  // const id = params.id;
  // const {id, title, thumbnail, price, description, quantity} = cartItem;
  
  const {id, quantity, sku} = cartItem; 
  const [qty,setQty] = useState(quantity);
  const [product,setProduct] = useState()
  const [variant,setVariant] = useState(undefined)

  const dispatch = useDispatch()
  useEffect(()=>{
    axios(`http://localhost:8000/products/${id}`).then(response =>{
      
      setProduct(response.data)
      if (product.variants.some( variant =>  variant.sku === sku )) {
        const getVariantBySku =  product.variants.find(variant => variant.sku === sku);
        setVariant(getVariantBySku);
      
      }

    }).catch(error => {
      console.error("There was an error fetching the product!", error);

    });
  });
 
console.log(dispatch(get_item(id,sku)));
  
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
              <h3>{product?.price}</h3>
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
