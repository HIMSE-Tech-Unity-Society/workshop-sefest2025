import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;