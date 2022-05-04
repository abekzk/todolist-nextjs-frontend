import { Box, TextField, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const { signIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    if (typeof email != 'string' || typeof password != 'string') {
      return;
    }

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
