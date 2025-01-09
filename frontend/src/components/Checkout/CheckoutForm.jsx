import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css'
import axios from 'axios';

const CheckoutForm = () => {
  const { cartItems} = useSelector(state => state.cart)
  const {id, quantity, sku} = cartItems; 
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [product,setProduct] = useState()
  const [variant,setVariant] = useState(undefined)
  console.log(cartItems)
  useEffect(()=>{
    axios(`http://localhost:8000/products/${id}`).then(response =>{
      
      setProduct(response.data)
      if (product.variants.some( variant =>  variant.sku === sku )) {
        const getVariantBySku =  product.variants.find(variant => variant.sku === sku);
        setVariant(getVariantBySku);
      
      }

    }).catch(error => {
      console.error("There was an error fetching the product!", error);
        })
    })



  const handleCheckboxChange = () => {
      setUseSameAddress(!useSameAddress);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 100;
  const total = subtotal + shipping ;


  return (
    <>
    <div className="checkout">

    <div className="checkout-container">
            <div className="form-container">
                <h2>Checkout</h2>

                <div className="form-section">
                    <h3>Shipping Address</h3>
                    <form>
                        <div className="input-group">
                            <label htmlFor="shipping-name">Full Name</label>
                            <input type="text" id="shipping-name" placeholder="John Doe" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="shipping-address">Address</label>
                            <input type="text" id="shipping-address" placeholder="1234 Main St" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="shipping-city">City</label>
                            <input type="text" id="shipping-city" placeholder="New York" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="shipping-state">State</label>
                            <input type="text" id="shipping-state" placeholder="NY" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="shipping-zip">Zip</label>
                            <input type="text" id="shipping-zip" placeholder="10001" required />
                        </div>
                    </form>
                </div>

                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="same-address" 
                        checked={useSameAddress} 
                        onChange={handleCheckboxChange} 
                    />
                    <label htmlFor="same-address">Billing address same as shipping</label>
                </div>

                {!useSameAddress && (
                    <div className="form-section">
                        <h3>Billing Address</h3>
                        <form>
                            <div className="input-group">
                                <label htmlFor="billing-name">Full Name</label>
                                <input type="text" id="billing-name" placeholder="John Doe" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="billing-address">Address</label>
                                <input type="text" id="billing-address" placeholder="1234 Main St" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="billing-city">City</label>
                                <input type="text" id="billing-city" placeholder="New York" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="billing-state">State</label>
                                <input type="text" id="billing-state" placeholder="NY" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="billing-zip">Zip</label>
                                <input type="text" id="billing-zip" placeholder="10001" required />
                            </div>
                        </form>
                    </div>
                )}

                <button type="submit" className="btn">Place Order</button>
            </div>

            <div className="cart-summary">
                <h3>Cart Summary</h3>
                <ul>
                {
                cartItems.map((item)=>


                  <li>{item.product.title.slice(0,25)+'...'}({item.quantity}) <span>${item.price}</span></li>
                )
                
                } 
                    {/* <li>Item 2 <span>$15.00</span></li>
                    <li>Item 3 <span>$20.00</span></li> */}
                    <li className="total">Subtotal <span>${subtotal.toFixed(2)}</span></li>
                    <li className="total">Total <span>${total.toFixed(2)}</span></li>
                </ul>
            </div>
        </div>
    </div>
    
    </>
  );
};

export default CheckoutForm;