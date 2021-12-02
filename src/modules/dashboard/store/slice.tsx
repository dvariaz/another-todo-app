import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "src/store";
import { ITaskGroup } from "@task/types/Task";
import {
  ITaskMovingEventState,
  ITaskState,
  ITasksState,
  ITaskGroupState,
  ITaskGroupsState,
  IRemoveNewTaskDto,
  IAddTaskToTaskGroupDto,
  IUpdateTaskGroupTasksDto,
  ISetEditableStatusDto,
  IStartTaskMovingEventDto,
} from "./slice.types";

// Utils
import { v4 as uuid } from "uuid";

interface IDashboardState {
  taskMovingEvent: ITaskMovingEventState;
  taskGroups: ITaskGroupsState;
  tasks: ITasksState;
}

// Initial States
const taskInitialState: ITaskState = { isEditing: false, isMoving: false };

const taskMovingEventInitialState: ITaskMovingEventState = {
  isMoving: false,
  taskId: "",
  origin: {
    taskGroupId: "",
    position: -1,
  },
  pointer: {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  },
};

const initialState: IDashboardState = {
  taskMovingEvent: taskMovingEventInitialState,
  taskGroups: {},
  tasks: {},
};

// Slice
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTaskGroups: (
      state,
      action: PayloadAction<Pick<ITaskGroup, "_id" | "tasks">[]>
    ) => {
      const taskGroups: ITaskGroupsState = {};
      const tasks: ITasksState = {};

      action.payload.forEach((taskGroup) => {
        taskGroups[taskGroup._id] = {
          isEditing: false,
          tasks: taskGroup.tasks,
        };

        taskGroup.tasks.forEach((taskId) => {
          tasks[taskId] = {
            isEditing: false,
            isMoving: false,
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
          state.tasks[taskId] = taskInitialState;
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
        state.tasks[task._id] = taskInitialState;
      },
      prepare: (taskGroupId, task) => {
        return { payload: { taskGroupId, task } };
      },
    },
    addNewTask: (state, action: PayloadAction<string>) => {
      const taskGroupId = action.payload;
      const tempId = uuid();

      state.taskGroups[taskGroupId].tasks.push(`pending_${tempId}`);
      state.tasks[`pending_${tempId}`] = { isEditing: true, isMoving: false };
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
    startTaskMoving: (
      state,
      action: PayloadAction<IStartTaskMovingEventDto>
    ) => {
      const {
        taskId,
        taskGroupOrigin,
        taskInitialPosition,
        pointerInitialPosition,
      } = action.payload;

      state.taskMovingEvent = {
        isMoving: true,
        taskId,
        pointer: pointerInitialPosition,
        origin: {
          taskGroupId: taskGroupOrigin,
          position: taskInitialPosition,
        },
      };

      state.tasks[taskId].isMoving = true;
    },
    cleanTaskMoving: (state) => {
      state.tasks[state.taskMovingEvent?.taskId].isMoving = false;
      state.taskMovingEvent = taskMovingEventInitialState;
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
  ): ITasksState => {
    const tasks: ITasksState = {};

    const taskGroupTasks =
      state[dashboardSlice.name].taskGroups[taskGroupId].tasks;

    taskGroupTasks.forEach((taskId) => {
      tasks[taskId] = state[dashboardSlice.name].tasks[taskId];
    });

    return tasks;
  },
  selectTaskMovingEvent: (state: RootState) => {
    return state[dashboardSlice.name].taskMovingEvent;
  },
};
