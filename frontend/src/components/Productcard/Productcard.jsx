import React from 'react'
import './Productcard.css'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating/StarRating'


function Productcard(props) {
    const {products} = props
    return (
    <div className="product-card">
        <div className="product-item">


            <div className="product-img">
            <Link to={`/product/${products.id}`}><img  src={products.image} alt=''/></Link>
            </div>
            <div className="product-title">
                <Link to={`/product/${products.id}`}>{products.title.length > 20 && `${products.title.slice(0, 17)}...`}</Link>
            </div>
            <div className="product-prices">
                <h5>${((products.price)-(products.price*products.discountPercentage)/100).toFixed(2)}</h5> <del>${products.price}</del>
            </div>
            <div className="product-star">
                <StarRating value={products.rating.rate} text={products.rating.rate} />
            </div>
        </div>
      
    </div>
  )
}

export default Productcard
