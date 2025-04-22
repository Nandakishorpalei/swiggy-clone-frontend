import React from "react";

import { useState } from "react";
import { useUpdateItemQuantityMutation } from "../../store/api/cart";
import { useToast } from "../../Hooks/useToast";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const QuantitySelector = ({ dishId }: { dishId: string }) => {
  const { alertToast } = useToast();
  const [updateItemQuantity, { isLoading }] = useUpdateItemQuantityMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dishQuantity = cartItems[dishId]?.quantity || 0;

  const handleUpdateQuantity = async (quantity: number) => {
    try {
      await updateItemQuantity({
        itemId: dishId,
        quantity,
      }).unwrap();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center border border-solid border-neutral-10 bg-surface rounded-lg overflow-hidden">
        <button
          className="px-3 py-1.5 hover:bg-neutral-10 text-dark_green-70 text-subtitle font-bold rounded-tl-md rounded-bl-md"
          onClick={() => handleUpdateQuantity(dishQuantity - 1)}
        >
          –
        </button>
        <span className="px-3 py-1.5 text-dark_green-70 text-subtitle font-bold">
          {dishQuantity}
        </span>
        <button
          className="px-3 py-1.5 hover:bg-neutral-10 text-dark_green-70 text-subtitle font-bold rounded-tr-md rounded-br-md"
          onClick={() => handleUpdateQuantity(dishQuantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
