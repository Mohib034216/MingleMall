import React, { useEffect, useRef, useState } from 'react'
import "./Address.css"
import { useDispatch, useSelector } from 'react-redux';
import {AddressListAction} from "../../feadured/Auth";
import  AddressForm from "../Address/AddressForm";
import Modal from '../Modal/Modal';



function AddressList() {
  const  dispatch = useDispatch();
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
    console.log(AddressBook && AddressBook)

    setModalContent(
      
       AddressBook['Shipping'] && AddressBook['Shipping'].label ?
       <div className="address-list-info">
       <span className='address-list-tag-label'>{AddressBook['Shipping'] && AddressBook['Shipping'].label}</span>
       <span className='address-list-line'>{AddressBook['Shipping'] && AddressBook['Shipping'].address}</span>
     </div>
        :
        <></>
    );
    setIsModalOpen(true);
  };

  const handleShowAddressForm = () => {
    setModalTitle("Add Address")
    setModalContent(
      <form>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Enter full name" />

        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" placeholder="Enter phone number" />

        <label htmlFor="address">Address</label>
        <textarea id="address" placeholder="Enter address"></textarea>

        <label htmlFor="city">City</label>
        <input type="text" id="city" placeholder="Enter city" />

        <label htmlFor="province">Province</label>
        <select id="province">
          <option value="">Select Province</option>
          <option value="Sindh">Sindh</option>
          <option value="Punjab">Punjab</option>
          <option value="Balochistan">Balochistan</option>
          <option value="KPK">Khyber Pakhtunkhwa</option>
        </select>
        <button type="submit" style={{ marginTop: "10px" }}>
          Save
        </button>
        <button className='' onClick={handleCloseModal} style={{ marginTop: "10px" }}>
          Close
        </button>
      </form>
    );
    setIsModalOpen(true);
  };
  

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
      <div className="address-list-info">
        <span className='address-list-tag-label'>{AddressBook['Shipping'] && AddressBook['Shipping'].label}</span>
        <span className='address-list-line'>{AddressBook['Shipping'] && AddressBook['Shipping'].address}</span>
      </div>
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
