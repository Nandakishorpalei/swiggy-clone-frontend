import React from "react";

export const SmallEmptyScreen = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-6 h-76 w-full">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
        alt=""
        className="h-64 ml-8"
      />
      <div className="text-h5 font-bold text-center">No results</div>
      <div className="text-center text-body">
        Uh-oh! Looks like we're not serving what you're looking for at the
        moment. Please start afresh.
      </div>
    </div>
  );
};
