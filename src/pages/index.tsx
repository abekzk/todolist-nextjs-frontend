import type { NextPage } from 'next';
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTasks } from '../hooks/task';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';

const Home: NextPage = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();
  const tasks = useTasks();

  async function handleLogout() {
    try {
      signOut();
      router.push('/signin');
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  useEffect(() => {
    if (auth.user === null) {
      router.push('/signin');
    }
  });

  return (
    <Layout title="Todolist App">
      <main>
        <TodoList />
        <Button variant="contained" onClick={handleLogout}>
          ログアウト
        </Button>
      </main>
    </Layout>
  );
};

export default Home;
