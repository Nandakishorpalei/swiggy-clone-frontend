import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddCustomer } from "../AddCustomer/AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setShowLoginModal } from "../../store/slices/Auth";

export const Login = () => {
  const isOpen = useSelector((state: RootState) => state.auth.showLoginModal);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setShowLoginModal(false));
  };
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
        alt="Login"
        className="h-24 mx-auto my-4"
      />

      <AddCustomer onClose={onClose} />
    </Drawer>
  );
};
