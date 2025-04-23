import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantsBasedOnCuisineQuery } from "../../store/api/restaurant";
import Async from "../../UI-Components/Async/Async";
import { SmallEmptyScreen } from "../../UI-Components/EmptyScreen/SmallEmptyScreen";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import {
  MenuSearchShimmer,
  RestaurantCardShimmer,
} from "../../UI-Components/Shimmer/Shimmer";
import { debounce } from "../../utils/debounce";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import { RestaurantCard } from "../Restaurants/RestaurantCard";

export const CuisineRestaurants = () => {
  const { cuisinename = "" } = useParams<{ cuisinename: string }>();
  const [query, setQuery] = useState("");
  const { data, isLoading, isSuccess, isError } =
    useGetRestaurantsBasedOnCuisineQuery(
      {
        cuisinename,
        search: query || null,
      },
      { skip: !cuisinename }
    );

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  });

  const isEmpty = isSuccess && data?.data.allRestaurants.length === 0;

  return (
    <div className="w-full h-screen bg-surface">
      <RestaurantNavbar title={`Restaurants that offers ${cuisinename}`} />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={false}
        key="cuisineDishes"
        renderOnLoad={
          <div className="w-4/5 pt-6 mx-auto mt-0">
            <div className="w-full h-96 pt-64 pl-12 bg-neutral-20 relative mb-12 animate-pulse"></div>
            <MenuSearchShimmer />
            <motion.div className="grid grid-cols-4 gap-6 mt-8">
              {Array.from({ length: 12 }, (_, index) => (
                <motion.div key={index} className="w-full">
                  <RestaurantCardShimmer />
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
          <div className="w-4/5 pt-6 mx-auto mt-0">
            <div
              className="w-full h-96 pt-64 pl-12 rounded-3xl bg-cover bg-center relative mb-12"
              style={{
                backgroundImage:
                  "url(https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/DO_collectionBanner.png)",
              }}
            >
              <div className="text-white font-extrabold text-[40px]">
                Order {cuisinename} Online
              </div>
            </div>

            <div className="w-3/5 mx-auto my-8">
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
                  placeholder="Search for restaurants"
                  onChange={handleChange}
                  className="w-full bg-surface-grey outline-none text-text-30 placeholder-text-60"
                />
                <SearchIcon className="text-text-30" />
              </div>
            </div>

            {isEmpty ? (
              <SmallEmptyScreen />
            ) : (
              <motion.div className="pl-2 grid grid-cols-4 gap-6 mt-6">
                {data?.data.allRestaurants.map((restaurant, i) => (
                  <motion.div key={i} className="w-full">
                    <RestaurantCard restaurant={restaurant} size="small" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </Async.Success>
      </Async.Root>
    </div>
  );
};
