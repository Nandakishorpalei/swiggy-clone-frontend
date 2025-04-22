import { emptyApi } from "./emptyApi";
import { Dish } from "../model/Dish";
import { TopRestaurantResponse } from "../model/Restaurants";
import qs from "qs";

export const restaurantsApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDishes: build.query<
      {
        data: {
          dishes: Dish[];
          restaurant: TopRestaurantResponse;
        };
      },
      { restaurantId: string; query?: string | null }
    >({
      query: ({ restaurantId, query }) => {
        let queryUrl = qs.stringify(
          {
            query,
          },
          { skipNulls: true, addQueryPrefix: true }
        );
        return {
          url: `/dish/${restaurantId}/${queryUrl}`,
        };
      },
      providesTags: ["Dishes"],
    }),
  }),
});

export const { useGetAllDishesQuery } = restaurantsApi;
