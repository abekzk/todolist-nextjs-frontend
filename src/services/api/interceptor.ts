import { getToken } from '../firebase/firebase';
import { AxiosRequestConfig } from 'axios';

export async function setTokenInterceptor(config: AxiosRequestConfig) {
  try {
    const token = await getToken();
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  } catch (err) {
    // TODO: トークン取得失敗時の処理
    return config;
  }
}
