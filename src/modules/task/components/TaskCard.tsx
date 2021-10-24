import classNames from "classnames";

import "@task/styles/TaskCard.css";

// Types
import { User } from "@common/types/User";

interface ITaskCardProps {
  title: string;
  description: string;
  shared_users: User[];
  created_by: User;
  className?: string;
}

const TaskCard = ({
  title,
  description,
  shared_users,
  created_by,
  className,
}: ITaskCardProps) => {
  return (
    <div className={classNames("task-card card flex flex-col", className)}>
      <div className="flex mb-2">
        <h4>{title}</h4>
        <img
          src={created_by.profile_photo}
          className="circle-photo ml-4"
          alt={`${created_by.name} photo`}
        />
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default TaskCard;
