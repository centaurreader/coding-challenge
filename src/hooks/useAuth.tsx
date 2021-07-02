import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import MockService, { AuthResponse } from '../api/MockService';

interface AuthHook {
  signIn: (username: string, password: string) => Promise<AuthResponse>,
  signOut: () => void,
  user: AuthResponse,
}

const STORAGE_KEY = 'AUTH';
const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '');
  } catch {
    return '';
  }
};

const authContext = createContext<AuthHook>({} as unknown as AuthHook);

export const useAuth = () => useContext(authContext);

export const useProvideAuth = () => {
  const [user, setUser] = useState(getStoredUser());

  const signIn = async (username: string, password: string) => {
    const response = await MockService.login(username, password);
    setUser(response);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    return response;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    signIn,
    signOut,
    user,
  };
};

export const ProvideAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};
ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default {
  useProvideAuth,
};
