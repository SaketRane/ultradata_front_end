
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DEV_MODE } from "@/utils/auth-utils";

interface ProtectedRouteProps {
  /** Require admin role to access this route */
  requireAdmin?: boolean;
}

/**
 * Route component that requires authentication and optionally specific roles.
 * Handles various authorization states and provides appropriate redirection.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAdmin = false
}) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Enhanced DEV_MODE bypass with better logging
  if (DEV_MODE) {
    console.log(`DEV_MODE active: Authentication bypassed for ${location.pathname}`);
    return <Outlet />;
  }

  // Authentication check - redirect to login if not authenticated
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/" replace />;
  }

  // Role checks
  if (requireAdmin && !isAdmin) {
    console.log("Admin access required but user is not an admin");
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has required roles
  return <Outlet />;
};

export default React.memo(ProtectedRoute);
