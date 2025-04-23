import { useNavigate } from "react-router-dom";
import { GreenStar } from "../../Icons/GreenStar";
import { OneIcon } from "../../Icons/OneIcon";
import { TopRestaurantResponse } from "../../store/model/Restaurants";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const RestaurantCard = ({
  restaurant,
  isFromTopRestaurants,
  size = "regular",
  isLoading = false,
}: {
  restaurant: TopRestaurantResponse;
  isFromTopRestaurants?: boolean;
  size?: "regular" | "small";
  isLoading?: boolean;
}) => {
  const { info } = restaurant;
  const navigate = useNavigate();

  return (
    <div className="relative hover:scale-95 transition-all w-full">
      {info.loyaltyDiscoverPresentationInfo?.freedelMessage && (
        <div className="absolute top-2 z-[8] -left-2 text-white px-3 py-1 text-sm rounded-md font-bold flex items-center gap-1 bg-dark_orange">
          <OneIcon />
          {info.loyaltyDiscoverPresentationInfo?.freedelMessage}
        </div>
      )}
      <div className="overflow-hidden w-full">
        <div
          className="relative"
          onClick={() =>
            navigate(
              `/restaurant/${isFromTopRestaurants ? restaurant.restaurantId : restaurant._id}`
            )
          }
          role="button"
        >
          <img
            src={`${commonURL}${info.cloudinaryImageId}`}
            alt={info.name}
            className="w-full h-48 object-cover rounded-2xl"
          />
          <div className="absolute z-10 inset-0 h-full w-full rounded-2xl shadow-[rgba(0,_0,_0,_0.9)_0px_-60px_50px_-30px_inset]"></div>
          <div className="absolute bottom-2 z-[20] left-2 bg-black text-white px-3 py-1 text-sm rounded-md font-bold ">
            {info.aggregatedDiscountInfoV3?.header}{" "}
            {info.aggregatedDiscountInfoV3?.subHeader}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-[18px] font-semibold">{info.name}</h2>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="flex items-center gap-1 text-body-lg">
              <GreenStar /> {info.avgRating}
            </span>
            <span className="text-body-lg font-bold">
              • {info.sla.slaString}
            </span>
          </div>
          <p className="text-body-lg mt-1 font-extralight line-clamp-1">
            {info.cuisines.join(", ")}
          </p>
          <p className="text-body-lg mt-0.5 font-extralight">{info.areaName}</p>
        </div>
      </div>
    </div>
  );
};
