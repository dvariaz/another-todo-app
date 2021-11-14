import { motion } from "framer-motion";

// Components
import TaskCard from "@task/components/TaskCard";
import EditableTaskCard from "@task/components/EditableTaskCard";
import DropdownMenu from "@common/components/DropdownMenu";
import TaskCardSkeleton from "@task/components/TaskCardSkeleton";

// Hooks
import useTask from "@task/hooks/useTask";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";

interface ITaskContainerProps {
  id: string;
  index: number;
  taskGroupId: string;
}

const TaskContainer = ({ id, taskGroupId, index }: ITaskContainerProps) => {
  const { task, error, isLoading } = useTask(id);
  const { setTaskEditableStatus, removeNewTask, saveTask, removeTask } =
    useDashboardManager();

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

  return (
    <motion.div
      className="z-50"
      drag
      onDragEnd={(e: PointerEvent) => {
        console.log("client ", e.clientX, e.clientY);

        // const { clientX, clientY } = e;
        // onDragEnd && onDragEnd({ x: clientX, y: clientY });
      }}
    >
      <TaskCard
        key={id}
        title={task.title || ""}
        description={task.description || ""}
        shared_users={task.shared_users || []}
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
    </motion.div>
  );
};

export default TaskContainer;
