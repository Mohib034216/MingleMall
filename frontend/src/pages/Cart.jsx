import {React} from 'react'
import { Breadcrumb, CartSummary } from '../components'
import CartList from '../components/CartList/CartList';



function Cart() {
  
  
  return (
    <>
      <Breadcrumb label={'Cart'} path={'/cart'} />
      
       
    
    <div className='cart'>
    
        <CartList />

    <div className='cart-summary'>

        <CartSummary />
    </div>
    </div>
    </>

  )
}

export default Cart
