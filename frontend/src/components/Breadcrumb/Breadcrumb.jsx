// import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Breadcrumb/Breadcrumb.css'

function Breadcrumb(props) {
    const {path,label,current} = props;
      return (
    <div className='breadcrumb'>
        <ul className="breadcrumb-content">
        <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
        <li className="breadcrumb-item "><Link to={path} >{label}</Link></li>
        {current?<li className="breadcrumb-item active">{current}</li>:''}
      </ul>
    </div>
  )
}

export default Breadcrumb
