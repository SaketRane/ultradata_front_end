
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserProfile } from "./types";
import { 
  DEV_MODE, 
  mockUser, 
  mockProfile, 
  fetchUserProfile,
  signInWithEmail,
  signUpWithEmail,
  resetPasswordWithEmail,
  updateUserPassword,
  verifyTwoFactorToken
} from "./auth-utils";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(mockUser);
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

  // Sign out
  const signOut = async () => {
    if (DEV_MODE) {
      // In development mode, just redirect to home
      navigate("/");
      return;
    }

    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      navigate("/");
    } catch (error: any) {
      toast.error("Error signing out");
      console.error("Error signing out:", error.message);
    }
  };

  // Check if user is an admin or superadmin
  const isAdmin = DEV_MODE ? true : (profile?.role === "admin" || profile?.role === "superadmin");
  const isSuperAdmin = DEV_MODE ? true : (profile?.role === "superadmin");

  const value = {
    user,
    profile,
    loading,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    signOut,
    verifyTwoFactor: verifyTwoFactorToken,
    resetPassword: resetPasswordWithEmail,
    updatePassword: updateUserPassword,
    isAdmin,
    isSuperAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
