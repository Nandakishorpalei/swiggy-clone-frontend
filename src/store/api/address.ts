import { emptyApi } from "./emptyApi";
import { SavedAddress, SavedAddressRequest } from "../model/SavedAddress";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getSavedAddress: build.query<{ data: { addresses: SavedAddress[] } }, void>(
      {
        query: () => {
          return {
            url: `/savedaddress`,
          };
        },
        providesTags: ["SavedAddress"],
      }
    ),
    addAddress: build.mutation<SavedAddress, { payload: SavedAddressRequest }>({
      query: ({ payload }) => {
        return {
          url: `/savedaddress/add`,
          method: "post",
          body: payload,
        };
      },
      invalidatesTags: ["SavedAddress"],
    }),
  }),
});

export const { useGetSavedAddressQuery, useAddAddressMutation } = extendedApi;
