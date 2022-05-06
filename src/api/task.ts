import Task from '../models/task';
import axios from 'axios';
import { ResTask, resToTask } from './response';
import { setTokenInterceptor } from './interceptor';

const client = axios.create({
  baseURL: 'http://' + process.env.NEXT_PUBLIC_API_DOMAIN,
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
