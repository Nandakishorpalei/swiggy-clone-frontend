import { useToast } from "../../Hooks/useToast";
import { useAddItemToCartMutation } from "../../store/api/cart";
import { GetCartItem } from "../../store/model/Cart";
import { SmallNonVegIcon } from "../RestaurantDishes/NonVegIcon";
import { SmallVegIcon } from "../RestaurantDishes/VegIcon";
import { CartItemQuantitySelector } from "./CartItemQuantitySelector/CartItemQuantitySelector";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const CartItem = ({ item }: { item: GetCartItem }) => {
  const dish = item.dishId;
  const [addItemToCart] = useAddItemToCartMutation();
  const finalPrice = dish.info.finalPrice
    ? dish.info.finalPrice
    : dish.info.price;
  const price = dish.info.finalPrice ? dish.info.price : null;
  const { alertToast } = useToast();
  if (dish.info.addons?.length && dish.info.addons?.length > 0)
    console.log(dish.info.name, dish.info.addons);

  // const handleAddToCart = (options?: {
  //   addOns?: AddonPayload[];
  //   variant?: string;
  // }) => {
  //   try {
  //     const { addOns = [], variant = "" } = options || {};
  //     addItemToCart({
  //       item: {
  //         dishId: dish._id,
  //         quantity: 1,
  //         selectedAddons: addOns,
  //         selectedVariants: variant,
  //       },
  //     });
  //   } catch (error: any) {
  //     console.log({ error });
  //     alertToast({ message: error.message || "Something went wrong!" });
  //   }
  // };

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
