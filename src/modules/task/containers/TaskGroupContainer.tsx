// Components
import TaskGroup from "@task/components/TaskGroup";

// Hooks
import useTaskGroup from "@task/hooks/useTaskGroup";
import TaskGroupSkeleton from "@task/components/TaskGroupSkeleton";

interface ITaskGroupContainerProps {
  id: string;
}

const TaskGroupContainer = ({ id }: ITaskGroupContainerProps) => {
  const { taskGroup, error, isLoading } = useTaskGroup(id);

  if (error) return <div>{error}</div>;

  if (isLoading) return <TaskGroupSkeleton />;

  if (!taskGroup) return <div>Task group not found</div>;

  return (
    <TaskGroup id={id} name={taskGroup.name || ""} tasks={taskGroup.tasks} />
  );
};

export default TaskGroupContainer;
