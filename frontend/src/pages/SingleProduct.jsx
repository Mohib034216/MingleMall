import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating/StarRating";
import { Breadcrumb, ProductQty } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction} from "../feadured/Cart";
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
  const [availableSizes, setAvailableSizes] = useState([]); // Sizes available for the selected color
  const [availableColors, setAvailableColors] = useState([]); // Colors available for the selected size
  // const  {cartItems}  = useSelector((state) => state.cart);
  const {userInfo}  = useSelector((state) => state.auth);


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
    // customer:userInfo,
    product:ProductList?.sku,
    variant:filteredVariant ? filteredVariant[0].sku : null,
    price: filteredVariant ? filteredVariant[0].sale_price : ProductList?.price,
    quantity: qty,
    // variant:filteredVariant && filteredVariant[0].id
   
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
    filterAvailableSizes(color)

  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    filterVariants(selectedColor, size);
    filterAvailableColors(size)

  };
 
  const filterVariants = (color, size) => {
    if (!color || !size || !ProductList) return;

    const matchedVariant = ProductList.variants.filter(variant => {
      const colorMatch = variant.attribute_values.some(attr => attr.attribute_title === "Color" && attr.value === color);
      const sizeMatch = variant.attribute_values.some(attr => attr.attribute_title === "Size" && attr.value === size);
      return colorMatch && sizeMatch;
  
    }
  
  );
  setFilteredVariant(matchedVariant || null);
   
  };
   // Filter available sizes based on selected color
   const filterAvailableSizes = (color) => {
  
    if (!ProductList || !ProductList.variants) return;

    const sizesForColor = new Set();
    ProductList.variants.forEach(variant => {
      const hasColor = variant.attribute_values.some(attr => attr.attribute_title === "Color" && attr.value === color);
    
      if (hasColor) {
        variant.attribute_values.forEach(attr => {
          if (attr.attribute_title === "Size") {
            sizesForColor.add(attr.value);
          }
        });
      }
    });

    setAvailableSizes(Array.from(sizesForColor));
  };

 // Filter available colors based on selected size
  const filterAvailableColors = (size) => {
    if (!ProductList || !ProductList.variants) return;

    const colorsForSize = new Set();
    ProductList.variants.forEach(variant => {
      const hasSize = variant.attribute_values.some(attr => attr.attribute_title === "Size" && attr.value === size);
      if (hasSize) {
        variant.attribute_values.forEach(attr => {
          if (attr.attribute_title === "Color") {
            colorsForSize.add(attr.value);
          }
        });
      }
    });

    setAvailableColors(Array.from(colorsForSize));
  };

  if (!ProductList) return <div>Loading...</div>;

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
            {
            (!!filteredVariant) ? 
            <span>${(filteredVariant[0].sale_price)}</span>
            :
            <span>${(ProductList?.price)}</span>
            }
            <span>
              <del>${ProductList?.price}</del>
            </span>
          </div>
          <div className="product-short-description">
            
          <div dangerouslySetInnerHTML={{ __html: ProductList?.description }} />
                          

            
        
          </div>
        
          {
              (colors.length > 0) && (sizes.length > 0) &&

              <div className="product-container">  
            {/* Display colors */}
      <div className="product-colors">
        <h3>Choose Color:</h3> 
        <p> Selected Color: {selectedColor && selectedColor}
        </p>
        <div className="color-options">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => handleColorSelect(color)}
              style={{
                backgroundColor: color.toLowerCase(),
                opacity: selectedSize && !availableColors.includes(color) ? 0.5 : 1, // Disable color swatch if it's not available for the selected size
                pointerEvents: selectedSize && !availableColors.includes(color) ? 'none' : 'auto'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Display sizes */}
      <div className="product-sizes">
        <h3>Choose Size:</h3>
        <p> Selected Size: {selectedSize && selectedSize}
        </p>

        <div className="size-options">
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => handleSizeSelect(size)}
              disabled={selectedColor && !availableSizes.includes(size)} // Disable size button if it's not available for the selected color
              style={{
                opacity: selectedColor && !availableSizes.includes(size) ? 0.5 : 1
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

            </div>
          }
          
          <div className="product-add-cart">
            <ProductQty quantity={qty} setQuantity={setQty} />
            <button onClick={()=>{
              (colors.length > 0) && (sizes.length > 0) ?
                
                filteredVariant && dispatch(addToCartAction({userInfo,product})) :
                ProductList && dispatch(addToCartAction({userInfo,product}))
              // console.log('Second Add to Cart! ');

              }} >Add To Cart <i className="fa fa-shopping-cart"></i>   </button>
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
      {(
        <div className="product-info">
        
          <p><strong>SKU:</strong> {(filteredVariant) ? filteredVariant[0].sku :ProductList?.sku}</p>
          <p><strong>Stock:</strong> {(filteredVariant) ? filteredVariant[0].stock_status :ProductList?.stock_status}</p>
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
