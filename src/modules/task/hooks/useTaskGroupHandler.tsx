import { useEffect, useState } from "react";
import produce from "immer";

// Types
import { ITaskCard, ITask } from "@task/types/Task";
import { IUser } from "@common/types/User";

// Utils
import { transformTaskToTaskCard } from "@task/utils/transformers";

// Hooks
import { useCreateTaskInTaskGroupMutation } from "@api/services/DashboardService";

//TODO: Temp user
const globalUser: IUser = {
  _id: "6175d2db4bac55d5a560d4a9",
  name: "John Doe",
  email: "email",
  profile_photo: "profile",
  role: "USER_ROLE",
  createdAt: "2021-02-02",
};

const useTaskGroupHandler = (initialTasks: ITask[]) => {
  // RTK Mutations
  const [createTask] = useCreateTaskInTaskGroupMutation();

  const [tasks, setTasks] = useState<ITaskCard[]>(
    initialTasks.map(transformTaskToTaskCard)
  );

  useEffect(() => {
    setTasks(initialTasks.map(transformTaskToTaskCard));
  }, [initialTasks]);

  const addNewTask = () =>
    setTasks(
      produce(tasks, (nextState) => {
        const newTask: ITaskCard = {
          title: "",
          description: "",
          created_by: globalUser._id,
          isEditing: true,
        };
        nextState.push(newTask);
      })
    );

  const removeNewTask = (index: number) =>
    setTasks(
      produce(tasks, (nextState) => {
        delete nextState[index];
      })
    );

  const setTaskEditableStatus = (index: number, status: boolean) =>
    setTasks(
      produce(tasks, (nextState) => {
        nextState[index].isEditing = status;
      })
    );

  interface ISaveTask {
    task: Partial<ITask>;
    index: number;
    dashboardId: string;
    taskGroupId: string;
  }
  const saveTask = async ({
    task,
    index,
    dashboardId,
    taskGroupId,
  }: ISaveTask) => {
    return await createTask({
      ...task,
      position: index,
      created_by: globalUser._id,
      dashboard: dashboardId,
      taskGroup: taskGroupId,
    });
  };

  return {
    tasks,
    setTasks,
    addNewTask,
    removeNewTask,
    setTaskEditableStatus,
    saveTask,
  };
};

export default useTaskGroupHandler;
