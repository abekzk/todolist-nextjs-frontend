import User from '../models/user';
import {
  getUser,
  loginUser,
  logoutUser,
  createUser,
  updateUser,
} from '../services/firebase/firebase';
import {
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react';

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
    try {
      const user = await createUser(email, password);
      setAuth({ user: user });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const user = await loginUser(email, password);
      setAuth({ user: user });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  async function signOut() {
    try {
      await logoutUser();
      setAuth({ user: null });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  }

  const updateProfile = async (name?: string, iconUrl?: string) => {
    try {
      const user = await updateUser(name, iconUrl);
      setAuth({ user: user });
    } catch (err) {
      // TODO: エラーハンドリング
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setAuth({ user: user });
      } catch (err) {
        setAuth({ user: null });
      }
    })();
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
