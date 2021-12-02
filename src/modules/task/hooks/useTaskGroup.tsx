import { useEffect } from "react";

// Hooks
import { useGetTaskGroupByIdQuery } from "@api/services/DashboardService";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";
import { useAppSelector } from "@common/hooks/rtk";

// Selectors
import { DashboardSelectors } from "@dashboard/store/slice";

const useTaskGroup = (id: string) => {
  // Get task group data
  const { data, error, isLoading } = useGetTaskGroupByIdQuery(id);
  const { updateTaskGroupTasks } = useDashboardManager();

  // Get task group state
  const tasksState = useAppSelector((state) =>
    DashboardSelectors.selectTasksByTaskGroupId(state, id)
  );

  // Refresh task group client state after change
  useEffect(() => {
    if (data?.tasks) {
      updateTaskGroupTasks(id, data?.tasks);
    }
  }, [data?.tasks]);

  return {
    taskGroup: { ...data, tasks: tasksState },
    error,
    isLoading,
  };
};

export default useTaskGroup;
