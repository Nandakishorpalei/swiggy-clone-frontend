import React from "react";
import { SavedAddress } from "../../../store/model/SavedAddress";
import { addressTypes } from "../../Address/AddressTypeSelector";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Button } from "../../../UI-Components/Button/Button";

export const ManageAddressCard = ({ address }: { address: SavedAddress }) => {
  const selectedAddressType = addressTypes.find(
    ({ value }) => value === address.addressType
  );

  return (
    <div
      key={address._id}
      className="p-5 w-full flex gap-2 border border-solid border-neutral-10 bg-white cursor-pointer"
    >
      {selectedAddressType?.icon ?? <FmdGoodOutlinedIcon />}

      <div className="min-h-20 flex flex-col justify-between">
        <div>
          <div className="text-text-60 text-subtitle">
            {address.addressName || address.addressType}
          </div>
          <div className="text-body-sm text-text-30">{address.address}</div>
        </div>
        {/* <div className="flex gap-6 mt-2">
          <button className="all:unset text-dark_orange text-subtitle-sm">
            EDIT
          </button>
          <button className="all:unset text-dark_orange text-subtitle-sm">
            DELETE
          </button>
        </div> */}
      </div>
    </div>
  );
};
