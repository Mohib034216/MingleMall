import React from 'react'
import './FeaturedProduct.css';
import Products from '../assets/products';
import Item from '../Item/Item';

function FeaturedProduct() {
  return (
    <div className='featured-product'>
      <h1>Featured Products</h1>
      <div className='featured-product-list'>

      {Products.map((item, i) =>{
        return <Item key={i} name={item.product} image={item.image} price={item.price} />
      
      })}
      </div>

    </div>
  )
}

export default FeaturedProduct
