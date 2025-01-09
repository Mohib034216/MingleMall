import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import {loginSuccess} from '../feadured/Auth'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'



function LoginSignup() {
  const [user,setUser]  = useState([])
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repassword,setRepassword] = useState('')
  const dispatch = useDispatch()
  const {userToken} = useSelector((state)=>(state.auth))
  
  const signuphandleSubmit = (event) => {
    event.preventDefault();
   
    if (password !== '' && email !== ''){
      if (password === repassword){
                
        axiosInstance.post('http://localhost:8000/user/register/',{
          email: email,
          username: username,
          password: password,
         
        })
        .then(response => {
          setUser(response.data);
          toast.success("User Successfully Registered");  
        })
        .catch(error => {
          toast.error(`Registeration failed! Something is wrong ${error}` );  

           });
      }

      }
  }
    

  const signinhandleSubmit = (event) => {
    event.preventDefault();
   
    if (password !== '' && email !== ''){
 
      axiosInstance.post('/user/login/', {
        email: email,
        password: password
      })
     .then(response => {
    
      setUser(response.data);
      console.log(userToken);

      dispatch(loginSuccess(response.data))
      })
     .catch(error => {
        console.error(error);
      });
    }
  };

  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }
  


  return (
    <div className='LoginSignup'>
       
      <div className='form'>

        {/* <!-- Login Form --> */}

        <div className="container">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={signinhandleSubmit} id="login-form">
              <input type="text" id="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}  />
              <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
              <button type="submit">Login</button>
              {/* <p>Don't have an account? <a href="#" id="signup-link">Sign up</a></p> */}
            </form>
          </div>
        </div>

          {/* <!-- Signup Form --> */}
          <div className="container">
            <div className="form-container">
              <h2>Sign up</h2>
              <form onSubmit={signuphandleSubmit} id="signup-form" >
                <input type="text" id="name" placeholder="Name" onChange={(e)=> setUsername(e.target.value)} required />
                <input type="email" id="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required />
                <input type="password" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
                <input type="password" id="confirm-password" placeholder="Confirm Password" onChange={(e)=> setRepassword(e.target.value)} required />
                <button type="submit">Sign up</button>
                {/* <p>Already have an account? <a  id="login-link">Login</a></p> */}
              </form>
            </div>
          </div>
            </div>
              
    </div>
  )
}

export default LoginSignup
