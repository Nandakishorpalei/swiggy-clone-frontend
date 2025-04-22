import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { useGetHelpTypeDataQuery } from "../../store/api/Help";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import { HelpTypeEnum } from "../../store/model/Help";
import NoOrders from "./NoOrders";
import { useGetAllOrdersQuery } from "../../store/api/order";
import dayjs from "dayjs";
import OrderDetailsSlider from "./OrderDetailsSlider";
import { useState } from "react";
import { Order } from "../../store/model/Order";
import { Button } from "../../UI-Components/Button/Button";
import { useReorderItemsMutation } from "../../store/api/cart";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Hooks/useToast";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const PastOrders = ({
  sectionDescription,
}: {
  sectionDescription: string;
}) => {
  const { data, isLoading, isError, isSuccess } = useGetAllOrdersQuery();
  const isEmpty =
    isSuccess && (!data?.data.orders || data?.data.orders?.length === 0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reorder, { isLoading: isReordering }] = useReorderItemsMutation();
  const navigate = useNavigate();
  const { alertToast } = useToast();

  const handleReorder = async (orderId: string) => {
    try {
      await reorder({ orderId: orderId }).unwrap();
      navigate("/checkout");
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <Async.Root
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      isEmpty={isEmpty}
      key="pastOrders"
    >
      <Async.Empty>
        <NoOrders />
      </Async.Empty>
      <Async.ErrorHandler>
        <ErrorScreen />
      </Async.ErrorHandler>
      <Async.Success>
        <div className="p-6">
          <div className="text-h4 font-bold">{sectionDescription}</div>

          {data?.data.orders?.map((order) => {
            const restaurant = order.items?.[0].restaurantId;
            const orderedItemDetails = order.items
              .map((item) => `${item.dishId.info.name} X ${item.quantity}`)
              .join(", ");

            return (
              <div
                key={order._id}
                className="border border-solid p-6 border-neutral-10"
              >
                <div className="flex justify-between pb-4 border border-dashed border-neutral-10 border-t-0 border-l-0 border-r-0">
                  <div className="flex gap-4">
                    <img
                      src={`${commonURL}${restaurant?.info.cloudinaryImageId}`}
                      alt=""
                      className="h-[100px] w-[150px] object-cover"
                    />
                    <div className="space-y-1">
                      <div className="text-subtitle-sm text-text-60">
                        {restaurant.info.name}
                      </div>
                      <div className="text-body-sm text-text-30">
                        {restaurant.info.areaName}
                      </div>
                      <div className="text-body-sm text-text-30">
                        #{order._id.substring(10)} |{" "}
                        {dayjs(order.createdAt).format(
                          "ddd, MMM D, YYYY, h:mm A"
                        )}
                      </div>
                      {/* <button
                        className="all:unset text-dark_orange text-subtitle-sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        VIEW DETAILS
                      </button> */}
                    </div>
                  </div>

                  <div className="text-body-sm text-text-60">
                    {order.status === "delivered"
                      ? "Delivered on "
                      : "To be delivered by "}
                    {dayjs(order.deliveryTime).format(
                      "ddd, MMM D, YYYY, h:mm A"
                    )}
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-body text-text-60">
                    {orderedItemDetails}
                  </div>
                  <div className="text-body-sm text-text-60">
                    Total Paid: ₹{(order.totalPrice / 100).toFixed(2)}
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    customColor="bg-dark_orange text-white"
                    customType="special-primary"
                    onClick={() => handleReorder(order._id)}
                    isLoading={isReordering}
                    disabled={isReordering}
                  >
                    REORDER
                  </Button>
                </div>
              </div>
            );
          })}
          {selectedOrder && (
            <OrderDetailsSlider
              isOpen={Boolean(selectedOrder)}
              onClose={() => setSelectedOrder(null)}
              order={selectedOrder}
            />
          )}
        </div>
      </Async.Success>
    </Async.Root>
  );
};
