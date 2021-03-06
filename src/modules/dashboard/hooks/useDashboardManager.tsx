// Types
import { ITask, ITaskGroup, ITaskLocation } from "@task/types/Task";
import { IUser } from "@common/types/User";

// Hooks
import { useAppDispatch } from "@common/hooks/rtk";
import {
  useCreateTaskInTaskGroupMutation,
  useDeleteTaskMutation,
  useMoveTaskMutation,
  useUpdateTaskMutation,
} from "@api/services/DashboardService";

// Store
import { DashboardActions } from "@dashboard/store/slice";

//TODO: Temp user
const globalUser: IUser = {
  _id: "61820d05ed8c6ca57daf0325",
  name: "John Doe",
  email: "email",
  profile_photo: "profile",
  role: "USER_ROLE",
  createdAt: "2021-02-02",
};

const useDashboardManager = () => {
  const dispatch = useAppDispatch();

  // RTK Mutations
  const [createTaskMutation] = useCreateTaskInTaskGroupMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [moveTaskMutation] = useMoveTaskMutation();

  const setTaskGroups = (taskGroups: Pick<ITaskGroup, "_id" | "tasks">[]) =>
    dispatch(DashboardActions.setTaskGroups(taskGroups));

  const addNewTask = (taskGroupId: string) =>
    dispatch(DashboardActions.addNewTask(taskGroupId));

  const removeNewTask = (taskGroupId: string, taskId: string) =>
    dispatch(DashboardActions.removeNewTask(taskGroupId, taskId));

  const setTaskEditableStatus = (id: string, status: boolean) =>
    dispatch(DashboardActions.setTaskEditableStatus(id, status));

  const updateTaskGroupTasks = (taskGroupId: string, tasks: string[]) =>
    dispatch(DashboardActions.updateTaskGroupTasks(taskGroupId, tasks));

  const saveTask = async ({
    isNew,
    taskId,
    payload,
    index,
    taskGroupId,
  }: {
    isNew: boolean;
    taskId: string;
    payload: Partial<ITask>;
    index: number;
    taskGroupId: string;
  }) => {
    if (isNew) {
      // If the task to save is new, we save it
      await createTaskMutation({
        ...payload,
        position: index,
        created_by: globalUser._id,
        taskGroupId,
      });
    } else {
      // If the task currently exists, we update it
      await updateTaskMutation({ _id: taskId, ...payload });
      dispatch(DashboardActions.setTaskEditableStatus(taskId, false));
    }
  };

  const removeTask = async ({
    taskId,
    taskGroupId,
  }: {
    taskId: string;
    taskGroupId: string;
  }) => {
    return deleteTaskMutation({ taskId, taskGroupId });
  };

  const moveTask = async ({
    taskId,
    origin,
    destination,
  }: {
    taskId: string;
    origin: ITaskLocation;
    destination: ITaskLocation;
  }) => {
    return moveTaskMutation({ taskId, origin, destination });
  };

  const cleanDashboard = () => {
    dispatch(DashboardActions.cleanDashboard());
  };

  return {
    setTaskGroups,
    cleanDashboard,
    addNewTask,
    removeNewTask,
    setTaskEditableStatus,
    updateTaskGroupTasks,
    saveTask,
    removeTask,
    moveTask,
  };
};

export default useDashboardManager;
