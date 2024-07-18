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