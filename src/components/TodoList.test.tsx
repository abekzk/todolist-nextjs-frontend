import Task from '../models/task';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/api/task';
import TodoList from './TodoList';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';

jest.mock('../services/api/task');
const mockFetchTasks = fetchTasks as jest.MockedFunction<typeof fetchTasks>;
const mockCreateTask = createTask as jest.MockedFunction<typeof createTask>;
const mockUpdateTask = updateTask as jest.MockedFunction<typeof updateTask>;
const mockDeleteTask = deleteTask as jest.MockedFunction<typeof deleteTask>;

describe('<TodoList />', () => {
  beforeEach(() => {
    mockFetchTasks.mockClear();
    mockCreateTask.mockClear();
    mockUpdateTask.mockClear();
    mockDeleteTask.mockClear();
  });

  const rendering = () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <TodoList />
      </SWRConfig>
    );
  };

  test('コンポーネントのレンダー', async () => {
    mockFetchTasks.mockResolvedValue([
      {
        id: 'c3e6597744104a36a35616557d920666',
        title: 'タスク名1',
        description: 'タスク詳細1',
        status: 'TODO',
      },
    ]);

    rendering();
    await waitFor(() => screen.getByText('タスク名1'));

    expect(mockFetchTasks).toBeCalledTimes(1);
    expect(mockFetchTasks).toBeCalledWith({ sort: '-created_at' });
    expect(screen.getByText('タスク名1')).toBeInTheDocument();
    expect(screen.getByText('タスク詳細1')).toBeInTheDocument();
  });

  test('タスクの追加', async () => {
    const user = userEvent.setup();
    const inputed: Task = {
      id: '',
      title: 'タスク名1',
      status: 'TODO',
      description: '',
    };
    const created: Task = {
      ...inputed,
      id: 'c3e6597744104a36a35616557d920666',
    };

    mockFetchTasks.mockResolvedValueOnce([]);
    mockFetchTasks.mockResolvedValue([created]);
    mockCreateTask.mockResolvedValue(created);

    rendering();
    await waitFor(() => screen.getByText('タスクはありません'));

    await user.type(
      screen.getByRole('textbox', { name: 'タスクを入力' }),
      'タスク名1'
    );
    await user.click(screen.getByRole('button', { name: 'Add Todo' }));

    expect(mockFetchTasks).toBeCalledTimes(2);
    expect(mockCreateTask).toBeCalledTimes(1);
    expect(mockCreateTask).toBeCalledWith(inputed);
    expect(screen.getByText('タスク名1')).toBeInTheDocument();
  });

  test('タスクの更新', async () => {
    const user = userEvent.setup();
    const task: Task = {
      id: 'c3e6597744104a36a35616557d920666',
      title: 'タスク名1',
      description: '',
      status: 'TODO',
    };
    const updated: Task = { ...task, description: 'タスク詳細1' };

    mockFetchTasks.mockResolvedValueOnce([task]);
    mockFetchTasks.mockResolvedValue([updated]);
    mockUpdateTask.mockResolvedValue(updated);

    rendering();
    await waitFor(() => screen.getByText('タスク名1'));

    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.type(
      screen.getByRole('textbox', { name: '詳細' }),
      'タスク詳細1'
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));

    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: 'Save' })
    );

    expect(mockFetchTasks).toBeCalledTimes(2);
    expect(mockUpdateTask).toBeCalledTimes(1);
    expect(mockUpdateTask).toBeCalledWith(updated);
    expect(screen.getByText('タスク詳細1')).toBeInTheDocument();
  });

  test('タスクのステータス更新', async () => {
    const user = userEvent.setup();
    const task: Task = {
      id: 'c3e6597744104a36a35616557d920666',
      title: 'タスク名1',
      description: '',
      status: 'TODO',
    };
    const updated: Task = { ...task, status: 'DONE' };
    mockFetchTasks.mockResolvedValueOnce([task]);
    mockFetchTasks.mockResolvedValue([updated]);
    mockUpdateTask.mockResolvedValue(updated);

    rendering();
    await waitFor(() => screen.getByText('タスク名1'));

    await user.click(screen.getByRole('checkbox'));
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked());

    expect(mockFetchTasks).toBeCalledTimes(2);
    expect(mockUpdateTask).toBeCalledTimes(1);
    expect(mockUpdateTask).toBeCalledWith(updated);
  });

  test('タスクの削除', async () => {
    const user = userEvent.setup();
    const task: Task = {
      id: 'c3e6597744104a36a35616557d920666',
      title: 'タスク名1',
      description: '',
      status: 'TODO',
    };
    mockFetchTasks.mockResolvedValueOnce([task]);
    mockFetchTasks.mockResolvedValue([]);
    mockDeleteTask.mockResolvedValue();

    rendering();
    await waitFor(() => screen.getByText('タスク名1'));

    await user.click(screen.getByRole('button', { name: 'delete' }));
    await waitFor(() => screen.getByText('タスクはありません'));

    expect(mockFetchTasks).toBeCalledTimes(2);
    expect(mockDeleteTask).toBeCalledTimes(1);
    expect(mockDeleteTask).toBeCalledWith(task.id);
  });
});
