import classNames from "classnames";

// Utils
import { generateRandomDimension } from "@common/utils/random";

interface ITaskGroupSkeletonProps {
  className?: string;
}

const TaskGroupSkeleton = ({ className }: ITaskGroupSkeletonProps) => {
  const height = generateRandomDimension(150, 200);

  return (
    <div className={classNames("task-group", className)}>
      <div className="flex mb-2 h-72">
        <div className="text-skeleton w-4/6"></div>
      </div>
      <div style={{ height }}></div>
    </div>
  );
};

export default TaskGroupSkeleton;
