import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

/**
 * ProtectedRoute - Wrapper component for role-based access control
 * @param {string} requiredRole - 'customer', 'admin', or null for authenticated users only
 */
const ProtectedRoute = ({ requiredRole = null }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCFAF7] via-white to-[#F6EFE6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate landing page based on user's role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
