import { useState } from "react";
import classNames from "classnames";

import "@task/styles/TaskGroup.css";

// Types
import { Task } from "@task/types/Task";

// Components
import TaskCard from "@task/components/TaskCard";
import EditableTaskCard from "./EditableTaskCard";

interface ITaskGroupProps {
  name: string;
  tasks: Task[];
  className?: string;
}

const TaskGroup = ({ name, tasks, className }: ITaskGroupProps) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div className={classNames("task-group", className)}>
      <div className="flex mb-2">
        <h3 className="text-gray text-lg font-bold flex-1">{name}</h3>
        <button>
          <i className="isax isax-more text-gray-200 text-2xl" />
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            shared_users={task.shared_users}
            created_by={task.created_by}
            className="mb-4"
          />
        ))}
        {isAdding && (
          <EditableTaskCard
            className="mb-4"
            onSave={(data) => console.log(data)}
            onBlur={(isDirty) => {
              if (!isDirty) {
                setIsAdding(false);
              }
            }}
          />
        )}
      </div>
      <div>
        <button onClick={() => setIsAdding(true)} className="btn w-full">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskGroup;
