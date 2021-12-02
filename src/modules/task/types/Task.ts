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

export interface ITaskLocation {
  taskGroupId: string;
  position: number;
}
