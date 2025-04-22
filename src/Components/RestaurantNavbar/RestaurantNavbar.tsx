import React, { useEffect } from "react";
import { SwiggyLogoOnly } from "../../Icons/SwiggyLogoOnly";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../utils/capitalize";
import { useGetCartItemsQuery } from "../../store/api/cart";
import { updateCartItems, updateRestaurant } from "../../store/slices/Cart";
import { Button } from "../../UI-Components/Button/Button";
import { setShowLoginModal } from "../../store/slices/Auth";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import useAuth from "../../Hooks/useAuth";

export const RestaurantNavbar = ({ title }: { title: string }) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const isHelpActive = location.pathname.includes("/help");
  const isProfileActive = location.pathname.includes("/profile");
  const isCartActive = location.pathname.includes("/checkout");

  const activeStyle = "text-dark_orange";
  const iconStyle = (isActive: boolean) => (isActive ? activeStyle : "");

  useEffect(() => {
    if (data?.data?.cart?.items?.length) {
      const itemsWithQuantity: {
        [key: string]: { quantity: number; restaurantId: string };
      } = {};
      data.data.cart.items.forEach((item) => {
        const itemId = item.dishId._id;
        itemsWithQuantity[itemId] = {
          quantity: item.quantity,
          restaurantId: item.restaurantId?._id,
        };
      });
      dispatch(updateCartItems(itemsWithQuantity));
      dispatch(updateRestaurant(data.data.cart.items[0].restaurantId?._id));
    } else if (!isLoading) {
      dispatch(updateCartItems({}));
      dispatch(updateRestaurant(""));
    }
  }, [data?.data?.cart?.items, isLoading]);

  return (
    <div className="sticky top-0 bg-white shadow-md gap-4 py-4 px-[10%] flex items-center justify-between text-xl font-semibold z-10">
      <div className="flex items-center gap-4">
        <Button
          customType="transparent"
          size="small"
          onClick={() => navigate("/restaurant")}
        >
          <SwiggyLogoOnly />
        </Button>
        <span>{title}</span>
      </div>

      <div className="flex items-center gap-6 text-body font-normal">
        <div
          className={`flex items-center gap-1 cursor-pointer ${iconStyle(isHelpActive)}`}
          onClick={() => navigate("/help")}
        >
          <HelpOutlineIcon className={iconStyle(isHelpActive)} />
          <span className={iconStyle(isHelpActive)}>Help</span>
        </div>

        {user?.name ? (
          <div
            className={`flex items-center gap-1 cursor-pointer ${iconStyle(isProfileActive)}`}
            onClick={() => navigate("/profile")}
          >
            <PersonOutlineIcon className={iconStyle(isProfileActive)} />
            <span>{capitalizeWords(user.name) || "USER"}</span>
          </div>
        ) : (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => dispatch(setShowLoginModal(true))}
          >
            <PersonOutlineOutlinedIcon />
            <span>Sign in</span>
          </div>
        )}

        {user?.name && (
          <div
            className={`flex items-center gap-1 cursor-pointer ${iconStyle(isCartActive)}`}
            onClick={() => navigate("/checkout")}
          >
            {!data?.data?.cart?.items ||
            data?.data?.cart?.items.length === 0 ? (
              <ShoppingBagOutlinedIcon className={iconStyle(isCartActive)} />
            ) : (
              <span className="px-1.5 bg-dark_green-50 text-surface font-medium flex justify-center items-center">
                {data.data.cart.items.length}
              </span>
            )}
            <span>Cart</span>
          </div>
        )}
        {user?.name && (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={logout}
          >
            <PersonOutlineOutlinedIcon />
            <span>Sign out</span>
          </div>
        )}
      </div>
    </div>
  );
};
