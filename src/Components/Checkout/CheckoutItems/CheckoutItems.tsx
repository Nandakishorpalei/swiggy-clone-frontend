import React from "react";
import { useGetCartItemsQuery } from "../../../store/api/cart";
import { motion } from "framer-motion";
import { CartItem } from "../CartItem";
import { Checkbox } from "../../../UI-Components/Checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const CheckoutItems = () => {
  const { data, isLoading, isError, isSuccess } = useGetCartItemsQuery();
  const cart = data?.data?.cart;
  const isEmpty = isSuccess && cart?.items?.length === 0;
  const restaurant = cart?.items?.[0]?.restaurantId;
  const navigate = useNavigate();

  if (!isSuccess) {
    return null;
  }

  return (
    <div className="w-[360px] bg-surface p-6 relative">
      <div
        className="flex gap-4 h-16 items-center"
        role="button"
        onClick={() =>
          navigate(`/restaurant/${cart?.items[0].restaurantId._id}`)
        }
      >
        <img
          className="h-full w-16 object-cover drop-shadow-card p-1"
          src={`${commonURL}${restaurant?.info.cloudinaryImageId}`}
          alt=""
        />
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-subtitle text-text-60">
              {restaurant?.info.name}
            </div>
            <div className="text-body text-text-30">
              {restaurant?.info.areaName}
            </div>
          </div>
          <div className="w-12 h-[2px] bg-text-100"></div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {cart?.items?.map((item) => (
          <motion.div key={item.dishId._id} className="w-full">
            <CartItem item={item} />
          </motion.div>
        ))}
      </div>
      <div className="border border-solid p-4 border-neutral-10 mt-6">
        <div className="w-full flex items-center">
          <Checkbox label={<></>} name="noContactDelivery" />{" "}
          <label className="text-body text-text-60" htmlFor="noContactDelivery">
            Opt in for No-contact Delivery
          </label>
        </div>
        <div className="text-body text-text-30 ml-6 mt-1">
          Unwell, or avoiding contact? Please select no-contact delivery.
          Partner will safely place the order outside your door (not for COD)
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-1">
        <div className="text-body-sm text-text-60">Bill Details</div>
        {cart?.totalPrice && (
          <div className="flex items-center justify-between">
            <div className="text-body-sm text-text-60">Item Total</div>
            <div className="text-body-sm text-text-60">
              ₹{(cart.totalPrice / 100).toFixed(2)}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-body-sm text-text-60">
            Delivery Fee | {cart?.distance || 8} kms
          </div>
          <div className="text-body-sm text-text-60">
            ₹{((cart?.distance || 8) * 5).toFixed(2)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-body-sm text-text-60">
            Extra discount for you
          </div>
          <div className="text-body-sm text-text-60">
            -₹{((cart?.distance || 8) * 5).toFixed(2)}
          </div>
        </div>
        {cart?.totalPrice && (
          <div className="flex items-center justify-between mt-4 pt-4 border border-solid border-l-0 border-r-0 border-b-0 border-text-text-100">
            <div className="text-body text-text-100 font-bold">TO PAY</div>
            <div className="text-body text-text-100 font-bold">
              ₹{(cart.totalPrice / 100).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
