import {React,useState} from 'react'
import './ProductQty.css'



function ProductQty({quantity, setQuantity}) {
    
   
    const handleIncrease = () => {
      setQuantity(quantity + 1);
  
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        
      }

    }

    return (
    <>
       <div className="item-qty">
              <span onClick={handleDecrease}>-</span>
                <input  disabled value={quantity} type="text" />
              <span onClick={handleIncrease}>+</span>
        </div>
              
    </>
  )
}

export default ProductQty
