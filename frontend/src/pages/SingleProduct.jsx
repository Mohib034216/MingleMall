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
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filteredVariant, setFilteredVariant] = useState(null); // Store the matched variant


  useEffect(() => {
    axios(`http://localhost:8000/products/${id}`).then((response) => 
     {

       setProductList(response.data);
       extractAttributes(response.data);  
    
    }).catch(error => {
      console.error("There was an error fetching the product!", error);
    });
  }, [id]);
  
  const product = {
    id: ProductList?.id ,
    title: ProductList?.title,
    image: ProductList?.thumbnail,
    review: ProductList?.review,
    price: ProductList?.price,
    quantity: qty,
   
  };

  const extractAttributes = (product) => {
    const colorSet = new Set();
    const sizeSet = new Set();

    // Loop through product variations
    product.variants.forEach(variant => {
      variant.attribute_values.forEach(attr => {
        if (attr.attribute_title === "Color") {
          colorSet.add(attr.value);
        } else if (attr.attribute_title === "Size") {
          sizeSet.add(attr.value);
        }
      });
    });

    // Convert sets to arrays
    setColors(Array.from(colorSet));
    setSizes(Array.from(sizeSet));
  };


  const handleColorSelect = (color) => {
    setSelectedColor(color);
    filterVariants(color, selectedSize);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    filterVariants(selectedColor, size);
  };
 
  const filterVariants = (color, size) => {
    // if (!ProductList) return;

    // const matchedVariants = ProductList.variants.filter(variant => {
    //   const colorMatch = color
    //     ? variant.attribute_values.some(attr => attr.attribute_title === "Color" && attr.value === color)
    //     : true;
    //   const sizeMatch = size
    //     ? variant.attribute_values.some(attr => attr.attribute_title === "Size" && attr.value === size)
    //     : true;
    //   return colorMatch && sizeMatch;
    if (!color || !size || !ProductList) return;

    const matchedVariant = ProductList.variants.filter(variant => {
      const colorMatch = variant.attribute_values.some(attr => attr.attribute_title === "Color" && attr.value === color);
      const sizeMatch = variant.attribute_values.some(attr => attr.attribute_title === "Size" && attr.value === size);
      return colorMatch && sizeMatch;
  
    }
  
  );
  setFilteredVariant(matchedVariant || null);
   
  };
  if (!!filteredVariant){

    console.log(filteredVariant);
  }

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

          <div className="product-price">
            <span>${(ProductList?.price)}</span>
            <span>
              <del>${ProductList?.price}</del>
            </span>
          </div>
          <div className="product-short-description">
            
          <div dangerouslySetInnerHTML={{ __html: ProductList?.description }} />
                          

            
        
          </div>
          <div className="product-container">  
                      {/* Display colors */}
                      <div className="product-colors">
                        <h3>Choose Color:</h3>

                        <div className="color-options">
                          {colors.map((color, index) => (
                            <div
                              key={index}
                              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                              onClick={() => handleColorSelect(color)}
                              style={{ backgroundColor: color.toLowerCase() }} // Color swatch style
                            ></div>
                          ))}
                        </div>
                         <div className="selected-options">
                            <p>Selected Color: {selectedColor || 'None'}</p>
                         </div>
                      </div>

                      {/* Display sizes */}
                      <div className="product-sizes">
                        <h3>Choose Size:</h3>
                        <div className="size-options">
                          {sizes.map((size, index) => (
                            <button
                              key={index}
                              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                              onClick={() => handleSizeSelect(size)}
                            >
                              {size}
                            </button>
                          ))}
                          
                        </div>
                        <div className="selected-options">
                        <p>Selected Size: {selectedSize || 'None'}</p>
                      </div>
                       
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
              {/* Display selected variant data */}
      {filteredVariant && (
        <div className="variant-info">
          <h3>Selected Variant:</h3>
        
          <p><strong>SKU:</strong> {filteredVariant[0].sku}</p>
          <p><strong>Price:</strong> ${filteredVariant[0].price}</p>
          <p><strong>Stock:</strong> {filteredVariant[0].stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}</p>
        </div>
      )}  
          </div>
        </div>
      </div>
      <div className="product-brief-detail">
                  
                 
      </div>
    </>
  );
}

export default SingleProduct;
