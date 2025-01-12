import React, { useEffect } from 'react'
import "./Address.css"
import { useDispatch, useSelector } from 'react-redux';
import {AddressListAction} from "../../feadured/Auth";
import  AddressForm from "../Address/AddressForm";


function AddressList() {
  const  dispatch = useDispatch();
  
  const {userInfo, AddressBook} = useSelector(state => state.auth);
  // console.log(userInfo)
  useEffect(() => {
    dispatch(AddressListAction(userInfo));
  },[]);
  // console.log(AddressBook)
  if( AddressBook['Shipping'] && AddressBook['Shipping'].label){

    
    return (
      <div className='address-list'>
        <h1>Delivery Information</h1>
      <div className="address-list-title">
          <p className='address-list-title-txt'>Shipping & Billing</p>
          <a className='address-list-title-edit'>Edit</a>

      </div>
      <div className="address-list-info">
        <span className='address-list-tag-label'>{AddressBook['Shipping'] && AddressBook['Shipping'].label}</span>
        <span className='address-list-line'>{AddressBook['Shipping'] && AddressBook['Shipping'].address}</span>
      </div>
      
    </div>
  )
}
else{
  return <AddressForm/>
}
}

export default AddressList
