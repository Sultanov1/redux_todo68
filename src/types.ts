export interface ApiTask {
  task: string;
  isCompleted: boolean;
}

export interface Task extends ApiTask {
  id: string;
}

export interface ApiTasks {
  [id: string]: ApiTask;
}

export interface ChangeStatus {
  id: string;
  isCompleted: boolean;
}

export interface DeleteItem {
  id: string;
}