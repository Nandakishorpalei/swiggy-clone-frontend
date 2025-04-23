import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetAllRestaurantsQuery } from "../../store/api/restaurant";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { RestaurantCardShimmer } from "../../UI-Components/Shimmer/Shimmer";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import Offers from "./Offers";
import { RestaurantCard } from "./RestaurantCard";
import { TopRestaurants } from "./TopRestaurants";

export const CityBasedRestaurants = () => {
  const { city = "" } = useParams<{ city: string }>();
  const { data, isLoading, isSuccess, isError } = useGetAllRestaurantsQuery();

  return (
    <div className="w-full h-screen bg-surface">
      <RestaurantNavbar
        title={
          city
            ? `Restaurants in ${city?.charAt(0).toUpperCase() + city?.slice(1)}`
            : "Restaurants"
        }
      />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={false}
        key="cityBasedRestaurants"
        renderOnLoad={
          <div className="pt-6 w-4/5 mx-auto space-y-8">
            {Array.from({ length: 2 }, (_, index) => (
              <div className="w-full mx-auto" key={index}>
                <div className="h-12 animate-pulse w-1/4 bg-neutral-20 mb-6"></div>
                <motion.div className="flex justify-between gap-6">
                  {Array.from({ length: 4 }, (_, index) => (
                    <motion.div key={index} className="w-full">
                      <RestaurantCardShimmer />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
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
          <div className="pt-6 w-4/5 mx-auto">
            <Offers />
            <hr className="my-16 bg-neutral-10 font-bold h-0.5 border-0" />
            <TopRestaurants />
            <hr className="mb-16 mt-8 bg-neutral-10 font-bold h-0.5 border-0" />
            {data?.data.allRestaurants && (
              <div className="w-full mx-auto space-y-6">
                <h2 className="font-bold text-h5">
                  Restaurants with online food delivery in Bangalore
                </h2>
                <motion.div className="pl-2 grid grid-cols-4 gap-6">
                  {data?.data.allRestaurants.map((restaurant, i) => (
                    <motion.div key={i} className="w-full">
                      <RestaurantCard restaurant={restaurant} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </Async.Success>
      </Async.Root>
    </div>
  );
};
