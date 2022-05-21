import User from '../models/user';
import { initializeApp } from 'firebase/app';
import Firebase, {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as _signOut,
  updateProfile as _updateProfile,
} from 'firebase/auth';
import {
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBklRSTulAxQtb9_6jFzw__jZ3tuJh7qqQ',
  authDomain: 'todolist-89bb8.firebaseapp.com',
  projectId: 'todolist-89bb8',
  storageBucket: 'todolist-89bb8.appspot.com',
  messagingSenderId: '71693804254',
  appId: '1:71693804254:web:3605987dd8b1178253584f',
  measurementId: 'G-GVWTC8F2CH',
};

initializeApp(firebaseConfig);

interface AuthState {
  user?: User | null;
}

interface AuthContextType {
  auth: AuthState;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (name?: string, iconUrl?: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});

  async function signUp(email: string, password: string) {
    const firebaseAuth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setAuth({ user: convUser(userCredential.user) });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  async function signIn(email: string, password: string) {
    const firebaseAuth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setAuth({ user: convUser(userCredential.user) });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  async function signOut() {
    const firebaseAuth = getAuth();
    try {
      await _signOut(firebaseAuth);
      setAuth({ user: null });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  const updateProfile = async (name?: string, iconUrl?: string) => {
    const firebaseAuth = getAuth();
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      return;
    }
    try {
      await _updateProfile(currentUser, {
        displayName: name,
        photoURL: iconUrl,
      });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  useEffect(() => {
    const firebaseAuth = getAuth();
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setAuth({ user: convUser(user) });
      } else {
        setAuth({ user: null });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, signUp, signIn, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function convUser(_user: Firebase.UserInfo): User {
  const user: User = {
    name: _user.displayName ?? 'ユーザー',
    email: _user.email ?? '',
    iconUrl: _user.photoURL,
  };
  return user;
}
