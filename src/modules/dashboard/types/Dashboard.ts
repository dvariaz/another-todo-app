import { User } from "@common/types/User";
import { TaskGroup } from "@task/types/Task";

export interface Dashboard {
  _id: string;
  title: string;
  description: string;
  background_photo: string;
  shared_users: User[];
  tasks_groups: TaskGroup[];
}
