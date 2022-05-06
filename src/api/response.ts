import Task, { TaskStatusType } from '../models/task';

export interface ResTask {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: number;
}

export function resToTask(res: ResTask): Task {
  let status: TaskStatusType = 'TODO';
  if (res.status === 1) {
    status = 'DONE';
  }

  const task: Task = {
    id: res.id,
    title: res.title,
    description: res.description,
    status,
  };
  return task;
}
