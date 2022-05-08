import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Task, { TaskStatusType } from '../models/task';
import { fetchTasks, createTask, updateTask } from '../api/task';

interface TaskHookType {
  result: UseQueryResult<Task[]>;
  addTask: (title: string, description?: string) => void;
  toggleTaskStatus: (task: Task) => void;
}

export function useTask(): TaskHookType {
  const result = useQuery('tasks', fetchTasks);

  const queryClient = useQueryClient();
  const createMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
  const updateMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const addTask = (title: string, description?: string) => {
    createMutation.mutate({
      id: '',
      title: title,
      description: description ?? '',
      status: 'TODO',
    });
  };

  const toggleTaskStatus = (task: Task) => {
    let newStatus: TaskStatusType = 'DONE';
    if (task.status == 'DONE') {
      newStatus = 'TODO';
    }
    const newTask = { ...task, status: newStatus };
    updateMutation.mutate(newTask);
  };

  return { result, addTask, toggleTaskStatus };
}
