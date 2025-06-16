import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router';
import LoadingSpinner from '@/components/commons/LoadingSpinner';

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}) => {
  const { session, role, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
