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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<FormInputs>();

  const handleSignIn: SubmitHandler<FormInputs> = async (data) => {
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } catch (err) {
      // TODO: エラーハンドリング
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
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <form noValidate onSubmit={handleSubmit(handleSignIn)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="メールアドレス"
                autoComplete="email"
                autoFocus
                error={formErrors.email && true}
                helperText={formErrors.email && 'メールアドレスは必須です'}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="パスワード"
                type="password"
                autoComplete="current-password"
                error={formErrors.password && true}
                helperText={formErrors.password && 'パスワードは必須です'}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link href="/signup" passHref>
              <MULink variant="body2">{'アカウントを作成する'}</MULink>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
