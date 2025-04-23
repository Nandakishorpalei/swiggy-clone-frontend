import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../Hooks/useToast";
import { GreenStar } from "../../Icons/GreenStar";
import { PriceTag } from "../../Icons/PriceTag";
import { useAddItemToCartMutation } from "../../store/api/cart";
import { AddonPayload } from "../../store/model/Cart";
import { Dish } from "../../store/model/Dish";
import { setShowLoginModal } from "../../store/slices/Auth";
import { RootState } from "../../store/store";
import { Button } from "../../UI-Components/Button/Button";
import { DifferentRestaurantPopup } from "../DifferentRestaurantPopup/DifferentRestaurantPopup";
import { Addons } from "./AddOns";
import { MoreDishDetails } from "./MoreDishDetails";
import { NonVegIcon } from "./NonVegIcon";
import { QuantitySelector } from "./QuantitySelector";
import { VegIcon } from "./VegIcon";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const DishCard = ({
  dish,
  currentRestaurant,
  isLoading = false,
}: {
  dish: Dish;
  currentRestaurant: string;
  isLoading?: boolean;
}) => {
  const [addItemToCart] = useAddItemToCartMutation();
  const [showDetails, setShowDetails] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const { alertToast } = useToast();
  const { items, restaurantId } = useSelector((state: RootState) => state.cart);
  const { quantity: dishQuantity } = items[dish._id] || {};
  const [showDifferentRestaurantPopup, setShowDifferentRestaurantPopup] =
    useState(false);
  const hasAddons = dish.info.addons && dish.info.addons.length > 0;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleAddToCart = async (options?: {
    addOns?: AddonPayload[];
    variant?: string;
  }) => {
    try {
      const { addOns = [], variant = "" } = options || {};
      await addItemToCart({
        item: {
          dishId: dish._id,
          quantity: 1,
          selectedAddons: addOns,
          selectedVariants: variant,
          restaurantId: currentRestaurant,
        },
      }).unwrap();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  const handleAdd = () => {
    if (!isAuthenticated) {
      dispatch(setShowLoginModal(true));
      return;
    }

    if (restaurantId && restaurantId !== currentRestaurant) {
      setShowDifferentRestaurantPopup(true);
    } else {
      handleAddOn();
    }
  };

  const handleAddOn = () => {
    if (hasAddons) {
      setShowAddons(true);
    } else {
      handleAddToCart();
    }
  };

  const finalPrice = dish.info.finalPrice
    ? dish.info.finalPrice
    : dish.info.price;
  const price = dish.info.finalPrice ? dish.info.price : null;

  return (
    <div className="bg-white flex justify-between">
      <div className="w-4/5">
        {dish.info.itemAttribute?.vegClassifier === "VEG" ? (
          <VegIcon />
        ) : (
          <NonVegIcon />
        )}
        <div className="mt-1 space-y-1">
          <h3 className="font-bold text-[18px]">{dish.info.name}</h3>
          <div className="flex gap-1 items-center">
            {price && (
              <div className="text-neutral-30 line-through">
                ₹{(price / 100).toFixed(2)}
              </div>
            )}
            {finalPrice && (
              <div className="text-body-lg font-semibold">
                ₹{(finalPrice / 100).toFixed(2)}
              </div>
            )}
            <PriceTag />
          </div>
          {dish.info.ratings.aggregatedRating.rating &&
            dish.info.ratings.aggregatedRating.ratingCountV2 && (
              <div className="flex items-center gap-1">
                <GreenStar />
                <div className="text-body text-green-70 font-semibold">
                  {dish.info.ratings.aggregatedRating.rating}
                  <span className="text-text-100 ml-0.5">
                    ({dish.info.ratings.aggregatedRating.ratingCountV2})
                  </span>
                </div>
              </div>
            )}
          <div
            role="button"
            onClick={() => setShowDetails(true)}
            className="text-body-sm !mt-2 w-fit text-text-30 border border-neutral-10 py-1 px-2 rounded-full flex items-center"
          >
            More Details
            <ArrowForwardIosIcon sx={{ fontSize: 12, marginLeft: "4px" }} />
          </div>
        </div>
      </div>
      <div className="relative flex justify-center mb-4">
        <img
          src={`${commonURL}${dish.info.imageId}`}
          alt={dish.info.name}
          className="w-32 h-32 object-cover rounded-xl"
        />
        <div
          className={classNames("absolute w-24", {
            "-bottom-4": !hasAddons || dishQuantity,
            "-bottom-8": hasAddons && !dishQuantity,
          })}
        >
          {dishQuantity ? (
            <QuantitySelector dishId={dish._id} />
          ) : (
            <Button block onClick={handleAdd}>
              <span className="text-green-70 font-bold">ADD</span>
            </Button>
          )}
          {hasAddons && !dishQuantity && (
            <div className="text-caption text-neutral-40 text-center">
              Customisable
            </div>
          )}
        </div>
      </div>
      <MoreDishDetails
        show={showDetails}
        onClose={() => setShowDetails(false)}
        dish={dish}
      />
      {showAddons && dish.info.addons && (
        <Addons
          show={showAddons}
          onClose={() => setShowAddons(false)}
          addon={dish.info.addons}
          onConfirm={(selectedAddons) => {
            handleAddToCart({ addOns: selectedAddons });
          }}
        />
      )}
      <DifferentRestaurantPopup
        show={showDifferentRestaurantPopup}
        close={() => setShowDifferentRestaurantPopup(false)}
        addNewItem={handleAddOn}
      />
    </div>
  );
};
