import Task from '../models/task';
import axios from 'axios';
import { ResTask, resToTask, taskToBody } from './response';
import { setTokenInterceptor } from './interceptor';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.request.use(setTokenInterceptor);

export async function fetchTasks(): Promise<Task[]> {
  try {
    // Call
    const res = await client.get<ResTask[]>('/v1/tasks');

    const tasks = res.data.map((resTask) => {
      return resToTask(resTask);
    });
    return tasks;
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}

export async function createTask(task: Task): Promise<Task> {
  try {
    const body = taskToBody(task);
    const res = await client.post<ResTask>('/v1/tasks', body);
    return resToTask(res.data);
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}
