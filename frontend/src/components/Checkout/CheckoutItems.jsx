import React from 'react'
import { useSelector } from 'react-redux'
import ProductQty from '../ProductQty/ProductQty'



function CheckoutItems() {
  const { cartItems} = useSelector(state => state.cart)
  return (
    <>
    <div className="checkout-items">

    {
                cartItems.map((item)=>                  

                     <table class='order-table'>
        
          <tbody>
            <tr>
              <td><img width={200} height={200} src='https://dl.dropboxusercontent.com/s/qbj9tsbvthqq72c/Vintage-20L-Backpack-by-Fj%C3%A4llr%C3%A4ven.jpg' class='full-width'></img>
              </td>
              <td>
                <br/> <span class='thin'>{item.product.title.slice(0,25)+'...'}</span>
                <br/>Vintage Backpack<br/> <span class='thin small'> Color: Olive, Size: 20L qty: {item.quantity}</span>
              </td>
              <td>
                <div class='price'>${item.price}</div>
              </td>
            </tr>
          </tbody>
        </table>

                  // <span><img src={item.product.img} alt={item.product.img} /> </span>
                  
                )
                
                } 

    </div>
      
    </>
  )
}

export default CheckoutItems
