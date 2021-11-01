// Types
import { ITaskCard, ITask } from "@task/types/Task";

export const transformTaskToTaskCard = (task: ITask): ITaskCard => ({
  ...task,
  isEditing: false,
});
