import { useAuth } from '../providers/AuthProvider';
import { logEvent } from '../services/firebase/analytics';
import ErrorToast from './ErrorToast';
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
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<FormInputs>();
  const [open, setOpen] = useState(false); // エラートースト表示表のstate
  const [errMessage, setErrMessage] = useState('');

  const handleSignUp: SubmitHandler<FormInputs> = async (data) => {
    try {
      await signUp(data.email, data.password);
      logEvent('sign_up', { method: 'email' });
      router.push('/');
    } catch (err) {
      setOpen(true);
      setErrMessage('アカウント作成に失敗しました');
    }
  };

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
      <Box sx={{ mt: 3 }}>
        <form noValidate onSubmit={handleSubmit(handleSignUp)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    required
                    fullWidth
                    label="メールアドレス"
                    autoComplete="email"
                    error={formErrors.email && true}
                    helperText={formErrors.email && 'メールアドレスは必須です'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="パスワード"
                    type="password"
                    autoComplete="new-password"
                    error={formErrors.password && true}
                    helperText={formErrors.password && 'パスワードは必須です'}
                  />
                )}
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
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signin" passHref>
              <MULink variant="body2">既にアカウントをお持ちの方</MULink>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <ErrorToast {...{ open, setOpen, message: errMessage }} />
    </Box>
  );
};

export default SignUp;
