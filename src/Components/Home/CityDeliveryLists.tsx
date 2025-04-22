import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const CityDeliveryList = ({
  title,
  cities,
}: {
  title: string;
  cities: string[];
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCities = showAll ? cities : cities.slice(0, 8);
  const navigate = useNavigate();

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleCities.map((city, index) => (
          <button
            key={index}
            onClick={() => navigate(`/city/${city.toLowerCase()}`)}
            className="border border-neutral-10 text-body rounded-lg p-4 text-center text-black hover:bg-gray-100 transition"
          >
            Order food online in {city}
          </button>
        ))}
        {cities.length > 8 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="border border-gray-300 rounded-lg p-4 text-center text-dark_orange hover:bg-gray-100 transition flex items-center justify-center"
          >
            Show More{" "}
            <ExpandMoreIcon fontSize="medium" sx={{ color: "#ff5200" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export const CityDeliveryLists = () => {
  const foodCities = [
    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Chennai",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur",
  ];

  const groceryCities = [...foodCities];

  return (
    <div className="w-4/5 mx-auto">
      <CityDeliveryList title="Cities with food delivery" cities={foodCities} />
    </div>
  );
};
