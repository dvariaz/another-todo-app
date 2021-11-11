// Types
import { ITask } from "@task/types/Task";

// Components
import TaskCard from "@task/components/TaskCard";
import EditableTaskCard from "@task/components/EditableTaskCard";
import DropdownMenu from "@common/components/DropdownMenu";

// Hooks
import {
  useGetTaskByIdQuery,
  useGetUsersByIdsQuery,
} from "@api/services/DashboardService";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";
import { useAppSelector } from "@common/hooks/rtk";

//Selectors
import { DashboardSelectors } from "@dashboard/store/slice";

interface ITaskContainerProps {
  id: string;
  index: number;
  taskGroupId: string;
}

const TaskContainer = ({ id, taskGroupId, index }: ITaskContainerProps) => {
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

  const { setTaskEditableStatus, removeNewTask, saveTask, removeTask } =
    useDashboardManager();
  const task = useAppSelector((state) =>
    DashboardSelectors.selectTaskById(state, id)
  );

  if (error) return <div>{error}</div>;

  if (isLoading) return <div>Loading...</div>;

  if (task === undefined) return <div>Task not found</div>;

  if (task.isEditing) {
    return (
      <EditableTaskCard
        id={id}
        key={id}
        {...data}
        className="mb-4"
        onSave={async (data, isNew) => {
          saveTask({
            isNew,
            taskId: id,
            taskGroupId,
            payload: data,
            index: index,
          });
          if (isNew) {
            removeNewTask(taskGroupId, id);
          }
        }}
        onBlur={(isNew, isDirty) => {
          if (!isDirty) {
            if (isNew) {
              removeNewTask(taskGroupId, id);
            } else {
              setTaskEditableStatus(id, false);
            }
          }
        }}
      />
    );
  }

  if (data === undefined) return <div>Task not found</div>;

  return (
    <TaskCard
      key={id}
      title={data.title || ""}
      description={data.description || ""}
      shared_users={shared_users || []}
      options={
        <DropdownMenu
          icon="more"
          iconClassName="text-lg text-gray-300"
          items={[
            {
              label: "Eliminar",
              callback: () => removeTask({ taskId: id, taskGroupId }),
            },
          ]}
        />
      }
      className="mb-4"
      onClick={() => setTaskEditableStatus(id, true)}
    />
  );
};

export default TaskContainer;
