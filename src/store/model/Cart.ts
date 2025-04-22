import { Dish } from "./Dish";
import { RestaurantInfo } from "./Restaurants";
import { SavedAddress } from "./SavedAddress";

export type CartPayload = {
  userId: string;
  items: CartItem[];
};

export type CartItem = {
  dishId: string;
  quantity: number;
  selectedAddons: AddonPayload[];
  selectedVariants: string;
  restaurantId: string;
};

export type AddonPayload = {
  name: string;
  id: string;
  groupId: string;
};

export type CartPostResponse = {
  _id: string;
  userId: string;
  items: CartItem[];
};

export type CartGetResponse = {
  _id: string;
  userId: string;
  items: GetCartItem[];
  totalPrice: number;
  selectedAddress: SavedAddress | null;
  estimatedTime: number;
  distance: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCartItem = {
  dishId: Dish;
  quantity: number;
  selectedAddons: AddonPayload[];
  selectedVariants: Record<string, any>;
  restaurantId: { info: RestaurantInfo; _id: string };
};
