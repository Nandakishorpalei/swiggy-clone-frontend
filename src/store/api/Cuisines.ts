import { emptyApi } from "./emptyApi";
import { Dish } from "../model/Dish";
import { TopRestaurantResponse } from "../model/Restaurants";
import qs from "qs";

export const restaurantsApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDishesByCuisine: build.query<
      {
        data: {
          dishes: Dish[];
        };
      },
      { cuisinename: string; query: string | null }
    >({
      query: ({ cuisinename, query }) => {
        let queryUrl = qs.stringify(
          {
            query,
          },
          { skipNulls: true, addQueryPrefix: true }
        );
        return {
          url: `/cuisine/${cuisinename}/${queryUrl}`,
        };
      },
      providesTags: ["Cuisine"],
    }),
  }),
});

export const { useGetAllDishesByCuisineQuery } = restaurantsApi;
