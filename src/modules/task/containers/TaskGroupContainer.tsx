// Components
import TaskGroup from "@task/components/TaskGroup";

// Hooks
import useTaskGroup from "@task/hooks/useTaskGroup";
import TaskGroupSkeleton from "@task/components/TaskGroupSkeleton";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";
import useTaskMoving from "@dashboard/hooks/useTaskMoving";

interface ITaskGroupContainerProps {
  id: string;
}

const TaskGroupContainer = ({ id }: ITaskGroupContainerProps) => {
  const { taskGroup, error, isLoading } = useTaskGroup(id);
  const { addNewTask, moveTask } = useDashboardManager();
  const { taskMovingEvent, cleanMovingEvent } = useTaskMoving();

  if (error) return <div>{error}</div>;

  if (isLoading) return <TaskGroupSkeleton />;

  if (!taskGroup) return <div>Task group not found</div>;

  return (
    <TaskGroup
      id={id}
      name={taskGroup.name || ""}
      tasks={taskGroup.tasks}
      onDrop={async (position) => {
        if (taskMovingEvent.isMoving) {
          console.log({
            origin: taskMovingEvent.origin.taskGroupId,
            destination: id,
            position,
          });
          await moveTask({
            taskId: taskMovingEvent?.taskId || "",
            origin: {
              taskGroupId: taskMovingEvent?.origin?.taskGroupId || "",
              position: taskMovingEvent?.origin?.position || -1,
            },
            destination: { taskGroupId: id, position },
          });
          cleanMovingEvent();
        }
      }}
      onAddTask={(id) => {
        addNewTask(id);
      }}
    />
  );
};

export default TaskGroupContainer;
