import { useEffect, useState } from "react";
import { SolidCheck } from "../../Icons/SolidCheck";
import { useGetSavedAddressQuery } from "../../store/api/address";
import { useGetCartItemsQuery } from "../../store/api/cart";
import { Button } from "../../UI-Components/Button/Button";
import { AddressShimmerLoader } from "../../UI-Components/Shimmer/Shimmer";
import { AddressSelector } from "../Address/AddressSelector";
import { LocationAddIcon } from "./LocationAdd";
import { SavedAddressCard } from "./SavedAddressCard";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

export const SavedAddress = ({
  setCurrentStep,
}: {
  setCurrentStep: (val: "ADDRESS" | "PAYMENT") => void;
}) => {
  const {
    data: cartDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetCartItemsQuery();
  const { data: savedAddresses } = useGetSavedAddressQuery();
  const cart = cartDetails?.data?.cart;
  const selectedAddress = cart?.selectedAddress;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSelectedAddress, setShowSelectedAddress] = useState(false);

  useEffect(() => {
    if (cart?.selectedAddress) {
      setShowSelectedAddress(true);
    } else {
      setShowSelectedAddress(false);
    }
  }, [cart?.selectedAddress]);

  if (isLoading) {
    return <AddressShimmerLoader />;
  }

  if (showSelectedAddress && selectedAddress) {
    return (
      <div
        className="bg-surface p-6"
        onClick={() => {
          setCurrentStep("ADDRESS");
          setShowSelectedAddress(false);
        }}
        role="button"
      >
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="text-subtitle font-semibold text-text-100">
                Delivery address
              </div>
              <div className="text-[#1ba672]">
                <SolidCheck />
              </div>
            </div>
            <button className="all:unset text-dark_orange text-subtext font-semibold">
              CHANGE
            </button>
          </div>
          <div className="mt-6">
            <div className="text-body font-semibold text-text-100">
              {selectedAddress.addressName || selectedAddress.addressType}
            </div>
            <div className="text-body-sm text-text-30">
              {selectedAddress.address}
            </div>
          </div>
          <div className="text-body text-text-100 font-semibold mt-4">
            {cart?.estimatedTime && cart.distance
              ? `${cart?.estimatedTime} mins (${cart.distance} km)`
              : "Calculating distance..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6">
      <div className="mb-8 mt-2">
        <div className="text-subtitle font-semibold text-text-100">
          Choose a delivery address
        </div>
        <div className="text-subtitle-sm font-medium text-neutral-30">
          Multiple addresses in this location
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {cartDetails?.data?.cart &&
          savedAddresses?.data.addresses.map((address) => (
            <SavedAddressCard
              key={address._id}
              address={address}
              restaurantDetails={
                cartDetails?.data?.cart.items[0].restaurantId.info!
              }
            />
          ))}
        <div
          className="p-5 w-full hover:shadow-hover-card-shadow flex gap-2 border border-solid border-neutral-10 bg-white cursor-pointer"
          role="button"
          onClick={() => setOpenDrawer(true)}
        >
          <LocationAddIcon />
          <div className="min-h-40 flex justify-between flex-col">
            <div className="text-text-100 text-subtitle">Add new Address</div>
            <Button
              customType="special-primary"
              customColor="border-solid border-[#1ba672] text-[#1ba672] bg-white"
            >
              ADD NEW
            </Button>
          </div>
        </div>
      </div>
      <AddressSelector
        onClose={() => setOpenDrawer(false)}
        isOpen={openDrawer}
      />
    </div>
  );
};
