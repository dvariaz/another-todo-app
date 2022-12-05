import { createApi } from "@reduxjs/toolkit/query/react";

// Types
import { IUser } from "@common/types/User";
import { IDashboard } from "@dashboard/types/Dashboard";
import { ITask, ITaskGroup } from "@task/types/Task";
import {
  ICreateTaskInTaskGroupDto,
  IMoveTaskDto,
} from "@api/types/DashboardServiceDtos";
import { baseQueryWithReauth } from "@common/utils/queries";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["User", "Dashboard", "TaskGroup", "Task"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => {
        return [{ type: "User", id }];
      },
    }),
    getUsersByIds: builder.query<IUser[], string[]>({
      async queryFn(usersIds, _queryApi, _extraOptions, fetchWithBQ) {
        const responses = await Promise.all(
          usersIds.map((userId) => fetchWithBQ(`users/${userId}`))
        );

        if (responses.some((response) => !!response.error)) {
          throw "Error fetching users";
        }

        const users: IUser[] = responses.map(
          (response) => response.data as IUser
        );

        return { data: users };
      },
      providesTags: (result, error, usersIds) => {
        return usersIds.map((id) => ({ type: "User", id }));
      },
    }),
    getDashboards: builder.query<IDashboard[], void>({
      query: () => `dashboards`,
    }),
    getDashboardById: builder.query<IDashboard, string>({
      query: (id) => `dashboards/${id}`,
      providesTags: (result, error, id) => {
        return [{ type: "Dashboard", id }];
      },
    }),
    getTaskGroupById: builder.query<ITaskGroup, string>({
      query: (id) => `task-groups/${id}`,
      providesTags: (result, error, id) => {
        return [{ type: "TaskGroup", id }];
      },
    }),
    getTaskById: builder.query<ITask, string>({
      query: (id) => `tasks/${id}`,
      providesTags: (result, error, id) => {
        return [{ type: "Task", id }];
      },
    }),
    updateTask: builder.mutation<ITask, Partial<ITask>>({
      query: ({ _id, ...payload }) => {
        return {
          url: `tasks/${_id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        {
          type: "Task",
          id: _id,
        },
      ],
    }),
    deleteTask: builder.mutation<
      ITask,
      { taskId: string; taskGroupId: string }
    >({
      query: ({ taskId, taskGroupId }) => {
        return {
          url: `task-groups/${taskGroupId}/task/${taskId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { taskGroupId }) => [
        {
          type: "TaskGroup",
          id: taskGroupId,
        },
      ],
    }),
    createTaskInTaskGroup: builder.mutation<ITask, ICreateTaskInTaskGroupDto>({
      query: ({ taskGroupId, position, ...taskPayload }) => {
        return {
          url: `task-groups/${taskGroupId}`,
          method: "POST",
          body: { ...taskPayload, position },
        };
      },
      invalidatesTags: (result, error, { taskGroupId }) => [
        { type: "TaskGroup", id: taskGroupId },
      ],
    }),
    moveTask: builder.mutation<any, IMoveTaskDto>({
      query: ({ taskId, origin, destination }) => {
        return {
          url: "tasks/move",
          method: "PATCH",
          body: {
            task: taskId,
            origin: {
              task_group: origin.taskGroupId,
              position: origin.position,
            },
            destination: {
              task_group: destination.taskGroupId,
              position: destination.position,
            },
          },
        };
      },
      invalidatesTags: (result, error, { origin, destination }) => [
        {
          type: "TaskGroup",
          id: origin.taskGroupId,
        },
        {
          type: "TaskGroup",
          id: destination.taskGroupId,
        },
      ],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersByIdsQuery,
  useGetDashboardsQuery,
  useGetDashboardByIdQuery,
  useGetTaskGroupByIdQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskInTaskGroupMutation,
  useMoveTaskMutation,
} = dashboardApi;
