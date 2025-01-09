import React, { useEffect } from 'react'
import "./Address.css"
import { useDispatch, useSelector } from 'react-redux';
import {AddressListAction} from "../../feadured/Auth"


function AddressList() {
  const  dispatch = useDispatch();
  
  const {userInfo, AddressBook} = useSelector(state => state.auth);
  // console.log(userInfo)
  useEffect(() => {
    dispatch(AddressListAction(userInfo));
  },[]);
  // console.log(AddressBook)
  
  return (
    <div className='address-list'>
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

export default AddressList
