import React from "react";
import { Box } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const LocationAddIcon = () => {
  return (
    <Box position="relative" display="inline-block">
      <RoomOutlinedIcon
        fontSize="large"
        style={{ fontWeight: "100", color: "#3b1818" }}
      />
      <AddCircleIcon
        fontSize="small"
        sx={{
          color: "green",
          position: "absolute",
          top: -5,
          right: -2,
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};
