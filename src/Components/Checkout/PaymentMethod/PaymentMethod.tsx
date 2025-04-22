import React, { useState } from "react";
import { Button } from "../../../UI-Components/Button/Button";
import {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
} from "../../../store/api/order";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../Hooks/useToast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentMethod = ({
  isCurrentStep,
}: {
  isCurrentStep: boolean;
}) => {
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { successToast } = useToast();

  const handlePayment = async () => {
    const { order } = await createRazorpayOrder().unwrap();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Swiggy clone",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response: any) {
        await verifyRazorpayPayment(response).unwrap();
        successToast({ message: "Order placed successfully" });
        navigate("/profile");
      },
      prefill: {
        name: user?.name || "Guest User",
        email: user?.email || "guest@gmail.com",
        contact: user?.phone || "9999999999",
      },
      theme: { color: "#ffa245" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!isCurrentStep) {
    return (
      <div className="p-8 relative w-full bg-surface">
        <div className="absolute mt-8"></div>
        <div className="text-h6 font-semibold text-text-60">Payment</div>
      </div>
    );
  }
  return (
    <div className="p-8 relative w-full bg-surface">
      <div className="absolute mt-8"></div>
      <div className="text-h6 font-semibold text-text-60 mb-8">Payment</div>
      <Button
        block
        size="large"
        customType="special-primary"
        customColor="bg-[#1ba672] text-white"
        onClick={handlePayment}
      >
        PROCEED TO PAY
      </Button>
    </div>
  );
};
