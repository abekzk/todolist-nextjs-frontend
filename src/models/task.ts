interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
}

type StatusType = 'TODO' | 'DONE';

export default Task;
