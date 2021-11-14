import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "src/store";
import {
  ITask,
  ITaskCardState,
  ITaskGroup,
  ITaskGroupState,
} from "@task/types/Task";

// Utils
import { v4 as uuid } from "uuid";

interface IDashboardState {
  taskGroups: ITaskGroupState;
  tasks: ITaskCardState;
}

const initialState: IDashboardState = {
  taskGroups: {},
  tasks: {},
};

interface ISetEditableStatusDto {
  taskId: string;
  status: boolean;
}

interface IRemoveNewTaskDto {
  taskGroupId: string;
  taskId: string;
}

interface IAddTaskToTaskGroupDto {
  taskGroupId: string;
  task: ITask;
}

interface IUpdateTaskGroupTasksDto {
  taskGroupId: string;
  tasks: string[];
}

//TODO: Mirar si es mas facil normalizar la estructura para añadir y eliminar elementos con el respectivo id
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTaskGroups: (
      state,
      action: PayloadAction<Pick<ITaskGroup, "_id" | "tasks">[]>
    ) => {
      const taskGroups: ITaskGroupState = {};
      const tasks: ITaskCardState = {};

      action.payload.forEach((taskGroup) => {
        taskGroups[taskGroup._id] = {
          isEditing: false,
          tasks: taskGroup.tasks,
        };

        taskGroup.tasks.forEach((taskId) => {
          tasks[taskId] = {
            isEditing: false,
          };
        });
      });

      state.taskGroups = taskGroups;
      state.tasks = tasks;
    },
    addNewTaskGroup: (state) => {
      const tempId = uuid();
      state.taskGroups[`pending_${tempId}`] = { isEditing: true, tasks: [] };
    },
    updateTaskGroupTasks: {
      reducer: (state, action: PayloadAction<IUpdateTaskGroupTasksDto>) => {
        const { taskGroupId, tasks } = action.payload;

        state.taskGroups[taskGroupId].tasks = tasks;
        tasks.forEach((taskId) => {
          state.tasks[taskId] = { isEditing: false };
        });
      },
      prepare: (taskGroupId, tasks) => {
        return { payload: { taskGroupId, tasks } };
      },
    },
    addTaskToTaskGroup: {
      reducer: (state, action: PayloadAction<IAddTaskToTaskGroupDto>) => {
        const { taskGroupId, task } = action.payload;

        state.taskGroups[taskGroupId].tasks.push(task._id);
        state.tasks[task._id] = { isEditing: false };
      },
      prepare: (taskGroupId, task) => {
        return { payload: { taskGroupId, task } };
      },
    },
    addNewTask: (state, action: PayloadAction<string>) => {
      const taskGroupId = action.payload;
      const tempId = uuid();

      state.taskGroups[taskGroupId].tasks.push(`pending_${tempId}`);
      state.tasks[`pending_${tempId}`] = { isEditing: true };
    },
    removeNewTask: {
      reducer: (state, action: PayloadAction<IRemoveNewTaskDto>) => {
        const { taskGroupId, taskId } = action.payload;

        const taskIndex = state.taskGroups[taskGroupId].tasks.findIndex(
          (id) => id === taskId
        );

        // Remove the task in taskGroup references
        state.taskGroups[taskGroupId].tasks.splice(taskIndex, 1);
        // Remove the task in task collection
        delete state.tasks[taskId];
      },
      prepare: (taskGroupId: string, taskId: string) => {
        return { payload: { taskGroupId, taskId } };
      },
    },
    setTaskEditableStatus: {
      reducer: (state, action: PayloadAction<ISetEditableStatusDto>) => {
        const { taskId, status } = action.payload;
        state.tasks[taskId].isEditing = status;
      },
      prepare: (taskId: string, status: boolean) => {
        return { payload: { taskId, status } };
      },
    },
    cleanDashboard: (state) => {
      state.taskGroups = initialState.taskGroups;
      state.tasks = initialState.tasks;
    },
  },
});

// Action creators
export const DashboardActions = dashboardSlice.actions;

// Selectors
export const DashboardSelectors = {
  selectTasks: (state: RootState) => state[dashboardSlice.name].tasks,
  selectTaskGroups: (state: RootState) => state[dashboardSlice.name].taskGroups,
  selectTaskById: (state: RootState, id: string) =>
    state[dashboardSlice.name].tasks[id],
  selectTasksByTaskGroupId: (
    state: RootState,
    taskGroupId: string
  ): ITaskCardState => {
    const tasks: ITaskCardState = {};

    const taskGroupTasks =
      state[dashboardSlice.name].taskGroups[taskGroupId].tasks;

    taskGroupTasks.forEach((taskId) => {
      tasks[taskId] = state[dashboardSlice.name].tasks[taskId];
    });

    return tasks;
  },
};
