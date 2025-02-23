/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Auth } from '@/interfaces/auth';
import { useAxios } from '@/hooks/useAxios';

type Props = {
  children: ReactNode;
};

type ContextType = {
  user?: Auth;
  isLoading: boolean;
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string>> | ((value: string) => void);
  setUser: Dispatch<SetStateAction<Auth>> | ((value: Auth) => void);
  logout: () => void;
};

const defaultValue: ContextType = {
  isLoading: false,
  setAccessToken: (_value: string) => null,
  setUser: (_value: Auth) => null,
  logout: () => null,
};

const AuthContext = createContext<ContextType>(defaultValue);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<Auth | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const axios = useAxios(accessToken);

  useEffect(() => {
    const _token = localStorage.getItem('access_token');

    if (_token) {
      setAccessToken(_token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getUser = useCallback(async () => {
    //
  }, []);


  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [getUser, accessToken]);

  const handleLogout = async () => {
    //
  };

  useEffect(() => {
    localStorage.setItem('access_token', accessToken || '');
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessToken,
        setAccessToken,
        setUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
