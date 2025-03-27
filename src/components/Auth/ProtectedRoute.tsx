
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

// Get development mode from environment - defaults to false in production
const isDevelopment = import.meta.env.DEV;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAdmin = false,
  requireSuperAdmin = false
}) => {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // In development mode, skip auth checks if enabled in the environment
  if (isDevelopment && import.meta.env.VITE_SKIP_AUTH === "true") {
    console.warn("Development mode: Authentication checks bypassed!");
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
