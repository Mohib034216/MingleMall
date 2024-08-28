import React from 'react'
import './Item.css'


function Item(props) {
  return (
    <div>
        <div className="card">
        <img src={props.image} alt={props.name} style={{width:250,height: 250}} />
        <h1>{props.name}</h1>
        <p className="price">{props.price}</p>
        <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
        <p><button>Add to Cart</button></p>
        </div>
      
    </div>
  )
}

export default Item
