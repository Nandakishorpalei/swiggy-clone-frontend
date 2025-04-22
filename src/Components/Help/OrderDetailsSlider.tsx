import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Order } from "../../store/model/Order";

const OrderDetailsSlider = ({
  isOpen,
  onClose,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}) => {
  const restaurant = order.items[0].restaurantId;

  return (
    <Drawer
      anchor="right" // Opens from the right side
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "400px", // Adjust width as needed
          padding: "24px",
        },
      }}
    >
      <div className="flex gap-4 items-center">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <h2 className="text-2xl font-semibold">Order #{order._id}</h2>
      </div>

      <div className="">
        <div></div>
        <div></div>
      </div>
    </Drawer>
  );
};

export default OrderDetailsSlider;
