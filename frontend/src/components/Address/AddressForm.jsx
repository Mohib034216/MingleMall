import React, { useState } from 'react'
import "./Address.css"


function AddressForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    building: "",
    locality: "",
    address: "",
    province: "Sindh",
    city: "Johi",
    area: "Goth Bachal Khan",
    label: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLabelClick = (label) => {
    setFormData({ ...formData, label });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Delivery information saved!");
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
            name="fullName"
            placeholder="Enter your first and last name"
            value={formData.fullName}
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
            name="phoneNumber"
            placeholder="Please enter your phone number"
            value={formData.phoneNumber}
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
            name="locality"
            placeholder="Please enter"
            value={formData.locality}
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
                formData.label === "OFFICE" ? "active" : ""
              }`}
              onClick={() => handleLabelClick("OFFICE")}
            >
              OFFICE
            </button>
            <button
              type="button"
              className={`label-button ${
                formData.label === "HOME" ? "active" : ""
              }`}
              onClick={() => handleLabelClick("HOME")}
            >
              HOME
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
