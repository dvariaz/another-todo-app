import { IUser } from "@common/types/User";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  shared_users: IUser[];
  created_by: IUser | string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskGroup {
  _id: string;
  name: string;
  tasks: ITask[];
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCard extends Partial<ITask> {
  isEditing: boolean;
}
