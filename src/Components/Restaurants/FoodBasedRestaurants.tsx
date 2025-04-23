import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetRestaurantsBasedOnFoodQuery } from "../../store/api/restaurant";
import Async from "../../UI-Components/Async/Async";
import { EmptyScreen } from "../../UI-Components/EmptyScreen/EmptyScreen";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { RestaurantCardShimmer } from "../../UI-Components/Shimmer/Shimmer";
import { capitalizeWords } from "../../utils/capitalize";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import { RestaurantCard } from "./RestaurantCard";

export const FoodBasedRestaurants = () => {
  const { foodname = "" } = useParams<{ foodname: string }>();
  const { data, isLoading, isSuccess, isError } =
    useGetRestaurantsBasedOnFoodQuery({ foodname }, { skip: !foodname });

  return (
    <div className="w-full h-screen bg-surface">
      <RestaurantNavbar title="" />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={isSuccess && !data?.data?.allRestaurants.length}
        key="foodBasedRestaurants"
        renderOnLoad={
          <motion.div className="pl-2 grid grid-cols-4 gap-6 m-6">
            {Array.from({ length: 12 }, (_, index) => (
              <motion.div key={index} className="w-full">
                <RestaurantCardShimmer />
              </motion.div>
            ))}
          </motion.div>
        }
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
