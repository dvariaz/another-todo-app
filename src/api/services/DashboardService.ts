import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Consts
import { API_URL } from "@config/consts";

// Types
import { IDashboard } from "@dashboard/types/Dashboard";
import { ITask } from "@task/types/Task";
import { CreateTaskInTaskGroupDto } from "@api/types/DashboardServiceDtos";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["Dashboard"],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDashboards: builder.query<IDashboard[], void>({
      query: () => `dashboards`,
    }),
    getDashboard: builder.query<IDashboard, string>({
      query: (id) => `dashboards/${id}`,
      providesTags: (result, error, id) => {
        return [{ type: "Dashboard", id }];
      },
    }),
    createTaskInTaskGroup: builder.mutation<ITask, CreateTaskInTaskGroupDto>({
      query: ({ dashboard, taskGroup, position, ...taskPayload }) => {
        return {
          url: `dashboards/${dashboard}/task-groups/${taskGroup}`,
          method: "POST",
          body: { ...taskPayload, position },
        };
      },
      invalidatesTags: (result, error, { dashboard }) => [
        { type: "Dashboard", id: dashboard },
      ],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
  useGetDashboardQuery,
  useCreateTaskInTaskGroupMutation,
} = dashboardApi;
