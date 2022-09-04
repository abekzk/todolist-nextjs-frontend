import IndexPage from '../src/pages/index';
import { AuthProvider } from '../src/providers/AuthProvider';
import { mockServer } from '../src/services/api/mocks/server';
import { getToken, getUser } from '../src/services/firebase/authentication';
import { render, screen, waitFor } from '@testing-library/react';

// モック
jest.mock('../src/services/firebase/authentication');
const mockGetToken = getToken as jest.MockedFunction<typeof getToken>;
mockGetToken.mockResolvedValue('testtoken');
const mockGetUser = getUser as jest.MockedFunction<typeof getUser>;
mockGetUser.mockResolvedValue({ email: 'test@example.com' });
jest.mock('../src/services/firebase/analytics');

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('renders IndexPage', async () => {
  const { container } = render(
    <AuthProvider>
      <IndexPage />
    </AuthProvider>
  );
  await waitFor(() => screen.getByText('タスク名1'));
  expect(container).toMatchSnapshot();
});
