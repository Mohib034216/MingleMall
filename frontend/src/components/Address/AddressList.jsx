import React, { useEffect, useRef } from 'react'
import "./Address.css"
import { useDispatch, useSelector } from 'react-redux';
import {AddressListAction} from "../../feadured/Auth";
import  AddressForm from "../Address/AddressForm";


function AddressList() {
  const  dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleAddressChange  = () => {
    if(inputRef.current){
      inputRef.current.focus();

    }
  }

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
          <a
              type="a"
              className="address-list-title-edit"
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
              onClick={handleAddressChange}
            >
              Edit
            </a>
          {/* <a onClick={handleAddressChange} className='address-list-title-edit'>Edit</a> */}

      </div>
      <div className="address-list-info">
        <span className='address-list-tag-label'>{AddressBook['Shipping'] && AddressBook['Shipping'].label}</span>
        <span className='address-list-line'>{AddressBook['Shipping'] && AddressBook['Shipping'].address}</span>
      </div>
      {/* <!-- Modal --> */}
<div class="modal fade" id="addressModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      
    </div>
    
  )
}
else{
  return <AddressForm/>
}
}

export default AddressList
