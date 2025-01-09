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

  useEffect(()=>{
    // axios(`http://127.0.0.1:8000/products/by_sku/?sku=${variant?variant.sku:product.sku}`).then(response =>{
      
      // setProduct(response.data)
      // if (product.variants.some( variant =>  variant.sku === product.sku )) {
      //   const getVariantBySku =  product.variants.find(variant => variant.sku === product.sku);
      //   setVariant(getVariantBySku);
      
      // }

    // }).catch(error => {
    //   console.error("There was an error fetching the product!", error);
        // })
    })



  const handleCheckboxChange = () => {
      setUseSameAddress(!useSameAddress);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 100;
  const total = subtotal + shipping ;


  return (
    <>

            <div className="checkout-summary">
                <h3>Order Summary</h3>
                
              
                    <div className="sub-total">Subtotal <span>${subtotal.toFixed(2)}</span></div>
                    <div className="total">Total <span>${total.toFixed(2)}</span></div>
                </div>
        
    
    </>
  );
};

export default CheckoutSummary;