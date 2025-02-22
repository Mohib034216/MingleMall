import React, { useEffect, useRef } from "react";
import { loadScript } from "@paypal/paypal-js";

const AdvancedPayPalButton = ({ amount, onSuccess, onError }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    loadScript({ "client-id": "EMK2lcZJ-CE26lb-VHfBs98fjVfpJa4f_0ZWuS2MEuSdjMweN_4jHok0HQthpBArigeS1Sq1P0IByl4x", components: "buttons" })
      .then((paypal) => {
        if (!paypal) throw new Error("PayPal SDK not loaded.");

        paypal.Buttons({
          style: { layout: "vertical", color: "blue", shape: "rect", label: "pay" },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: amount } }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              onSuccess(details);
            });
          },
          onError: (err) => {
            console.error("PayPal Payment Error:", err);
            onError(err);
          },
        }).render(paypalRef.current);
      })
      .catch((error) => console.error("PayPal SDK load error:", error));
  }, [amount, onSuccess, onError]);

  return <div ref={paypalRef}></div>;
};

export default AdvancedPayPalButton;
