
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserProfile } from "@/types/auth";
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
  updatePassword,
  fetchCurrentUserProfile
} from "@/services/auth-service";

/**
 * Custom hook that provides authentication functionality
 */
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(DEV_MODE ? mockUser : null);
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

    // Check for active session with Spring Boot backend
    const checkSession = async () => {
      try {
        console.log("Checking auth session...");
        
        // This would call a Spring Boot endpoint to check session validity
        const userProfile = await fetchCurrentUserProfile();
        
        if (userProfile) {
          // If we have a profile, we can create a basic user object
          setUser({
            id: userProfile.id,
            email: userProfile.email
          });
          setProfile(userProfile);
          console.log("Active session found");
        } else {
          console.log("No active session");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

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

