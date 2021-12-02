import { SyntheticEvent } from "react";
import classNames from "classnames";

import "@task/styles/TaskCard.css";

// Types
import { IUser } from "@common/types/User";
import { motion } from "framer-motion";
import { TASK_POINTER_SIZE } from "@constants/pointer";

interface ITaskCardProps {
  title: string;
  description: string;
  shared_users: IUser[];
  options?: React.ReactNode;
  highlightableText?: boolean;
  isCollapsed?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void;
  onIndicatorDragStart?: (e: SyntheticEvent) => void;
  className?: string;
}

const TaskCard = ({
  title,
  description,
  shared_users,
  options,
  highlightableText = true,
  isCollapsed = false,
  onClick,
  onIndicatorDragStart,
  onMouseUp,
  className,
}: ITaskCardProps) => {
  const renderSharedUsers = () => {
    const [firstUser] = shared_users;

    return (
      <img
        src={firstUser.profile_photo}
        className="circle-photo mr-4"
        alt={`${firstUser.name} photo`}
      />
    );
  };

  return (
    <motion.div
      animate={
        isCollapsed
          ? {
              height: 0,
              width: TASK_POINTER_SIZE,
              margin: "auto",
              opacity: 0,
            }
          : { height: "auto", width: "auto", opacity: 1 }
      }
      className={classNames("task-card card flex flex-col", className, {
        "select-none": !highlightableText,
      })}
      onMouseUp={onMouseUp}
    >
      <div className="drag-indicator" onMouseDown={onIndicatorDragStart}>
        <i className="indicator" />
      </div>
      <div className={classNames("flex mb-2", { hidden: isCollapsed })}>
        {shared_users.length > 0 && renderSharedUsers()}
        <h4 onClick={onClick} className="flex-1">
          {title}
        </h4>
        {options}
      </div>
      <p onClick={onClick} className="text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default TaskCard;
