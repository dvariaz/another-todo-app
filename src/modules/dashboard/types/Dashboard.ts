import { IUser } from "@common/types/User";
import { ITaskGroup } from "@task/types/Task";

export interface IDashboard {
  _id: string;
  title: string;
  description: string;
  background_photo: string;
  shared_users: IUser[];
  task_groups: ITaskGroup[];
}
