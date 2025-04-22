import React from "react";
import { useGetSavedAddressQuery } from "../../../store/api/address";
import Async from "../../../UI-Components/Async/Async";
import ErrorScreen from "../../../UI-Components/ErrorScreen/ErrorScreen";
import { ManageAddressCard } from "./ManageAddressCard";

export const ManageAddress = () => {
  const { data, isLoading, isError, isSuccess } = useGetSavedAddressQuery();
  return (
    <Async.Root
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      isEmpty={false}
      key="helpDetails"
    >
      <Async.Empty>
        <></>
      </Async.Empty>
      <Async.ErrorHandler>
        <ErrorScreen />
      </Async.ErrorHandler>
      <Async.Success>
        <div className="p-6">
          <div className="text-h4 font-semibold">Manage Addresses</div>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {isSuccess &&
              data?.data?.addresses?.map((address) => (
                <ManageAddressCard key={address._id} address={address} />
              ))}
          </div>
        </div>
      </Async.Success>
    </Async.Root>
  );
};
