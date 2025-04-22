import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FoodsCarousel } from "./Foods";
import { CityDeliveryLists } from "./CityDeliveryLists";
import { Footer } from "../Footer/Footer";
import { setShowLoginModal } from "../../store/slices/Auth";

export const Home = () => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <div className="bg-dark_orange static">
        <div className="w-4/5 flex justify-between items-center py-8 mx-auto">
          <img
            src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
            alt=""
            className="h-12"
          />
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="all:unset cursor-pointer bg-text-black rounded-[16px] font-bold py-3 text-white px-5"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => dispatch(setShowLoginModal(true))}
              className="all:unset cursor-pointer bg-text-black rounded-[16px] font-bold py-3 text-white px-5"
            >
              Sign in
            </button>
          )}
        </div>
        <div className="absolute z-1">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
            alt=""
            className="h-[440px]"
          />
        </div>
        <div className="absolute z-1 right-0">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
            alt=""
            className="h-[440px]"
          />
        </div>
        <div className="w-3/5 mx-auto text-[48px] pt-24 pb-8 text-white text-center font-semibold leading-[56px]">
          Order food & groceries. Discover best restaurants. Swiggy it!
        </div>
        <div className="flex mx-auto w-fit pb-12">
          <a href="/restaurant" className="cursor-pointer">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png"
              alt=""
              className="h-80"
            />
          </a>
          <a href="/restaurant" className="cursor-pointer">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png"
              alt=""
              className="h-80 cursor-pointer"
            />
          </a>
          <a href="/restaurant" className="cursor-pointer">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png"
              alt=""
              className="h-80 cursor-pointer"
            />
          </a>
          <a href="/restaurant" className="cursor-pointer">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/31/14033c0b-8907-420b-b72a-d26cfa68dc7b_Genie4BU.png"
              alt=""
              className="h-80 cursor-pointer"
            />
          </a>
        </div>
      </div>
      <div className="w-4/5 mx-auto mt-40 mb-20">
        <FoodsCarousel />
      </div>
      <div>
        <CityDeliveryLists />
      </div>
      <Footer />
    </div>
  );
};
