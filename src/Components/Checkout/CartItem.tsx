import { GetCartItem } from "../../store/model/Cart";
import { SmallNonVegIcon } from "../RestaurantDishes/NonVegIcon";
import { SmallVegIcon } from "../RestaurantDishes/VegIcon";
import { CartItemQuantitySelector } from "./CartItemQuantitySelector/CartItemQuantitySelector";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const CartItem = ({ item }: { item: GetCartItem }) => {
  const dish = item.dishId;
  const finalPrice = dish.info.finalPrice
    ? dish.info.finalPrice
    : dish.info.price;

  return (
    <div className="flex items-baseline gap-4 justify-between">
      <div className="gap-2 flex">
        <div className="w-fit mt-0.5">
          {dish.info.itemAttribute?.vegClassifier === "VEG" ? (
            <SmallVegIcon />
          ) : (
            <SmallNonVegIcon />
          )}
        </div>
        <div className="text-body-sm text-text-60">{dish.info.name}</div>
      </div>
      <div className="flex items-baseline gap-4">
        <div className="flex-1">
          <CartItemQuantitySelector item={item} />
        </div>
        <div className="text-right">
          {finalPrice && (
            <div className="text-body-sm font-semibold">
              ₹{(finalPrice / 100).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
