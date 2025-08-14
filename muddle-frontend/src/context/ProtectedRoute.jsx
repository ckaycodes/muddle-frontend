import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // checking auth still

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
