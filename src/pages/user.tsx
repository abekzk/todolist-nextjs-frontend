import AccountSettings from '../components/AccountSettings';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UserPage: NextPage = () => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === null) {
      router.push('/signin');
    }
  });

  return (
    <Layout title="ユーザープロフィール">
      <main>
        <AccountSettings />
      </main>
    </Layout>
  );
};

export default UserPage;
