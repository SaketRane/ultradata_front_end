
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "superadmin" | "admin" | "user";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  company_id: string | null;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    needsTwoFactor: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  verifyTwoFactor: (token: string) => Promise<{ error: any | null }>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updatePassword: (password: string) => Promise<{ error: any | null }>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated and fetch profile
  useEffect(() => {
    // Get current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
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
          await fetchUserProfile(session.user.id);
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

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error, needsTwoFactor: false };
      }

      // Check if 2FA is required (this would need to be implemented in your database)
      // For now, it's a placeholder for future 2FA implementation
      const needsTwoFactor = false;

      return { error: null, needsTwoFactor };
    } catch (error: any) {
      return { error, needsTwoFactor: false };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
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

  // Verify two-factor authentication (placeholder for future implementation)
  const verifyTwoFactor = async (token: string) => {
    // This would need to be implemented with a real 2FA solution
    return { error: null };
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  // Check if user is an admin or superadmin
  const isAdmin = profile?.role === "admin" || profile?.role === "superadmin";
  const isSuperAdmin = profile?.role === "superadmin";

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    verifyTwoFactor,
    resetPassword,
    updatePassword,
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
