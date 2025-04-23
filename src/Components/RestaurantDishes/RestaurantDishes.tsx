import React, { useEffect, useState } from "react";
import { useGetAllDishesQuery } from "../../store/api/Dishes";
import { useParams } from "react-router-dom";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { motion } from "framer-motion";
import { DishCard } from "./DishCard";
import { RestaurantDetails } from "./RestaurantDetails";
import { debounce } from "../../utils/debounce";
import SearchIcon from "@mui/icons-material/Search";
import { SmallEmptyScreen } from "../../UI-Components/EmptyScreen/SmallEmptyScreen";
import { CartNotification } from "../CartNotification/CartNotification";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  DishCardShimmer,
  MenuSearchShimmer,
} from "../../UI-Components/Shimmer/Shimmer";

export const RestaurantDishes = () => {
  const { restaurantid = "" } = useParams<{ restaurantid: string }>();
  const [query, setQuery] = useState("");
  const { data, isLoading, isSuccess, isError } = useGetAllDishesQuery({
    restaurantId: restaurantid,
    query: query || null,
  });
  const { items: cartItems, restaurantId: cartRestaurantId } = useSelector(
    (state: RootState) => state.cart
  );
  const itemCount = Object.keys(cartItems).length;

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  });

  const isEmpty = isSuccess && data?.data.dishes.length === 0;

  return (
    <div className="w-full h-screen bg-surface">
      <RestaurantNavbar title="Restaurants" />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={false}
        key="restaurantDishes"
        renderOnLoad={
          <div className="w-1/2 mx-auto mt-6 space-y-6">
            <div className="w-1/3 bg-neutral-20 h-10 animate-pulse"></div>
            <div className="h-32 w-full bg-neutral-20 animate-pulse"></div>
            <MenuSearchShimmer blockSearch />
            <motion.div className="flex flex-col gap-6">
              {Array.from({ length: 4 }, (_, index) => (
                <motion.div
                  key={index}
                  className="w-full border-b border-neutral-10 py-6"
                >
                  <DishCardShimmer />
                </motion.div>
              ))}
            </motion.div>
          </div>
        }
      >
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.ErrorHandler>
          <ErrorScreen />
        </Async.ErrorHandler>
        <Async.Success>
          <div className="w-1/2 pt-6 mx-auto mt-0">
            {data?.data.restaurant && (
              <RestaurantDetails restaurantInfo={data.data.restaurant.info} />
            )}
            <div className="w-full my-8">
              <div className="flex items-center justify-center my-4 text-gray-600 text-lg font-semibold">
                <span className="mr-2">⎯⎯</span>
                <span className="tracking-[5px] text-text-30 font-medium">
                  MENU
                </span>
                <span className="ml-2">⎯⎯</span>
              </div>
              <div className="relative flex items-center bg-surface-grey p-4 rounded-xl w-full mx-auto">
                <input
                  type="text"
                  placeholder="Search for dishes"
                  onChange={handleChange}
                  className="w-full bg-surface-grey outline-none text-text-30 placeholder-text-60"
                />
                <SearchIcon className="text-text-30" />
              </div>
            </div>
            {isEmpty ? (
              <SmallEmptyScreen />
            ) : (
              <motion.div>
                {data?.data.dishes.map((dish) => (
                  <motion.div
                    key={dish._id}
                    className="w-full border-b border-neutral-10 py-6"
                  >
                    <DishCard dish={dish} currentRestaurant={restaurantid} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </Async.Success>
      </Async.Root>
      <CartNotification
        show={itemCount > 0}
        itemCount={itemCount}
        isSameRestaurant={cartRestaurantId == restaurantid}
      />
    </div>
  );
};
