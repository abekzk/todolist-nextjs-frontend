import Layout from '../components/Layout';
import TodoList from '../components/TodoList';
import { useAuth } from '../contexts/AuthContext';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage: NextPage = () => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === null) {
      router.push('/signin');
    }
  });

  return (
    <Layout title="Todolist App">
      <main>
        <TodoList />
      </main>
    </Layout>
  );
};

export default IndexPage;
