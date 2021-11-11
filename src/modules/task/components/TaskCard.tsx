import React from "react";
import classNames from "classnames";

import "@task/styles/TaskCard.css";

// Types
import { IUser } from "@common/types/User";

interface ITaskCardProps {
  title: string;
  description: string;
  shared_users: IUser[];
  options?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

const TaskCard = ({
  title,
  description,
  shared_users,
  options,
  onClick,
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
    <div className={classNames("task-card card flex flex-col", className)}>
      <div className="drag-indicator">
        <i className="indicator" />
      </div>
      <div className="flex mb-2">
        {shared_users.length > 0 && renderSharedUsers()}
        <h4 onClick={onClick} className="flex-1">
          {title}
        </h4>
        {options}
      </div>
      <p onClick={onClick} className="text-sm">
        {description}
      </p>
    </div>
  );
};

export default TaskCard;
