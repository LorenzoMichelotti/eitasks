export default interface ITask {
  id: number;
  created_at: string;
  progress: number;
  completed: boolean;
  parentTaskId?: number;
  description?: string;
  profileId: number;
  title: string;
}

export default interface ITaskList {
  tasks: ITask[];
  count: number;
}
