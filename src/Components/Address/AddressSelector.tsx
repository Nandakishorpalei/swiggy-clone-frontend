import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddressForm } from "./AddressForm";

export const AddressSelector = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "550px",
          padding: "24px",
          paddingLeft: "140px",
        },
      }}
    >
      <div className="flex gap-6 items-center">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <h2 className="text-2xl font-semibold">Save delivery address</h2>
      </div>

      <AddressForm close={onClose} />
    </Drawer>
  );
};
