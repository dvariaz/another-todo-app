import { ITask } from "@task/types/Task";

export interface IUpdateTaskDto extends Partial<ITask> {
  dashboard: string;
}

export interface ICreateTaskInTaskGroupDto extends Partial<ITask> {
  taskGroupId: string;
  position: number;
}

export interface IMoveTaskDto {
  taskId: string;
  origin: {
    taskGroupId: string;
    position: number;
  };
  destination: {
    taskGroupId: string;
    position: number;
  };
}
