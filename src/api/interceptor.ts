import { AxiosRequestConfig } from 'axios';
import Firebase, { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: firebase関連処理の切り出し
async function getUser(): Promise<Firebase.User> {
  const auth = getAuth();
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      }
    });
  });
}

export async function setTokenInterceptor(config: AxiosRequestConfig) {
  const user = await getUser();
  if (user === null) {
    // TODO: ユーザーnull時の処理
    return config;
  }
  const token = await user.getIdToken();
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
}
