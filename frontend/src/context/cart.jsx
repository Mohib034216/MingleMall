import {React, useState, createContext} from 'react'

const CartContext = createContext();

function CartProvider({ children }) {
    
    
    const [cart,setCart] = useState([]);
    function addToCart(item) {
        setCart([...cart, item]);
      }

    function removeFromCart(item) {
        setCart(cart.filter(i => i.id !== item.id));
    }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
    {children}
  </CartContext.Provider>
  )
}

export default CartProvider
