import classNames from "classnames";

import "@task/styles/TaskCard.css";

interface ITaskCardSkeletonProps {
  className?: string;
}

const TaskCardSkeleton = ({ className }: ITaskCardSkeletonProps) => {
  return (
    <div className={classNames("task-card card flex flex-col", className)}>
      <div className="text-skeleton w-3/4"></div>
      <div className="text-skeleton w-full"></div>
      <div className="text-skeleton w-full"></div>
      <div className="text-skeleton w-2/4"></div>
    </div>
  );
};

export default TaskCardSkeleton;
