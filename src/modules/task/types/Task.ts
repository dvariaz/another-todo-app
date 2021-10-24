import { User } from "@common/types/User";

export interface Task {
  _id: string;
  title: string;
  description: string;
  shared_users: User[];
  created_by: User;
  task_groups: TaskGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskGroup {
  _id: string;
  name: string;
  tasks: Task[];
  position: number;
  createdAt: string;
  updatedAt: string;
}
