import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('ProtectedRoute: Authentication status', { 
      isLoggedIn: !!currentUser, 
      loading, 
      userId: currentUser?.uid 
    });
  }, [currentUser, loading]);
  
  // If still loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-signal-blue"></div>
      </div>
    );
  }
  
  // If not authenticated and not loading, redirect to login
  if (!currentUser) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  // Render children if user is authenticated
  console.log('ProtectedRoute: User authenticated, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute; 