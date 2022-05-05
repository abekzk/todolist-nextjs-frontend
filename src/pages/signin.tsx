import type { NextPage } from 'next';
import { Container } from '@mui/material';
import Layout from '../components/Layout';
import SignIn from '../components/SignIn';

const SignInPage: NextPage = () => (
  <Layout title="ログイン">
    <Container component="main" maxWidth="xs">
      <SignIn />
    </Container>
  </Layout>
);

export default SignInPage;
