import { useAuth } from '../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import {
  Grid,
  Avatar,
  TextField,
  Container,
  Button,
  IconButton,
  Popover,
  InputBase,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';

const AccountSettings = () => {
  const { auth, updateProfile } = useAuth();
  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);
  const [inputIconUrl, setInputIconUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    if (typeof name !== 'string') {
      return;
    }
    try {
      await updateProfile(name, iconUrl);
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  const handleSetIconUrl = () => {
    if (inputIconUrl === '') {
      setIconUrl(undefined);
      return;
    }
    setIconUrl(inputIconUrl);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (!auth.user?.iconUrl) {
      return;
    }
    setIconUrl(auth.user?.iconUrl);
    setInputIconUrl(auth.user?.iconUrl);
  }, [auth.user?.iconUrl]);

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item>
            <IconButton
              aria-label="アカウント画像"
              aria-describedby={id}
              onClick={handleClick}
            >
              {iconUrl && (
                <Avatar src={iconUrl} sx={{ width: 48, height: 48 }} />
              )}
              {!iconUrl && <AccountCircleIcon sx={{ fontSize: 48 }} />}
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="プロフィール画像URL"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  value={inputIconUrl}
                  onChange={(e) => setInputIconUrl(e.target.value)}
                />
                <IconButton onClick={handleSetIconUrl}>
                  <AddIcon />
                </IconButton>
              </Paper>
            </Popover>
          </Grid>
          <Grid item xs>
            <TextField
              margin="normal"
              required
              id="name"
              name="name"
              label="ユーザー名"
              autoComplete="name"
              fullWidth
              size="small"
              defaultValue={auth.user?.name}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            プロフィール更新
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default AccountSettings;
