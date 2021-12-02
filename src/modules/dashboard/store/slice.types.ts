// Types
import { ITask, ITaskLocation } from "@task/types/Task";

// States
export interface ITaskState {
  isEditing: boolean;
  isMoving: boolean;
}

export interface ITasksState {
  [id: string]: ITaskState;
}

export interface ITaskGroupState {
  isEditing: boolean;
  tasks: string[];
}

export interface ITaskGroupsState {
  [id: string]: ITaskGroupState;
}

export interface ITaskMovingEventState {
  isMoving: boolean;
  taskId: string;
  pointer: Pick<DOMRect, "x" | "y" | "width" | "height">;
  origin: ITaskLocation;
}

// Dtos
export interface ISetEditableStatusDto {
  taskId: string;
  status: boolean;
}

export interface IRemoveNewTaskDto {
  taskGroupId: string;
  taskId: string;
}

export interface IAddTaskToTaskGroupDto {
  taskGroupId: string;
  task: ITask;
}

export interface IUpdateTaskGroupTasksDto {
  taskGroupId: string;
  tasks: string[];
}

export interface IStartTaskMovingEventDto {
  taskId: string;
  taskGroupOrigin: string;
  taskInitialPosition: number;
  pointerInitialPosition: DOMRect;
}
