import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import api from '../services/api';

interface ISignInCredentials {
  SignEmail: string;
  password: string;
}

interface IAuthContextData {
  email: string;
  token?: string;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthState {
  token: string;
  email: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem('@CustomerXChallenge:token');
    const user = localStorage.getItem('@CustomerXChallenge:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, email: JSON.parse(user) });
    }

    setData({} as IAuthState);
  }, []);

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@CustomerXChallenge:token');
    const user = localStorage.getItem('@CustomerXChallenge:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, email: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ SignEmail, password }) => {
    const response = await api.post('/session', {
      email: SignEmail,
      password,
    });

    const { token, email } = response.data;

    localStorage.setItem('@CustomerXChallenge:token', token);
    localStorage.setItem('@CustomerXChallenge:user', JSON.stringify(email));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, email });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@CustomerXChallenge:access_token');
    localStorage.removeItem('@CustomerXChallenge:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email: data.email,
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
