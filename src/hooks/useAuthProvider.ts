
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/types/auth";
import { 
  fetchUserProfile, 
  DEV_MODE, 
  mockUser, 
  mockProfile 
} from "@/utils/auth-utils";
import {
  signIn,
  signUp,
  signOut as authSignOut,
  verifyTwoFactor,
  resetPassword,
  updatePassword
} from "@/services/auth-service";

// Define a simple User type to replace the Supabase User type
type User = {
  id: string;
  email: string;
};

/**
 * Custom hook that provides authentication functionality
 */
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(DEV_MODE ? mockUser as User : null);
  const [profile, setProfile] = useState<UserProfile | null>(DEV_MODE ? mockProfile : null);
  const [loading, setLoading] = useState(!DEV_MODE);
  const navigate = useNavigate();

  // Authentication state and session management
  useEffect(() => {
    if (DEV_MODE) {
      console.log("Development mode: Using mock auth data");
      setLoading(false);
      return;
    }

    // This would be replaced with PostgreSQL session checking
    const checkSession = async () => {
      try {
        console.log("Checking auth session...");
        // This is a placeholder for PostgreSQL implementation
        console.log("No active session - authentication not implemented yet");
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
      }
    };

    checkSession();

    // This would be replaced with PostgreSQL auth state listener
    return () => {
      console.log("Auth listener cleanup");
    };
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    if (DEV_MODE) {
      console.log("Dev mode: Simulating sign out");
      setUser(null);
      setProfile(null);
      navigate("/");
      return;
    }

    const { error } = await authSignOut();
    if (!error) {
      setUser(null);
      setProfile(null);
      navigate("/");
    }
  };

  // Check if user is an admin
  const isAdmin = profile?.role === "admin";

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    verifyTwoFactor,
    resetPassword,
    updatePassword,
    isAdmin,
  };
};
