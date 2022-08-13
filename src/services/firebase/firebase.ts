import { FIREBASE_CONFIG } from '../../configs/config';
import User from '../../models/user';
import { initializeApp } from 'firebase/app';
import Firebase, {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

initializeApp(FIREBASE_CONFIG);

function toModelUser(_user: Firebase.UserInfo): User {
  const user: User = {
    email: _user.email ?? '',
  };
  return user;
}

// Auth情報取得
async function getFirebaseAuthUser(): Promise<Firebase.User> {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      }
      reject(new Error('No Login')); // TODO: エラー修正
    });
  });
}

// ユーザー取得
export async function getUser(): Promise<User> {
  try {
    const user = await getFirebaseAuthUser();
    return toModelUser(user);
  } catch (err) {
    throw new Error('getUser Error'); // TODO: エラー修正
  }
}

// トークン取得
export async function getToken(): Promise<string> {
  try {
    const user = await getFirebaseAuthUser();
    const token = await user.getIdToken();
    return token;
  } catch (err) {
    throw new Error('getToken Error'); // TODO: エラー修正
  }
}

// ログイン
export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return toModelUser(userCredential.user);
  } catch (err) {
    throw new Error('loginUser Error'); // TODO: エラー修正
  }
}

// ログアウト
export async function logoutUser() {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (err) {
    // TODO: エラーハンドリング
  }
}

// ユーザー登録
export async function createUser(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return toModelUser(userCredential.user);
  } catch (err) {
    throw new Error('createUser Error'); // TODO: エラー修正
  }
}
