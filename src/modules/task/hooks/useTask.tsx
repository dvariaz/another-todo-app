// Hooks
import {
  useGetTaskByIdQuery,
  useGetUsersByIdsQuery,
} from "@api/services/DashboardService";
import { useAppSelector } from "@common/hooks/rtk";

//Selectors
import { DashboardSelectors } from "@dashboard/store/slice";

const useTask = (id: string) => {
  // Fetching task data
  const {
    data,
    error,
    isLoading,
    isSuccess: isTaskFulfilled,
  } = useGetTaskByIdQuery(id, {
    skip: id.includes("pending"),
  });
  const { data: shared_users } = useGetUsersByIdsQuery(
    data?.shared_users || [],
    {
      skip: !isTaskFulfilled,
    }
  );

  // Selecting task state
  const taskState = useAppSelector((state) =>
    DashboardSelectors.selectTaskById(state, id)
  );

  return {
    task: { ...taskState, ...data, shared_users },
    error,
    isLoading,
  };
};

export default useTask;
