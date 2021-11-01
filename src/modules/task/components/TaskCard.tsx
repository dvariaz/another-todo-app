import React from "react";
import classNames from "classnames";

import "@task/styles/TaskCard.css";

// Types
import { IUser } from "@common/types/User";

interface ITaskCardProps {
  title: string;
  description: string;
  created_by: IUser | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

const TaskCard = ({
  title,
  description,
  created_by,
  onClick,
  className,
}: ITaskCardProps) => {
  const renderCreatorPhoto = () => {
    if (typeof created_by !== "string") {
      return (
        <img
          src={created_by.profile_photo}
          className="circle-photo ml-4"
          alt={`${created_by.name} photo`}
        />
      );
    }
  };

  return (
    <div className={classNames("task-card card flex flex-col", className)}>
      <div className="flex justify-between mb-2">
        <h4 onClick={onClick}>{title}</h4>
        {renderCreatorPhoto()}
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default TaskCard;
