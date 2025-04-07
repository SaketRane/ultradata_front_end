
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

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(mockUser as User | null);
  const [profile, setProfile] = useState<UserProfile | null>(mockProfile);
  const [loading, setLoading] = useState(!DEV_MODE);
  const navigate = useNavigate();

  // Check if user is authenticated and fetch profile only if not in dev mode
  useEffect(() => {
    if (DEV_MODE) return;

    // Get current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
          }
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

  const handleSignOut = async () => {
    if (DEV_MODE) {
      // In development mode, just redirect to home
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
  const isAdmin = DEV_MODE ? true : (profile?.role === "admin");

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
