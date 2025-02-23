import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
