import Layout from '../components/Layout';
import TodoList from '../components/TodoList';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();

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
