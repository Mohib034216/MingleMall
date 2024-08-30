import React from "react";
import "./StarRating.css";

function StarRating(props) {
const {value,text} = props
  return (
    <>
      <div className="product-star">
        <i className={ value >= 1 ? "fa fa-star":value >= 0.5 ?"fa fa-star-half-o":"fa fa-star-o"}></i>
        <i className={ value >= 2 ? "fa fa-star":value >= 1.5 ?"fa fa-star-half-o":"fa fa-star-o"}></i>
        <i className={ value >= 3 ? "fa fa-star":value >= 2.5 ?"fa fa-star-half-o":"fa fa-star-o"}></i>
        <i className={ value >= 4 ? "fa fa-star":value >= 3.5 ?"fa fa-star-half-o":"fa fa-star-o"}></i>
        <i className={ value >= 5 ? "fa fa-star":value >= 4.5 ?"fa fa-star-half-o":"fa fa-star-o"}></i>
       <span> ({text}) </span>
      </div>
    </>
  );
}

export default StarRating;
