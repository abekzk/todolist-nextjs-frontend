import { AuthProvider } from '../providers/AuthProvider';
import { LogProvider } from '../providers/LogProvider';
import { initFirebase } from '../services/firebase/firebase';
import theme from '../styles/theme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();
  const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <LogProvider>
            <Component {...pageProps} />
          </LogProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
