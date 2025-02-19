// components/PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": "your-paypal-client-id", // Use your sandbox/client ID
                currency: "USD",
            }}
        >
            <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={async (data, actions) => {
                    // Call your DRF backend to create the payment
                    const response = await fetch('http://localhost:8000/api/create-payment/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            amount: amount,
                        }),
                    });
                    const orderData = await response.json();
                    return orderData.approval_url.split('token=')[1]; // Extract the order ID
                }}
                onApprove={async (data, actions) => {
                    // Capture the payment on the backend
                    const response = await fetch('http://localhost:8000/api/execute-payment/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            payment_id: data.paymentID,
                            payer_id: data.payerID,
                        }),
                    });
                    const result = await response.json();
                    if (result.status === "success") {
                        onSuccess(result);
                    } else {
                        onError(result.error);
                    }
                }}
                onError={(err) => onError(err)}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;