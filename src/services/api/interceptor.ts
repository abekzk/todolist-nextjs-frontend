import { getToken } from '../firebase/authentication';
import { AxiosRequestConfig } from 'axios';

export async function setTokenInterceptor(config: AxiosRequestConfig) {
  try {
    const token = await getToken();
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  } catch (err) {
    throw err;
  }
}
