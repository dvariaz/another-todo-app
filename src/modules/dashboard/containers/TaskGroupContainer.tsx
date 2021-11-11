import { useEffect } from "react";

// Components
import TaskGroup from "@task/components/TaskGroup";

// Hooks
import { useGetTaskGroupByIdQuery } from "@api/services/DashboardService";
import { useAppSelector } from "@common/hooks/rtk";
import { DashboardSelectors } from "@dashboard/store/slice";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";

interface ITaskGroupContainerProps {
  id: string;
}

const TaskGroupContainer = ({ id }: ITaskGroupContainerProps) => {
  // Get task group data
  const { data, error, isLoading } = useGetTaskGroupByIdQuery(id);
  const { updateTaskGroupTasks } = useDashboardManager();

  // Get task group state
  const tasks = useAppSelector((state) =>
    DashboardSelectors.selectTasksByTaskGroupId(state, id)
  );

  useEffect(() => {
    if (data?.tasks) {
      updateTaskGroupTasks(id, data.tasks);
    }
  }, [data?.tasks]);

  if (error) return <div>{error}</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Task group not found</div>;

  return <TaskGroup id={id} name={data.name} tasks={tasks} />;
};

export default TaskGroupContainer;
