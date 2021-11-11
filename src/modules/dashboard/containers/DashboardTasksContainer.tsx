import { useEffect } from "react";

// Types
import { ITaskGroup } from "@task/types/Task";

// Components
import TaskGroupContainer from "./TaskGroupContainer";

// Hooks
import { useAppSelector } from "@common/hooks/rtk";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";

// Selectors
import { DashboardSelectors } from "@dashboard/store/slice";

interface IDashboardTasksContainerProps {
  initialTaskGroups: Pick<ITaskGroup, "_id" | "tasks">[];
}

const DashboardTasksContainer = ({
  initialTaskGroups,
}: IDashboardTasksContainerProps) => {
  const taskGroups = useAppSelector(DashboardSelectors.selectTaskGroups);
  const { setTaskGroups } = useDashboardManager();

  useEffect(() => {
    setTaskGroups(initialTaskGroups);
  }, []);

  return (
    <div className="inline-flex">
      {Object.keys(taskGroups).map((taskGroupId) => (
        <div key={taskGroupId} className="mx-2 first:ml-8 last:mr-8">
          <TaskGroupContainer id={taskGroupId} />
        </div>
      ))}
      <div className="first:ml-8 last:mr-8">
        <div className="task-group items-center">
          <button className="btn w-full">Add Group</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTasksContainer;
