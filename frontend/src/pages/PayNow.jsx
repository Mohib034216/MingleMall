import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PayNow.css';

const PayNow = () => {
  const navigate = useNavigate();
  const orderId = localStorage.getItem('order_id');
  const paymentMethod = localStorage.getItem('payment_method');

  useEffect(() => {
    const processPayment = async () => {
      if (paymentMethod === 'paypal' || paymentMethod === 'paypal-wallet') {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/payments/paypal-payment/${orderId}/`);
          window.location.href = response.data.approval_url;
        } catch (error) {
          console.error('PayPal Payment Failed:', error);
        }
      } else if (paymentMethod === 'cod') {
        navigate('/order-success');
      }
    };

    processPayment();
  }, [navigate, orderId, paymentMethod]);

  return (
    <div className="pay-now-container">
      <h2>Processing Payment...</h2>
    </div>
  );
};

export default PayNow;
