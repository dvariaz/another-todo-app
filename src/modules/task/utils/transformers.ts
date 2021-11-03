// Types
import { ITaskCard, ITask } from "@task/types/Task";

/**
 * Transform Task to TaskCard
 * @param task
 * @returns
 */
export const transformTaskToTaskCard = (task: ITask): ITaskCard => ({
  ...task,
  isEditing: false,
});
