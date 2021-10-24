import { API_URL } from "@config/consts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Dashboard } from "@dashboard/types/Dashboard";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDashboards: builder.query<Dashboard[], void>({
      query: () => `dashboards`,
    }),
    getDashboard: builder.query<Dashboard, string>({
      query: (id) => `dashboards/${id}`,
    }),
  }),
});

export const { useGetDashboardsQuery, useGetDashboardQuery } = dashboardApi;
