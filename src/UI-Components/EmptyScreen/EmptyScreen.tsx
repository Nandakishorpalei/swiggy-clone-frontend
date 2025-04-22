import React from "react";

export const EmptyScreen = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-6 h-screen w-screen">
      <div className="w-96">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt=""
          className="h-64 ml-12 mb-4"
        />
        <div className="text-h5 font-bold text-center">No results</div>
        <div className="text-center text-body">
          Uh-oh! Looks like we're not serving what you're looking for at the
          moment. Please start afresh.
        </div>
      </div>
    </div>
  );
};
