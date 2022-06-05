import { API_URL } from '../../configs/config';
import Task from '../../models/task';
import { setTokenInterceptor } from './interceptor';
import { TaskDTO, toModelTask, toAPITask } from './task.dto';
import axios from 'axios';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(setTokenInterceptor);

export async function fetchTasks(): Promise<Task[]> {
  try {
    // Call
    const res = await client.get<TaskDTO[]>('/v1/tasks');

    const tasks = res.data.map((resTask) => {
      return toModelTask(resTask);
    });
    return tasks;
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}

export async function createTask(task: Task): Promise<Task> {
  try {
    const body = toAPITask(task);
    const res = await client.post<TaskDTO>('/v1/tasks', body);
    return toModelTask(res.data);
  } catch (err) {
    throw err; // TODO: エラーハンドリング
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
    const body = toAPITask(task);
    const res = await client.put<TaskDTO>(`/v1/tasks/${task.id}`, body);
    return toModelTask(res.data);
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
