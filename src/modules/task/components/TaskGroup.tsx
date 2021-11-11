import { useRef } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import "@task/styles/TaskGroup.css";

// Types
import { ITaskCardState } from "@task/types/Task";
import { IPosition } from "@common/types/Position";

// Components
import TaskContainer from "@task/containers/TaskContainer";

// Hooks
import { useParams } from "react-router";
import useDashboardManager from "@dashboard/hooks/useDashboardManager";

interface ITaskGroupProps {
  id: string;
  name: string;
  tasks: ITaskCardState;
  className?: string;
}

const TaskGroup = ({ id, name, tasks, className }: ITaskGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { addNewTask } = useDashboardManager();

  return (
    <div ref={ref} className={classNames("task-group", className)}>
      <div className="flex mb-2">
        <h3 className="text-gray text-lg font-bold flex-1">{name}</h3>
        <button>
          <i className="isax isax-more text-gray-200 text-2xl" />
        </button>
      </div>
      <div>
        {Object.keys(tasks).map((taskId, index) => (
          <motion.div
            key={taskId}
            drag
            onDragEnd={(e: PointerEvent) => {
              console.log("client ", e.clientX, e.clientY);

              // const { clientX, clientY } = e;
              // onDragEnd && onDragEnd({ x: clientX, y: clientY });
            }}
          >
            <TaskContainer id={taskId} taskGroupId={id} index={index} />
          </motion.div>
        ))}
      </div>
      <div>
        <button onClick={() => addNewTask(id)} className="btn w-full">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskGroup;
