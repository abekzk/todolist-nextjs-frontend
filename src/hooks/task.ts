import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Task from '../models/task';
import { fetchTasks, createTask } from '../api/task';

interface TaskHookType {
  result: UseQueryResult<Task[]>;
  addTask: (title: string, description?: string) => void;
}

export function useTask(): TaskHookType {
  const result = useQuery('tasks', fetchTasks);

  const queryClient = useQueryClient();
  const createMutation = useMutation(createTask, {
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

  return { result, addTask };
}
