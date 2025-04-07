
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
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

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Development mode auth bypass
  if (DEV_MODE) {
    console.log("Development mode: Authentication checks bypassed!");
    // Even in dev mode, respect admin route requirements
    if (requireAdmin && !isAdmin) {
      console.log("Dev mode: Admin role required but user is not an admin");
      return <Navigate to="/dashboard" replace />;
    }
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
