import { Box, TextField, Button } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'todolist-89bb8.firebaseapp.com',
  projectId: 'todolist-89bb8',
  storageBucket: 'todolist-89bb8.appspot.com',
  messagingSenderId: '71693804254',
  appId: '1:71693804254:web:3605987dd8b1178253584f',
  measurementId: 'G-GVWTC8F2CH',
};

const app = initializeApp(firebaseConfig);

const SignIn = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    if (typeof email != 'string' || typeof password != 'string') {
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
