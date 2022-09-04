import { logPage } from '../services/firebase/analytics';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, createContext } from 'react';

const LogContext = createContext(null);

export const LogProvider = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      logPage({
        page_location: location.href,
        page_title: document?.title,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <LogContext.Provider value={null}>{children}</LogContext.Provider>;
};
