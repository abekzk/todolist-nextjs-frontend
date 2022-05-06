import { AxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';

export async function setTokenInterceptor(config: AxiosRequestConfig) {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
}
