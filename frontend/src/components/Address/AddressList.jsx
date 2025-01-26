import React, { useEffect, useRef, useState } from 'react'
import "./Address.css"
import { useDispatch, useSelector } from 'react-redux';
import {AddressListAction} from "../../feadured/Auth";
import  AddressForm from "../Address/AddressForm";
import Modal from '../Modal/Modal';
// import axios from 'axios';



function AddressList() {
  const  dispatch = useDispatch();
  const {userInfo, AddressBook} = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  
  const handleShowAddressList = () => {
    setModalTitle(
      <>
      <div className="modal-title">
      <h3>List Address</h3>
      <a className="address-list-title-edit" onClick={handleShowAddressForm}>
        Add Address
      </a>
      </div>
      </>
    )

    setModalContent(
    
      AddressBook.map((address, index) => {
        return(
        <div key={index} className="address-list-info">
        <span className='address-list-tag-label'>{address && address.label}</span>
        <span className='address-list-line'>{address && address.address}</span>
      </div>

        )
      })
    //    AddressBook['Shipping'] && AddressBook['Shipping'].label ?
    //    <div className="address-list-info">
    //    <span className='address-list-tag-label'>{AddressBook['Shipping'] && AddressBook['Shipping'].label}</span>
    //    <span className='address-list-line'>{AddressBook['Shipping'] && AddressBook['Shipping'].address}</span>
    //  </div>
        // :
        // <></>
    );
    setIsModalOpen(true);
  };

  const handleShowAddressForm = () => {
    

    setModalTitle("Add Address")
    setModalContent(
     <AddressForm/>
    );
    setIsModalOpen(true);
  };
  

  // console.log(userInfo)
  useEffect(() => {
    dispatch(AddressListAction(userInfo));
  },[]);
  // console.log(AddressBook[0].full_name)
  if( AddressBook[0]){

    
    return (
      <div className='address-list'>
        <h1>Delivery Information</h1>
      <div className="address-list-title">
          <p className='address-list-title-txt'>Shipping & Billing</p>
          {/* <a
              type="a"
              className="address-list-title-edit"
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
              onClick={handleAddressChange}
            >
              Edit
            </a> */}
            {/* Edit Button */}
      <a className="address-list-title-edit" onClick={handleShowAddressList}>
        Edit
      </a>
          {/* <a onClick={handleAddressChange} className='address-list-title-edit'>Edit</a> */}

      </div>
      {AddressBook.map((address, index) => {
        if (address.is_shipping === true) {
          return (
            <div key={index} className="address-list-info">
              <span className="address-list-tag-label">{address.label}</span>
              <span className="address-list-line">{address.address}</span>
            </div>
          );
        }
        return null; // Skip rendering for non-shipping addresses
      })}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle ? modalTitle : ""}
      >
        {modalContent}
      </Modal>

    
      
    </div>
    
  )
}
else{
  return <AddressForm/>
}
}

export default AddressList
