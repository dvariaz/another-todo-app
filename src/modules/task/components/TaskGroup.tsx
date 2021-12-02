import { SyntheticEvent } from "react";
import classNames from "classnames";

import "@task/styles/TaskGroup.css";

// Types
import { ITasksState } from "@dashboard/store/slice.types";

// Components
import TaskContainer from "@task/containers/TaskContainer";

interface ITaskGroupProps {
  id: string;
  name: string;
  tasks: ITasksState;
  onDrop?: (position: number) => void;
  onAddTask?: (id: string) => void;
  className?: string;
}

const TaskGroup = ({
  id,
  name,
  tasks,
  onDrop,
  onAddTask,
  className,
}: ITaskGroupProps) => {
  const handleAddTask = (e: SyntheticEvent) => {
    onAddTask && onAddTask(id);
  };

  return (
    <div className={classNames("task-group", className)}>
      <div className="flex mb-2">
        <h3 className="text-gray text-lg font-bold flex-1">{name}</h3>
        <button>
          <i className="isax isax-more text-gray-200 text-2xl" />
        </button>
      </div>
      <div>
        {Object.keys(tasks).map((taskId, index) => (
          <TaskContainer
            key={taskId}
            id={taskId}
            taskGroupId={id}
            index={index}
            onDrop={(position) => onDrop && onDrop(position)}
          />
        ))}
      </div>
      <div>
        <button onClick={handleAddTask} className="btn w-full">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskGroup;
