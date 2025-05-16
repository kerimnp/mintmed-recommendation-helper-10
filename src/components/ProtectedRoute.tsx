
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, session } = useAuth();
  const location = useLocation();

  if (!session) {
    // User not logged in
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Placeholder for role checking logic
  // For now, if a user is logged in, we allow access.
  // if (requiredRole && user?.app_metadata?.role !== requiredRole) {
  //   // User does not have the required role
  //   return <Navigate to="/" state={{ from: location }} replace />; // Or a dedicated "Access Denied" page
  // }

  return children;
};

export default ProtectedRoute;

