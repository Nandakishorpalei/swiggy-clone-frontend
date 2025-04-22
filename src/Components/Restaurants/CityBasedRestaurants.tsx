import { useParams } from "react-router-dom";
import Offers from "./Offers";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import { TopRestaurants } from "./TopRestaurants";
import { useGetAllRestaurantsQuery } from "../../store/api/restaurant";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { motion } from "framer-motion";
import { RestaurantCard } from "./RestaurantCard";

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
