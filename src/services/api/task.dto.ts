import Task from '../../models/task';

export interface TaskDTO {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  status: number;
}

export function toModelTask(_task: TaskDTO): Task {
  const task: Task = {
    id: _task.id,
    title: _task.title,
    description: _task.description,
    status: 'TODO',
  };

  switch (_task.status) {
    case 0:
      task.status = 'TODO';
      break;
    case 1:
      task.status = 'DONE';
      break;
  }
  return task;
}

export function toAPITask(_task: Task): TaskDTO {
  const task: TaskDTO = {
    id: _task.id,
    title: _task.title,
    description: _task.description,
    status: 0,
  };

  switch (_task.status) {
    case 'TODO':
      task.status = 0;
      break;
    case 'DONE':
      task.status = 1;
      break;
  }
  return task;
}
