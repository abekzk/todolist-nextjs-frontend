import { API_URL } from '../../configs/config';
import Task from '../../models/task';
import { setTokenInterceptor } from './interceptor';
import { ResTask, resToTask, taskToBody } from './response';
import axios from 'axios';

const client = axios.create({
  baseURL: API_URL,
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

export async function updateTask(task: Task): Promise<Task> {
  try {
    const body = taskToBody(task);
    const res = await client.put<ResTask>(`/v1/tasks/${task.id}`, body);
    return resToTask(res.data);
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}

export async function deleteTask(id: string) {
  try {
    await client.delete(`/v1/tasks/${id}`);
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}
