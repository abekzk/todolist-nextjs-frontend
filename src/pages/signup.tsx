import Layout from '../components/Layout';
import SignUp from '../components/SignUp';
import { Container } from '@mui/material';
import type { NextPage } from 'next';

const SignUpPage: NextPage = () => (
  <Layout title="ログイン">
    <Container component="main" maxWidth="xs">
      <SignUp />
    </Container>
  </Layout>
);

export default SignUpPage;
