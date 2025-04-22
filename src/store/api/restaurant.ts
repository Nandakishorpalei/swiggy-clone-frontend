import { emptyApi } from "./emptyApi";
import { Offer, TopRestaurantResponse } from "../model/Restaurants";
import QueryString from "qs";

export const restaurantsApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRestaurants: build.query<
      {
        data: {
          offers: Offer[];
          topRestaurants: TopRestaurantResponse[];
          allRestaurants: TopRestaurantResponse[];
        };
      },
      void
    >({
      query: () => {
        return {
          url: `/restaurants`,
        };
      },
      providesTags: ["Offers"],
    }),
    getRestaurantsBasedOnFood: build.query<
      {
        data: {
          allRestaurants: TopRestaurantResponse[];
        };
      },
      { foodname: string }
    >({
      query: ({ foodname }) => {
        return {
          url: `/restaurants/food/${foodname}`,
        };
      },
      providesTags: ["Offers"],
    }),
    getRestaurantsBasedOnCuisine: build.query<
      {
        data: {
          allRestaurants: TopRestaurantResponse[];
        };
      },
      { cuisinename: string; search?: string | null }
    >({
      query: ({ cuisinename, search }) => {
        let queryUrl = QueryString.stringify(
          {
            search,
          },
          { skipNulls: true, addQueryPrefix: true }
        );
        return {
          url: `/restaurants/cuisine/${cuisinename}${queryUrl}`,
        };
      },
      providesTags: ["Offers"],
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantsBasedOnFoodQuery,
  useGetRestaurantsBasedOnCuisineQuery,
} = restaurantsApi;
