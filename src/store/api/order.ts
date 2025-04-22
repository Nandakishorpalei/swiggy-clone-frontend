import { Order } from "../model/Order";
import { emptyApi } from "./emptyApi";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createRazorpayOrder: build.mutation<{ order: any }, void>({
      query: () => ({
        url: `/order/payment`,
        method: "POST",
      }),
    }),

    verifyRazorpayPayment: build.mutation<
      { message: string },
      {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }
    >({
      query: (paymentResponse) => ({
        url: `/order/payment/verify`,
        method: "POST",
        body: paymentResponse,
      }),
      invalidatesTags: ["Orders", "Cart"],
    }),

    getAllOrders: build.query<
      {
        data: { orders: Order[] };
      },
      void
    >({
      query: () => {
        return {
          url: `/order`,
        };
      },
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
  useGetAllOrdersQuery,
} = extendedApi;
