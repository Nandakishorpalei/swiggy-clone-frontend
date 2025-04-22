import { Dish } from "./Dish";
import { RestaurantInfo } from "./Restaurants";

export type OrderItem = {
  dishId: Dish;
  quantity: number;
  selectedAddons: { name: string; price: number }[];
  selectedVariants: Record<string, any>;
  restaurantId: { info: RestaurantInfo; _id: string };
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "placed" | "delivered" | "canceled";
  createdAt: string;
  updatedAt: string;
  deliveryTime: string;
};
