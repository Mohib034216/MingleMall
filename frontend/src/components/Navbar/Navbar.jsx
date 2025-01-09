import {React, useEffect, useState} from 'react';
import './Navbar.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../../feadured/Auth';
import { toast } from 'react-toastify';
import { fetchCart } from '../../feadured/Cart';
// import { fetchProductBySku } from '../../feadured/Product';




function Navbar() {
  const {quantity,cartItems} = useSelector((state) => state.cart)
  // const {product_sku,variant_sku} = cartItems
  const [Menu,setMenu] = useState('Home');
  const  {isAuthenticated, userInfo}  = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cartItems.map((item)=>{console.log(item.product)})
  // console.log(cartItems)
  // if(product_sku){

  //   console.log(product_sku)
  // }

  useEffect(
    () => {
      if(userInfo){
        dispatch(fetchCart(userInfo));
            
      }
      
    },[])
    
  // useEffect(
  //   () => {
  //     if(userInfo){
  //         // dispatch(fetchProductBySku(variant_sku?variant_sku:product_sku))
  //         // cartItems.forEach((item)=>{ dispatch(fetchProductBySku(item.variant_sku?item.variant_sku:item.product_sku))})
        
        
  //     }
      
  //   },[])
    


  const handleLogout = () => {
    // Logout logic here
    // ...
    dispatch(logoutUser())
    // Navigate to login page
    navigate('/login', { replace: true });

    // Display success toast message
    toast.success('You have been logged out successfully!');
    
  };


  return (
    <nav>
    <div className='navbar-main'>
        <div className='navbar-Logo'>
         <h1 className='navbar-logo-txt'><span>.</span>Store</h1>
        </div>
        
            <ul className='navbar-menu'>
                <li onClick={() => {setMenu('Home')}}><Link  to={'/'}>Home</Link> {Menu === 'Home' ?  <hr />:<></>} </li>
                <li onClick={() => {setMenu('Shop')}}><Link  to={'/shop'}>Shop</Link> {Menu === 'Shop' ?  <hr />:<></>} </li>
                <li onClick={() => {setMenu('Contact')}}><Link  to={'/Contact'}>Contact</Link>  {Menu === 'Contact' ?  <hr />:<></>}</li>
            </ul>
            <div className='navbar-login-cart'>
              {(isAuthenticated)
              ?
                <div class="dropdown">
                  <button class="dropbtn">{userInfo}</button>
                  <div class="dropdown-content">
                  <Link  onClick={handleLogout} ><button className='navbar-logout-btn'>Log Out </button></Link>
                  </div>
                </div>

              :
                <Link  onClick={() => {setMenu('login')}} to={'/login'}><button className='navbar-login-btn'>Log In </button></Link>
              }
              <div className="navbar-cart">
                <Link  to={'/cart'}>
                  <span  className='navbar-cart-bag'> <i className='fa fa-shopping-bag'></i></span>
                  <span className='navbar-cart-counter'>{quantity}</span>
                </Link>
              </div>
            </div>
        
            <Outlet />
    </div>
    </nav>
  )
}

export default Navbar
