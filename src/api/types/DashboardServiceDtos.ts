import { ITask } from "@task/types/Task";

export interface UpdateTaskDto extends Partial<ITask> {
  dashboard: string;
}

export interface CreateTaskInTaskGroupDto extends Partial<ITask> {
  dashboard: string;
  taskGroup: string;
  position: number;
}
