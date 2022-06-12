import AccountSettings from '../components/AccountSettings';
import Layout from '../components/Layout';
import { useAuth } from '../providers/AuthProvider';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SettingsPage: NextPage = () => {
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

export default SettingsPage;
