import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartProps = {
  items: { [key: string]: { quantity: number } };
  restaurantId: string;
};

const initialState: CartProps = {
  items: {},
  restaurantId: "",
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (
      state,
      action: PayloadAction<{
        [key: string]: { quantity: number };
      }>
    ) => {
      state.items = action.payload;
    },
    updateRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload || "";
    },
  },
});

export const { updateCartItems, updateRestaurant } = cart.actions;

export default cart.reducer;
