import {React, useState, useEffect} from "react";
import {Breadcrumb,Productcard} from "../components/";
import Products from "../components/assets/products.json";
import axios from "axios";

import { Link } from "react-router-dom";

try {
 // let data = response.data;
} catch (error) {
  
  console.log(error)
}
function Shop() {
  const [sorting,setSorting] = useState(false)
  const [showing,setShowing] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(()=>{
    // axios.get('https://fakestoreapi.com/products')
    axios.get('http://localhost:8000/products/')
  .then(response => {
    const productList =  response.data.map(
      product => (
        ({
          id:product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
          review: product.review,

             
        })
        
      ))
      setProducts(productList)
      // const productList = response.data.map(product => ({
        //   id: product.id,
        //   title: product.title,
        //   price: product.price,
        //   image: product.thumbnail,
        //   review: product.review,
        // }));
        // setProducts(productList);
        
      })
      .catch(error => {
        console.error(error);
      });
    

   let handler = ()=>{

     setSorting(false)
     setShowing(false)
    
    
  } ;
  document.addEventListener("mousedown",handler)
    
  });
  



  return (
    <div className="shop">
      <Breadcrumb current={'Shop'} path={'/shop'}/>
      <div className="shop-content">
        <div className="shop-side-left">
          <div className="shop-filters">
            <div className="title">
              <span>FILTER BY PRICE</span>
            </div>
            <div className="shop-filter-price">
              <form >
                <input   type="checkbox" />
                <p >All Products</p>
                <span>100</span>
              </form>
            </div>
          </div>
        </div>
        <div className="shop-side-right">
          <div className="shop-filter-content">
            <div className="shop-view">
              <button>
                <i className="fa fa-th-large"></i>
              </button>
              <button>
                <i className="fa fa-bars"></i>
              </button>
            </div>
            <div className="shop-sort">
              <div className="shop-sorting">
                <button  onClick={()=>{setSorting(!sorting)}}>
                  Sorting <i className="fa fa-sort"></i>
                </button>
                
                  
                    <div className={sorting === true ?"list active":"list"} >
                      <li>
                        <Link>Popular</Link>
                      </li>
                      <li>
                        <Link>Latest</Link>
                      </li>
                      <li>
                        <Link>Best Rating</Link>
                      </li>
                    </div>
                  
                
              </div>
              <div className="shop-showing">
                <button  onClick={()=>{setShowing(!showing)}}>
                  Showing <i className="fa fa-caret-down" aria-hidden="true"></i>
                </button>
                <div className={showing === true ?"list active":"list"}>
                  <li>
                    <Link>10</Link>{" "}
                  </li>
                  <li>
                    <Link>20</Link>{" "}
                  </li>
                  <li>
                    <Link>30</Link>{" "}
                  </li>
                </div>
              </div>
            </div>

          </div>
            <div className="shop-product">
             {
              products.map((item,i)=>(
              <Productcard key={i} products={item} />
                // console.log(item)
             ))}
              </div>
        </div>
      </div>
      
    </div>
  );
}

export default Shop;
