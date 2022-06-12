import { useAuth } from '../providers/AuthProvider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Typography,
  Link as MULink,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SignUp = () => {
  const { signUp } = useAuth();
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
      await signUp(email, password);
      router.push('/');
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          アカウント作成
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signin" passHref>
              <MULink variant="body2">既にアカウントをお持ちの方</MULink>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
