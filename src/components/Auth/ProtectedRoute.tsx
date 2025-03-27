
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

/**
 * Route component that requires authentication and optionally specific roles.
 * Uses environment variables properly for development mode.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAdmin = false,
  requireSuperAdmin = false
}) => {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // In development mode, skip auth checks if enabled in the environment
  if (
    import.meta.env.DEV && 
    import.meta.env.VITE_SKIP_AUTH === "true"
  ) {
    console.warn("Development mode: Authentication checks bypassed!");
    return <Outlet />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check for required roles
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
