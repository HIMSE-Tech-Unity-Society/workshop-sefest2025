import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

const AuthProtectedRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}

export default AuthProtectedRoute;
