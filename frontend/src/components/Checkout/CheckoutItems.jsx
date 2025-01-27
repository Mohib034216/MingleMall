import React from 'react'
import { useSelector } from 'react-redux'
import ProductQty from '../ProductQty/ProductQty'



function CheckoutItems() {
  const { cartItems} = useSelector(state => state.cart)
  // console.log(cartItems)
  return (
    <>
    <div className="checkout-items">

    {
                cartItems.map((item)=> 
                  
                  
        <div className="product-order-card">
        <img
          src="https://via.placeholder.com/100" // Replace with actual product image
          alt="Product"
          className="product-image"
          />
        <div className="product-info">
          <p className="product-title">
        
            {item.product.title}
          </p>
          <p className="product-details">color-size: {item.variant && item.variant.title}</p>
          {/* <p className="product-stock">
            <span className="stock-warning">Only 2 item(s) in stock</span>
          </p> */}
        </div>
        <div className="product-pricing">
          <p className="product-price">Rs. {item.variant ? item.variant.sale_price : item.price}</p>
          <p className="product-discount">
            
            <strike>Rs. {item.variant && (Math.abs(item.variant.regular_price - item.variant.sale_price) / (item.variant.regular_price + item.variant.sale_price / 2)  * 100).toFixed(2)}</strike> <span className="discount-percentage">-75%</span>
          </p>
        </div>
      </div>

                   
                )
                
                } 

    </div>
      
    </>
  )
}

export default CheckoutItems
