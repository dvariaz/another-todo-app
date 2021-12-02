import { SyntheticEvent } from "react";

// Components
import TaskCard from "@task/components/TaskCard";
import EditableTaskCard from "@task/components/EditableTaskCard";
import DropdownMenu from "@common/components/DropdownMenu";
import TaskCardSkeleton from "@task/components/TaskCardSkeleton";

// Hooks
import useTask from "@task/hooks/useTask";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";
import useTaskMoving from "@dashboard/hooks/useTaskMoving";

interface ITaskContainerProps {
  id: string;
  index: number;
  taskGroupId: string;
  onDrop?: (position: number) => void;
}

const TaskContainer = ({
  id,
  taskGroupId,
  index,
  onDrop,
}: ITaskContainerProps) => {
  const { task, error, isLoading } = useTask(id);
  const { setTaskEditableStatus, removeNewTask, saveTask, removeTask } =
    useDashboardManager();
  const { taskMovingEvent, startTaskMoving } = useTaskMoving();

  if (error) return <div>{error}</div>;

  if (isLoading) return <TaskCardSkeleton className="mb-4" />;

  if (task === undefined) return <div>Task not found</div>;

  if (task.isEditing) {
    return (
      <EditableTaskCard
        id={id}
        key={id}
        title={task.title}
        description={task.description}
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
  // TODO: Make helpers to indicate where the card is going to be placed depending the event onMouseEnter
  return (
    <TaskCard
      key={id}
      title={task.title || ""}
      description={task.description || ""}
      shared_users={task.shared_users || []}
      highlightableText={!taskMovingEvent.isMoving}
      className="mb-4"
      isCollapsed={task.isMoving}
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
      onClick={() => setTaskEditableStatus(id, true)}
      onIndicatorDragStart={(e: SyntheticEvent) => {
        if (e.currentTarget) {
          startTaskMoving(
            id,
            taskGroupId,
            index,
            e.currentTarget.getBoundingClientRect().toJSON()
          );
        }
      }}
      onMouseUp={(e) => {
        if (taskMovingEvent.isMoving) {
          onDrop && onDrop(index);
        }
      }}
    />
  );
};

export default TaskContainer;
