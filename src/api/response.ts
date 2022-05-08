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

export function taskToBody(task: Task): ResTask {
  let status = 0;
  if (task.status === 'DONE') {
    status = 1;
  }
  const body: ResTask = {
    id: task.id,
    user_id: '', // NOTE: トークンよりAPI側が自動でセットするため不要
    title: task.title,
    description: task.description,
    status: status,
  };
  return body;
}
