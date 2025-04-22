import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../../Hooks/useToast";
import { useUpdateCartAddressMutation } from "../../store/api/cart";
import { RestaurantInfo } from "../../store/model/Restaurants";
import { SavedAddress } from "../../store/model/SavedAddress";
import { Button } from "../../UI-Components/Button/Button";
import { addressTypes } from "../Address/AddressTypeSelector";

export const geocodeAddress = (
  address: string
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location;
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        reject("Failed to geocode address");
      }
    });
  });
};

export const SavedAddressCard = ({
  address,
  restaurantDetails,
}: {
  address: SavedAddress;
  restaurantDetails: RestaurantInfo;
}) => {
  const dispatch = useDispatch();
  const [updateCartAddress, { isLoading }] = useUpdateCartAddressMutation();
  const { alertToast } = useToast();
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const selectedAddressType = addressTypes.find(
    ({ value }) => value === address.addressType
  );

  const handleAddressSelection = async () => {
    try {
      await updateCartAddress({
        addressId: address._id,
        estimatedTime: duration,
        distance: distance,
      }).unwrap();
    } catch (error: any) {
      alertToast({ message: error?.message || "Something went wrong!" });
    }
  };

  const calculateDistance = async () => {
    try {
      const restaurantAddress = `${restaurantDetails.name}, ${restaurantDetails.locality}, ${restaurantDetails.areaName}`;
      const restaurantCoords = await geocodeAddress(restaurantAddress);
      const userCoords = address.coordinates;

      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [userCoords],
          destinations: [restaurantCoords],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (
            status === "OK" &&
            response?.rows[0].elements[0].status === "OK"
          ) {
            const element = response.rows[0].elements[0];
            setDistance(Math.floor(element.distance.value / 1000));
            setDuration(Math.floor(element.duration.value / 60));
          } else {
            console.error("Error in Distance Matrix response:", response);
            setDistance(null);
            setDuration(null);
          }
        }
      );
    } catch (error) {
      console.error("Error calculating distance:", error);
      setDistance(null);
      setDuration(null);
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [address, restaurantDetails]);

  return (
    <div
      key={address._id}
      className="p-5 w-full flex gap-2 border border-solid border-neutral-10 bg-white cursor-pointer hover:shadow-hover-card-shadow"
    >
      {selectedAddressType?.icon ?? <FmdGoodOutlinedIcon />}

      <div className="min-h-40 flex flex-col justify-between">
        <div>
          <div className="text-text-100 text-subtitle">
            {address.addressName || address.addressType}
          </div>
          <div className="text-body-sm text-text-30">{address.address}</div>
        </div>
        <div>
          <div className="text-body text-text-100 font-semibold mt-4 mb-2">
            {distance && duration
              ? `${duration} mins (${distance} km)`
              : "Calculating distance..."}
          </div>
          <Button
            size="small"
            customType="special-primary"
            customColor="bg-[#1ba672] text-white"
            onClick={handleAddressSelection}
            isLoading={isLoading}
            disabled={isLoading}
          >
            DELIVER HERE
          </Button>
        </div>
      </div>
    </div>
  );
};
