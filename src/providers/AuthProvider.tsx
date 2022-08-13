import User from '../models/user';
import {
  getUser,
  loginUser,
  logoutUser,
  createUser,
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
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});

  async function signUp(email: string, password: string) {
    try {
      const user = await createUser(email, password);
      setAuth({ user: user });
    } catch (err) {
      throw err;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const user = await loginUser(email, password);
      setAuth({ user: user });
    } catch (err) {
      throw err;
    }
  }

  async function signOut() {
    try {
      await logoutUser();
      setAuth({ user: null });
    } catch (err) {
      throw err;
    }
  }

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
    <AuthContext.Provider value={{ auth, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
