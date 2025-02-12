import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      if (paymentMethod === "payoneer") {
        // Payoneer Payment
        const response = await axios.post(`http://127.0.0.1:8000/payment/payoneer/${orderId}/`);
        window.location.href = response.data.payment_url;
      }

      if (paymentMethod === "easypaisa") {
        // EasyPaisa Payment
        const response = await axios.post(`http://127.0.0.1:8000/payment/easypaisa/${orderId}/`);
        window.location.href = response.data.payment_url;
      }

      if (paymentMethod === "cod") {
        // Cash on Delivery (COD)
        await axios.post(`http://127.0.0.1:8000/payment/cod/${orderId}/`);
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <label>
        <input
          type="radio"
          name="paymentMethod"
          value="payoneer"
          onChange={() => setPaymentMethod("payoneer")}
        />
        Payoneer (Credit Card)
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="paymentMethod"
          value="easypaisa"
          onChange={() => setPaymentMethod("easypaisa")}
        />
        EasyPaisa (Mobile Wallet)
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="paymentMethod"
          value="cod"
          onChange={() => setPaymentMethod("cod")}
        />
        Cash on Delivery (COD)
      </label>
      <br />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentMethod;
