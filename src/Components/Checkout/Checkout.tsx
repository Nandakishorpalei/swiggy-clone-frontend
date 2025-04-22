import React, { useEffect, useState } from "react";
import { useGetCartItemsQuery } from "../../store/api/cart";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { OrangeButton } from "../../UI-Components/OrangeButton/OrangeButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SavedAddress } from "./SavedAddress";
import { PaymentMethod } from "./PaymentMethod/PaymentMethod";
import { CheckoutItems } from "./CheckoutItems/CheckoutItems";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Checkout = () => {
  const { data, isLoading, isError, isSuccess } = useGetCartItemsQuery();
  const selectedAddress = data?.data?.cart?.selectedAddress;
  const [currentStep, setCurrentStep] = useState<"ADDRESS" | "PAYMENT">(
    selectedAddress ? "PAYMENT" : "ADDRESS"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(selectedAddress ? "PAYMENT" : "ADDRESS");
  }, [selectedAddress]);

  const isEmpty =
    isSuccess &&
    (!data?.data?.cart?.items || data?.data?.cart?.items?.length === 0);

  return (
    <div className="w-full h-screen bg-surface-grey overflow-auto">
      <RestaurantNavbar title="Checkout" />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={isEmpty}
        key="checkout"
      >
        <Async.Empty>
          <div className="flex justify-center items-center flex-col h-[calc(100%-120px)]">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="Empty Cart"
              className="h-64"
            />
            <h1 className="text-subtitle font-bold mt-4">Your cart is empty</h1>
            <p className="text-body text-text-30 mt-2">
              You can go to home page to view more restaurants
            </p>
            <div className="w-1/5 mt-8">
              <OrangeButton onClick={() => navigate("/restaurant")}>
                SEE RESTAURANTS
              </OrangeButton>
            </div>
          </div>
        </Async.Empty>
        <Async.ErrorHandler>
          <ErrorScreen />
        </Async.ErrorHandler>
        <Async.Success>
          <motion.div className="w-4/5 mx-auto flex p-6 gap-6">
            <div className="pl-4 relative flex-1 flex gap-6 flex-col h-fit">
              <div
                className={classNames(
                  "absolute left-1 flex justify-between flex-col top-8 border border-dashed border-text-100 border-r-0 border-b-0 border-t-0",
                  {
                    "h-[calc(100%-64px)]": currentStep === "ADDRESS",
                    "h-[calc(100%-134px)]": currentStep === "PAYMENT",
                  }
                )}
              >
                <div className="z-[1] p-2 -ml-[22px] flex border border-solid font-200 bg-text-black text-white">
                  <FmdGoodOutlinedIcon />
                </div>

                <div
                  className={classNames(
                    "z-[1] p-2 -ml-[22px] flex border border-solid font-200",
                    {
                      "bg-white text-text-black border-neutral-20":
                        currentStep !== "PAYMENT",
                      "bg-text-black text-white": currentStep === "PAYMENT",
                    }
                  )}
                >
                  <AccountBalanceWalletOutlinedIcon />
                </div>
              </div>
              <SavedAddress setCurrentStep={setCurrentStep} />
              <PaymentMethod isCurrentStep={currentStep === "PAYMENT"} />
            </div>
            <CheckoutItems />
          </motion.div>
        </Async.Success>
      </Async.Root>
    </div>
  );
};
