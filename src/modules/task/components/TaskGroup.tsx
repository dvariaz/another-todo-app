import { useRef } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import "@task/styles/TaskGroup.css";

// Types
import { ITask, ITaskCard } from "@task/types/Task";
import { TDashboardParams } from "src/App";
import { IPosition } from "@common/types/Position";

// Components
import TaskCard from "@task/components/TaskCard";
import EditableTaskCard from "./EditableTaskCard";

// Hooks
import { useParams } from "react-router";
import useTaskGroupHandler from "@task/hooks/useTaskGroupHandler";

interface ITaskGroupProps {
  id: string;
  name: string;
  initialTasks: ITask[];

  className?: string;
}

const TaskGroup = ({ id, name, initialTasks, className }: ITaskGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id: dashboardId } = useParams<TDashboardParams>();
  const { tasks, addNewTask, removeNewTask, setTaskEditableStatus, saveTask } =
    useTaskGroupHandler(initialTasks);

  return (
    <div ref={ref} className={classNames("task-group", className)}>
      <div className="flex mb-2">
        <h3 className="text-gray text-lg font-bold flex-1">{name}</h3>
        <button>
          <i className="isax isax-more text-gray-200 text-2xl" />
        </button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <motion.div
            drag
            onDragEnd={(e: PointerEvent) => {
              console.log("client ", e.clientX, e.clientY);

              // const { clientX, clientY } = e;
              // onDragEnd && onDragEnd({ x: clientX, y: clientY });
            }}
          >
            {task.isEditing ? (
              <EditableTaskCard
                key={`${task._id}_${index}`}
                {...task}
                className="mb-4"
                onSave={async (data) =>
                  saveTask({
                    task: data,
                    index,
                    dashboardId: dashboardId,
                    taskGroupId: id,
                  })
                }
                onBlur={(isNew, isDirty) => {
                  if (!isDirty) {
                    if (isNew) {
                      removeNewTask(index);
                    } else {
                      setTaskEditableStatus(index, false);
                    }
                  }
                }}
              />
            ) : (
              <TaskCard
                key={task._id}
                title={task.title || ""}
                description={task.description || ""}
                created_by={task.created_by || ""}
                className="mb-4"
                onClick={() => setTaskEditableStatus(index, true)}
              />
            )}
          </motion.div>
        ))}
      </div>
      <div>
        <button onClick={() => addNewTask()} className="btn w-full">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskGroup;
