import { fetchTasks } from '../services/api/task';
import TodoList from './TodoList';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('../services/api/task');
const mockFetchTasks = fetchTasks as jest.MockedFunction<typeof fetchTasks>;

describe('<TodoList />', () => {
  test('コンポーネントのレンダー', async () => {
    mockFetchTasks.mockResolvedValue([
      {
        id: 'c3e6597744104a36a35616557d920666',
        title: 'タスク名1',
        description: 'タスク詳細1',
        status: 'TODO',
      },
    ]);

    render(<TodoList />);

    await waitFor(() => screen.getByText('タスク名1'));
    expect(screen.getByText('タスク名1')).toBeInTheDocument();
    expect(screen.getByText('タスク詳細1')).toBeInTheDocument();
  });
});
