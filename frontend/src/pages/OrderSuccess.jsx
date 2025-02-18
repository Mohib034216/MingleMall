import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
// import product1 from "../assets/product1.png";
// import product2 from "../assets/product2.png";

const OrderSuccess = () => {
  const [orderItems, setOrderItems] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order_no"); // Sample orderId

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f8ff",
    },
    content: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "600px",
      width: "100%",
    },
    checkmark: {
      width: "60px",
      marginBottom: "20px",
    },
    orderSummary: {
      backgroundColor: "#f7f7f7",
      padding: "15px",
      borderRadius: "10px",
      marginTop: "20px",
      textAlign: "left",
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    itemImage: {
      width: "50px",
      borderRadius: "5px",
      marginRight: "10px",
    },
    itemPrice: {
      fontWeight: "bold",
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "1px solid #ccc",
      paddingTop: "10px",
      marginTop: "10px",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#ff6600",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      fontSize: "16px",
    },
  };

  console.log(orderNumber)

  const producthandle = async () =>{
      try{ 
       const response =  await axios.get(`http://localhost:8000/orders/${orderNumber}/`);
       setOrderItems(response.data.items)
    
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Payment failed. Please try again.");
      }
  }
  useEffect(() => {
    producthandle(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  
  // const orderItems = [
  //   {
  //     id: 1,
  //     name: "Half Sleeve 100% Cotton Shirts For Women",
  //     price: 800,
  //     image: '',
  //   },
  //   {
  //     id: 2,
  //     name: "Stylish women's scarfs combo",
  //     price: 800,
  //     image: '',
  //   },
  // ];

  const totalAmount = orderItems && orderItems.reduce((total, item) => total + item.price, 0);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img src={"https://png.pngtree.com/png-clipart/20200225/original/pngtree-green-check-mark-icon-flat-style-png-image_5253210.jpg"} alt="Success" style={styles.checkmark} />
        <h2>Thank you for your purchase</h2>
        <p>We've received your order and it will ship in 5-7 business days.</p>
        <p>Your order number is <strong>{orderNumber}</strong></p>

        <div style={styles.orderSummary}>
          <h3>Order Summary</h3>
          {
          orderItems &&
          orderItems.map((item) => (
            <div key={item.id} style={styles.item}>
              {/* <img src={item.product.thumbnail} alt={item.product.title} style={styles.itemImage} /> */}
              <img src={"https://uniworthdress.com/uploads/product/TCN2480-1.jpg"} alt={item.product.title} style={styles.itemImage} />
              <span>{item.product.title}</span>
              {/* <p>{item.product.variants && item.product.variants.title}</p> */}
              <span style={styles.itemPrice}>₹ {item.product.price}</span>
            </div>
          ))}
          <div style={styles.total}>
            <strong>Total</strong>
            <strong>₹ {totalAmount}</strong>
          </div>
        </div>

        <button style={styles.button} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
