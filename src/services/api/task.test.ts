import Task from '../../models/task';
import { getToken } from '../firebase/firebase';
import { mockServer } from './mocks/server';
import { fetchTasks, createTask, updateTask, deleteTask } from './task';

jest.mock('../firebase/firebase');
const mockGetToken = getToken as jest.MockedFunction<typeof getToken>;
mockGetToken.mockResolvedValue('testtoken');

describe('API task 正常系', () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  test('fetchTasks', async () => {
    const want: Task[] = [
      {
        id: 'task_id_1',
        title: 'タスク名1',
        description: '説明文1',
        status: 'TODO',
      },
      {
        id: 'task_id_2',
        title: 'タスク名2',
        description: '説明文2',
        status: 'DONE',
      },
    ];
    const data = await fetchTasks({});
    expect(data).toEqual(want);
  });

  test('createTask', async () => {
    const want: Task = {
      id: 'task_id_1',
      title: 'タスク名1',
      description: '説明文1',
      status: 'TODO',
    };
    const data = await createTask({
      id: '',
      title: 'タスク名1',
      description: '説明文1',
      status: 'TODO',
    });
    expect(data).toEqual(want);
  });

  test('updateTask', async () => {
    const want: Task = {
      id: 'task_id_1',
      title: 'タスク名1',
      description: '説明文1',
      status: 'TODO',
    };
    const data = await updateTask({
      id: 'task_id_1',
      title: 'タスク名1',
      description: '説明文1',
      status: 'TODO',
    });
    expect(data).toEqual(want);
  });

  test('deleteTask', async () => {
    await deleteTask('task_id_1');
  });
});
