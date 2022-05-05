import type { NextPage } from 'next';
import { Container } from '@mui/material';
import Layout from '../components/Layout';
import SignUp from '../components/SignUp';

const SignUpPage: NextPage = () => (
  <Layout title="ログイン">
    <Container component="main" maxWidth="xs">
      <SignUp />
    </Container>
  </Layout>
);

export default SignUpPage;
