import Layout from '../components/Layout';
import SignIn from '../components/SignIn';
import { Container } from '@mui/material';
import type { NextPage } from 'next';

const SignInPage: NextPage = () => (
  <Layout title="ログイン">
    <Container component="main" maxWidth="xs">
      <SignIn />
    </Container>
  </Layout>
);

export default SignInPage;
