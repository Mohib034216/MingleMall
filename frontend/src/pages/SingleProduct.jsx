import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating/StarRating";
import { Breadcrumb, ProductQty } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import Products from "../components/assets/products.json";
import {addToCart, updateCart} from "../feadured/Cart";
import axios from "axios";


function SingleProduct() {
  const params = useParams();
  const id = params.id;
  const  dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  const [ProductList, setProductList] = useState([]);
  useEffect(() => {
    axios(`http://localhost:8000/products/${id}`).then((response) => 
     {

       setProductList(response.data);
    })
  }, [id]);
  
  const product = {
    id: ProductList?.id ,
    title: ProductList?.title,
    image: ProductList?.thumbnail,
    review: ProductList?.review,
    price: ProductList?.price,
    quantity: qty,
   
  };
  // const handleUpdate = (qty) => {
  
  //   setQty(qty)
  //   dispatch(updateCart({id:id, qty:qty}))
  
  // }
  
  return (
    <>
      <Breadcrumb label={'Shop'} path={'/shop'}  current={`${ProductList.title}`} />
      <div className="product-detail">
        <div className="product-images">
          <img
            width={"500vw"}
            height={"450vw"}
            src={ProductList.thumbnail}
            alt=""
          />
          <div className="product-thumbnail">
            <ul>
              <li>
                <img
                  src={
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781"
                  }
                  alt=""
                />
              </li>
              <li>
                <img
                  src={
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781"
                  }
                  alt=""
                />
              </li>
              <li>
                <img
                  src={
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781"
                  }
                  alt=""
                />
              </li>
              <li>
                <img
                  src={
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781"
                  }
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          <h1>{ProductList?.title}</h1>

          {
          ProductList?.review &&
          ProductList?.review.map((review) => (
                    <StarRating value={review.rating} text={review.rating} />
            
            ))}
          {/* {ProductList?.rating &&  <StarRating value={ProductList?.review} text={ProductList?.review}/>
          } */}
          <div className="product-price">
            <span>${((ProductList.price)-(ProductList.price*ProductList.discountPercentage)/100).toFixed(2)}</span>
            <span>
              <del>${ProductList?.price}</del>
            </span>
          </div>
          <div className="product-short-description">
            
          <div dangerouslySetInnerHTML={{ __html: ProductList?.description }} />
                          

            
        
          </div>
          <div className="product-variation">
            <div className="product-color">
              <h3>Colors:</h3>
              <input  type="radio" id="red" name="color_variation" value="red" /> {" "}
              <label htmlFor="red">Red</label>
                <input  type="radio" id="blue" name="color_variation" value="blue" /> {" "}
              <label htmlFor="blue">Blue</label>
            </div>
            <div className="product-size">
              <h3>Sizes:</h3>
              <input  type="radio" id="XS" name="size_variation" value="XS" /> {" "}
              <label htmlFor="XS">XS</label>
                <input  type="radio" id="S" name="size_variation" value="S" /> {" "}
              <label htmlFor="S">S</label>
            </div>
          </div>
          <div className="product-add-cart">
            <ProductQty quantity={qty} setQuantity={setQty} />
            <button onClick={()=>{dispatch(addToCart(product))}} >Add To Cart <i className="fa fa-shopping-cart"></i>   </button>
          {/* <div className="product-add-cart"></div> */}
          </div>
          <div className="product-social-share">
            <h3>Share on:</h3>
            <span>
              <i className="fa fa-facebook"></i>
            </span>
            <span>
              <i className="fa fa-twitter"></i>
            </span>
            <span>
              <i className="fa fa-linkedin"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="product-brief-detail">
                  
      </div>
    </>
  );
}

export default SingleProduct;
