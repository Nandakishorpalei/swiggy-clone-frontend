import { useParams } from "react-router-dom";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import { useGetRestaurantsBasedOnFoodQuery } from "../../store/api/restaurant";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { capitalizeWords } from "../../utils/capitalize";
import { EmptyScreen } from "../../UI-Components/EmptyScreen/EmptyScreen";
import { motion } from "framer-motion";
import { RestaurantCard } from "./RestaurantCard";
import { useEffect } from "react";

export const FoodBasedRestaurants = () => {
  const { foodname = "" } = useParams<{ foodname: string }>();
  const { data, isLoading, isSuccess, isError } =
    useGetRestaurantsBasedOnFoodQuery({ foodname }, { skip: !foodname });
  console.log({ data });

  return (
    <div className="w-full h-screen bg-surface">
      <RestaurantNavbar title="" />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={isSuccess && !data?.data?.allRestaurants.length}
        key="foodBasedRestaurants"
      >
        <Async.Empty>
          <EmptyScreen />
        </Async.Empty>
        <Async.ErrorHandler>
          <ErrorScreen />
        </Async.ErrorHandler>
        <Async.Success>
          <div className="pt-8 w-4/5 mx-auto">
            <div className="text-[40px] font-semibold">
              {capitalizeWords(foodname)}
            </div>
            <div className="text-subtitle">
              Satisfy your cravings for {capitalizeWords(foodname)}
            </div>
            <div className="text-[24px] font-extrabold mt-12">
              {data?.data.allRestaurants.length} Restaurants to explore
            </div>
            <motion.div className="pl-2 grid grid-cols-4 gap-6 mt-6">
              {data?.data.allRestaurants.map((restaurant, i) => (
                <motion.div key={i} className="w-full">
                  <RestaurantCard restaurant={restaurant} size="small" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Async.Success>
      </Async.Root>
    </div>
  );
};
