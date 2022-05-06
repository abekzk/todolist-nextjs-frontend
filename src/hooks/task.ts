import { useQuery } from 'react-query';
import Task from '../models/task';
import { fetchTasks } from '../api/task';

export function useTasks(): Task[] {
  const query = useQuery('tasks', fetchTasks);
  if (!query.data) {
    return []; // TODO: undefined時の処理
  }
  return query.data;
}
