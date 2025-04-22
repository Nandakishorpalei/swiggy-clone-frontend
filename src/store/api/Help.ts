import { emptyApi } from "./emptyApi";
import { Dish } from "../model/Dish";
import { TopRestaurantResponse } from "../model/Restaurants";
import qs from "qs";
import { HelpType, HelpTypeEnum } from "../model/Help";

export const restaurantsApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getHelpTypes: build.query<
      {
        data: {
          helpTypes: HelpType[];
        };
      },
      { isAuthenticated: boolean }
    >({
      query: ({ isAuthenticated }) => {
        return {
          url: `/help?isAuthenticated=${isAuthenticated}`,
        };
      },
      providesTags: ["Help"],
    }),
    getHelpTypeData: build.query<
      {
        data: {
          helpArticles: HelpType[];
        };
      },
      { type: HelpTypeEnum }
    >({
      query: ({ type }) => {
        return {
          url: `/help/${type}`,
        };
      },
      providesTags: ["HelpTypeData"],
    }),
  }),
});

export const { useGetHelpTypesQuery, useGetHelpTypeDataQuery } = restaurantsApi;
