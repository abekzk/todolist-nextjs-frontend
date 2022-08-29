import { API_URL } from '../../../configs/config';
import task from './data/task.json';
import tasks from './data/tasks.json';
import { rest } from 'msw';

export const handlers = [
  rest.get(API_URL + '/v1/tasks', (_, res, ctx) => {
    return res(ctx.json(tasks));
  }),

  rest.post(API_URL + '/v1/tasks', (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(task));
  }),

  rest.put(API_URL + '/v1/tasks/:taskId', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(task));
  }),

  rest.delete(API_URL + '/v1/tasks/:taskId', (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
