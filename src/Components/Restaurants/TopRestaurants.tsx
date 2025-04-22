import React from "react";
import { useGetAllRestaurantsQuery } from "../../store/api/restaurant";
import Carousel from "../../UI-Components/Carousel/Carousel";
import { motion } from "framer-motion";
import { RestaurantCard } from "./RestaurantCard";
import { useParams } from "react-router-dom";

export const TopRestaurants = () => {
  const { city = "" } = useParams<{ city: string }>();
  const { data } = useGetAllRestaurantsQuery();

  return (
    <div className="w-full mx-auto">
      <Carousel
        title={
          <h2 className="font-bold text-h5">
            Top restaurants
            {city
              ? ` in ${city?.charAt(0).toUpperCase() + city?.slice(1)}`
              : ""}
          </h2>
        }
      >
        <motion.div className="flex gap-10 pl-2">
          {data?.data.topRestaurants.map((restaurant) => (
            <motion.div key={restaurant.info.id} className="w-72">
              <RestaurantCard restaurant={restaurant} isFromTopRestaurants />
            </motion.div>
          ))}
        </motion.div>
      </Carousel>
    </div>
  );
};
