import { emptyApi } from "./emptyApi";
import { User } from "../model/User";

export const usersApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getUserByPhone: build.query<{ user: User | null }, { phone: string }>({
      query: ({ phone }) => {
        return {
          url: `/users/${encodeURIComponent(phone)}`,
        };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUserByPhoneQuery, useLazyGetUserByPhoneQuery } = usersApi;
