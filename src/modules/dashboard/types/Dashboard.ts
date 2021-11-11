import { ITaskGroup } from "@task/types/Task";

export interface IDashboard {
  _id: string;
  title: string;
  description: string;
  background_photo: string;
  shared_users: string[];
  task_groups: Pick<ITaskGroup, "_id" | "tasks">[];
}
