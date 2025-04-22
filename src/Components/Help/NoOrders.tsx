import React from "react";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h2 className="text-h4 font-semibold text-gray-900">No past orders</h2>
      <div className="mt-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3354/3354138.png"
          alt="No orders"
          className="w-40 h-40"
        />
      </div>
      <p className="mt-4 text-gray-600 text-lg">
        Once you place an order, <br />
        you’ll see it here.
      </p>
    </div>
  );
};

export default NoOrders;
