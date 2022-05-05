import '../styles/globals.css';
import type { AppProps } from 'next/app';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from '../contexts/AuthContext';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
