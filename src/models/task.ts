interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusType;
}

export type TaskStatusType = 'TODO' | 'DONE';

export default Task;
