import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdvancedPayPalButton from "../components/PayPalButton/PayPalButton";
import { ChevronDown, ChevronUp } from "lucide-react";


const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState();
  const [orderItems, setOrderItems] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id"); 

  const producthandle = async () =>{
    try{ 
     const response =  await axios.get(`http://localhost:8000/orders/${orderId}/`);
     setOrderItems(response.data.items)
  
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
}
  useEffect(() => {
    producthandle(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs once on mount


  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
    },
    section: {
      backgroundColor: "#fff",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "8px",
    },
    paymentOption: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      cursor: "pointer",
      borderBottom: "1px solid #f1f1f1",
    },
    icon: {
      width: "40px",
      marginRight: "15px",
    },
    paymentDetails: {
      display: "flex",
      flexDirection: "column",
    },
    subText: {
      color: "#999",
      fontSize: "12px",
    },
    totalContainer: {
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "8px",
      margin: "20px 0",
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      margin: "5px 0",
    },
    totalAmount: {
      color: "red",
      fontWeight: "bold",
    },
    payButton: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#ff6600",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };
  const paymentMethodSelected = (e) =>{
    if(e === 'paypal'){
      setSelectedMethod(e)
    }
    
    
    
    
  }
  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      if (selectedMethod === "paypal") {
        const response = await axios.post(`http://127.0.0.1:8000/payment/paypal-payment/${orderId}/`);
        console.log(response)
        // window.location.href = response.data.payment_url;
        
        // localStorage.setItem('payment_method', selectedMethod);
        // navigate('/pay-now');
      //   <PayPalButton
      //   amount="10.00"  // Dynamic value from your app
      //   // onSuccess={handlePaymentSuccess}
      //   // onError={handlePaymentError}
      //  />
      }

      if (selectedMethod === "easypaisa") {
        const response = await axios.post(`http://127.0.0.1:8000/payment/easypaisa/${orderId}/`);
        window.location.href = response.data.payment_url;
      }

      if (selectedMethod === "cod") {
        await axios.post(`http://localhost:8000/payment/cod/${orderId}/`);
        navigate(`/order-success?order_no=${orderId}`);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };
  return (
    <div style={styles.container}>
      <h2>Select Payment Method</h2>

      {/* Recommended Method */}
      <div style={styles.section}>
        <h4>Recommended method(s)</h4>
        <div
          style={styles.paymentOption}
          onClick={()=> {paymentMethodSelected('paypal')}}
        >
          <img src={'https://cdn-icons-png.flaticon.com/512/6963/6963703.png'} alt="Credit Card" style={styles.icon} />
          <div style={styles.paymentDetails}>
          
            <span>Credit/Debit Card</span>
            <span style={styles.subText}>Visa / MasterCard</span>
          </div>
          <div className="Chevron-icon">
          {selectedMethod === "paypal" ? <ChevronUp /> : <ChevronDown />}

          </div>
      
        </div>
        {(
          (selectedMethod  == 'paypal') &&
          <AdvancedPayPalButton
          amount="20.00"
          onSuccess={(details) => alert(`Payment successful by ${details.payer.name.given_name}`)}
          onError={(err) => alert("Payment failed, please try again.")}
        />
          
          
          

        )}
        
      </div>

      {/* Other Payment Methods */}
      <div style={styles.section}>
        <h4>Payment methods</h4>

        <div
          style={styles.paymentOption}
          onClick={() => setSelectedMethod("easypaisa")}
        >
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiR1bOJuCPBBerw8O7KGTSMmkOsQo8K1OjA&s"} alt="EasyPaisa" style={styles.icon} />
          <div style={styles.paymentDetails}>
            <span>EasyPaisa Wallet</span>
          </div>
        </div>

        <div
          style={styles.paymentOption}
          onClick={() => setSelectedMethod("cod")}
        >
          <img src={"https://cdn-icons-png.flaticon.com/256/7758/7758094.png"} alt="COD" style={styles.icon} />
          <div style={styles.paymentDetails}>
            <span>Cash On Delivery</span>
          </div>
        </div>
      </div>

      {/* Subtotal and Total Amount */}
      <div style={styles.totalContainer}>
        <div style={styles.totalRow}>
          <span>Subtotal</span>
          <span>Rs. 114,068</span>
        </div>
        <div style={styles.totalRow}>
          <span>Total Amount</span>
          <span style={styles.totalAmount}>Rs. 114,068</span>
        </div>
      </div>

      <button style={styles.payButton} onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentMethod;


