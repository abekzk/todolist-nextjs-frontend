import Task, { TaskStatusType } from '../models/task';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/api/task';
import useSWR from 'swr';

interface TaskHooks {
  tasks: Task[];
  isLoading: boolean;
  isError: unknown;
  addTask: (title: string, description?: string) => Promise<void>;
  changeTask: (task: Task) => Promise<void>;
  toggleTaskStatus: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export function useTask(): TaskHooks {
  const { data, error, mutate } = useSWR('/v1/tasks', fetchTasks);

  const addTask = async (title: string) => {
    try {
      const task: Task = {
        id: '',
        title: title,
        description: '',
        status: 'TODO',
      };
      await createTask(task);
      mutate();
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  const changeTask = async (task: Task) => {
    try {
      await updateTask(task);
      mutate();
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      mutate();
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      let newStatus: TaskStatusType = 'DONE';
      if (task.status == 'DONE') {
        newStatus = 'TODO';
      }
      await updateTask({ ...task, status: newStatus });
      mutate();
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  return {
    tasks: data ?? [],
    isLoading: !error && !data,
    isError: error,
    addTask,
    toggleTaskStatus,
    changeTask,
    removeTask,
  };
}
