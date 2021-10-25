import classNames from "classnames";

import "@task/styles/TaskGroup.css";

interface ITaskGroupProps {
  name: string;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const TaskGroup = ({ name, className, children }: ITaskGroupProps) => {
  return (
    <div className={classNames("task-group", className)}>
      <div className="flex mb-2">
        <h3 className="text-gray text-lg font-bold flex-1">{name}</h3>
        <button>
          <i className="isax isax-more text-gray-200 text-2xl" />
        </button>
      </div>
      <div>{children}</div>
      <div>
        <button className="btn w-full">Add Task</button>
      </div>
    </div>
  );
};

export default TaskGroup;
