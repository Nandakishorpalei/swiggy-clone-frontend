import React from "react";
import { RestaurantInfo } from "../../store/model/Restaurants";
import { GreenStar } from "../../Icons/GreenStar";
import { Link } from "react-router-dom";

export const RestaurantDetails = ({
  restaurantInfo,
}: {
  restaurantInfo: RestaurantInfo;
}) => {
  return (
    <div className="w-full mt-8">
      <h1 className="text-[32px] font-bold mb-8">{restaurantInfo.name}</h1>
      <div
        className="w-full p-6 pt-0 mx-auto rounded-3xl mb-12"
        style={{
          background:
            "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        }}
      >
        <div className="bg-white rounded-3xl p-4 border border-neutral-10">
          <div className="flex items-center gap-2 text-subtitle text-text-100">
            <span className="flex items-center gap-1">
              <GreenStar /> {restaurantInfo.avgRating} (
              {restaurantInfo.totalRatingsString} ratings)
            </span>
            <span>&bull;</span>
            <span>{restaurantInfo.costForTwo}</span>
          </div>
          <div className="mt-2 text-gray-700 text-sm font-semibold">
            <span className="text-dark_orange text-subtitle-sm">
              {restaurantInfo.cuisines.map((cuisine, index) => (
                <Link
                  key={index}
                  to={`/cuisine/${cuisine}`}
                  className="underline text-subtitle-sm"
                >
                  {cuisine}
                  {index < restaurantInfo.cuisines.length - 1 && ", "}
                </Link>
              ))}
            </span>
          </div>

          <div className="h-10 flex mt-4 gap-4">
            <div className="h-4/5 my-auto relative border border-neutral-10 w-[2px]">
              <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-neutral-10"></div>
              <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-neutral-10"></div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex gap-1 items-center -mt-1">
                <span className="text-subtitle-sm">Outlet: </span>
                <span className="text-body-sm font-extralight">
                  {restaurantInfo.locality}
                </span>
              </div>
              <span className="text-subtitle-sm mt-1">
                {restaurantInfo.sla.slaString}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
