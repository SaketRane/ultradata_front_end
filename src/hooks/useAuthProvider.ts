
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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

    // Get current session
    const checkSession = async () => {
      try {
        console.log("Checking auth session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Active session found");
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
          }
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

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
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
