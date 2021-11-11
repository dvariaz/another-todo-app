export interface ITask {
  _id: string;
  title: string;
  description: string;
  shared_users: string[];
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskGroup {
  _id: string;
  name: string;
  tasks: string[];
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCard extends Partial<ITask> {
  isEditing: boolean;
}

export interface ITaskCardState {
  [id: string]: {
    isEditing: boolean;
  };
}

export interface ITaskGroupState {
  [id: string]: {
    isEditing: boolean;
    tasks: string[];
  };
}
