import '../styles/globals.css';
import type { AppProps } from 'next/app';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const clientSideEmotionCache = createCache({ key: 'css', prepend: true });
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
