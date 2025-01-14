import React, { useState } from 'react'
import "./Address.css"
import axios from 'axios'
import {  useSelector } from 'react-redux';
import axiosInstance from '../../axios/AxiosInstance';


function AddressForm() {
  const {userInfo} = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    full_name : '',
    phone_number : '',
    province : '',
    city : '',
    area : '',
    building : '',
    landmark : '',
    address : '',
    label : 'Home',
    is_shipping : true,
    is_billing : true,
    
  });

    console.log(userInfo)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLabelClick = (label) => {
    setFormData({ ...formData, label });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axiosInstance.post(`user/addressbook/${userInfo}`, formData);
      const response = await axios.post(`http://localhost:8000/user/addressbook/${userInfo}`, formData);
      alert('Address saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving address:', error.response.data);
    }
  };

  return (
    <div className="delivery-form-container">
      <h2>Delivery Information</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            name="full_name"
            placeholder="Enter your first and last name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Province */}
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="Sindh">Sindh</option>
            <option value="Punjab">Punjab</option>
            <option value="KPK">KPK</option>
            <option value="Balochistan">Balochistan</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phone_number"
            placeholder="Please enter your phone number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="Johi">Johi</option>
            <option value="Karachi">Karachi</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Building */}
        <div className="form-group">
          <label htmlFor="building">Building / House No / Floor / Street</label>
          <input
            type="text"
            id="building"
            name="building"
            placeholder="Please enter"
            value={formData.building}
            onChange={handleChange}
            required
          />
        </div>

        {/* Area */}
        <div className="form-group">
          <label htmlFor="area">Area</label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          >
            <option value="Goth Bachal Khan">Goth Bachal Khan</option>
            <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
            <option value="Clifton">Clifton</option>
          </select>
        </div>

        {/* Locality */}
        <div className="form-group">
          <label htmlFor="locality">Colony / Suburb / Locality / Landmark</label>
          <input
            type="text"
            id="locality"
            name="landmark"
            placeholder="Please enter"
            value={formData.landmark}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="For Example: House# 123, Street# 123, ABC Road"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Label for Delivery */}
        <div className="form-group">
          <label>Select a label for effective delivery:</label>
          <div className="label-options">
            <button
              type="button"
              className={`label-button ${
                formData.label === "Office" ? "active" : ""
              }`}
              onClick={() => handleLabelClick("Office")}
            >
              Office
            </button>
            <button
              type="button"
              className={`label-button ${
                formData.label === "Home" ? "active" : ""
              }`}
              onClick={() => handleLabelClick("Home")}
            >
              Home
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-button">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default AddressForm
