import { emptyApi } from "./emptyApi";
import { CartItem, CartGetResponse, CartPostResponse } from "../model/Cart";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getCartItems: build.query<{ data?: { cart: CartGetResponse } }, void>({
      query: () => {
        return {
          url: `/cart`,
        };
      },
      providesTags: ["Cart"],
    }),
    addItemToCart: build.mutation<CartPostResponse, { item: CartItem }>({
      query: ({ item }) => {
        return {
          url: `/cart/add`,
          method: "post",
          body: item,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateItemQuantity: build.mutation<
      CartPostResponse,
      { itemId: string; quantity: number }
    >({
      query: ({ itemId, quantity }) => {
        return {
          url: `/cart/update/${itemId}`,
          method: "PATCH",
          body: { quantity },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    clearCart: build.mutation<CartPostResponse, void>({
      query: () => {
        return {
          url: `/cart/clear`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateCartAddress: build.mutation<
      CartPostResponse,
      {
        addressId: string;
        estimatedTime: number | null;
        distance: number | null;
      }
    >({
      query: ({ addressId, estimatedTime, distance }) => {
        return {
          url: `/cart/address`,
          method: "PATCH",
          body: { addressId, estimatedTime, distance },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    reorderItems: build.mutation<CartPostResponse, { orderId: string }>({
      query: ({ orderId }) => {
        return {
          url: `/cart/reorder/${orderId}`,
          method: "post",
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddItemToCartMutation,
  useUpdateItemQuantityMutation,
  useClearCartMutation,
  useUpdateCartAddressMutation,
  useReorderItemsMutation,
} = extendedApi;
