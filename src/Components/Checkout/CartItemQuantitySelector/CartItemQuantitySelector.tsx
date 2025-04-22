import React from "react";
import { useState } from "react";
import { useToast } from "../../../Hooks/useToast";
import { useUpdateItemQuantityMutation } from "../../../store/api/cart";
import { GetCartItem } from "../../../store/model/Cart";

export const CartItemQuantitySelector = ({ item }: { item: GetCartItem }) => {
  const { alertToast } = useToast();
  const [updateItemQuantity, { isLoading }] = useUpdateItemQuantityMutation();
  const dishQuantity = item.quantity || 0;

  const handleUpdateQuantity = async (quantity: number) => {
    try {
      await updateItemQuantity({
        itemId: item.dishId._id,
        quantity,
      }).unwrap();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex px-0.5 gap-0.5 items-center border border-solid border-neutral-10 bg-surface">
        <button
          className="px-1 py-0.5 hover:bg-neutral-10 text-dark_green-70 text-body-sm font-bold"
          onClick={() => handleUpdateQuantity(dishQuantity - 1)}
        >
          –
        </button>
        <span className="px-1 py-0.5 text-dark_green-70 text-body-sm font-bold">
          {dishQuantity}
        </span>
        <button
          className="px-1 py-0.5 hover:bg-neutral-10 text-dark_green-70 text-body-sm font-bold"
          onClick={() => handleUpdateQuantity(dishQuantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
