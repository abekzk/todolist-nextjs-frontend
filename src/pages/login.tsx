import type { NextPage } from 'next';
import Layout from '../components/Layout';
import SignIn from '../components/SignIn';

const LoginPage: NextPage = () => (
  <Layout title="ログイン">
    <SignIn />
  </Layout>
);

export default LoginPage;
