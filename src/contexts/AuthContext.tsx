
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
  has_two_factor: boolean;
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
  enableTwoFactor: () => Promise<{ error: any | null; secret: string | null }>;
  disableTwoFactor: () => Promise<{ error: any | null }>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Development mock user - remove in production
const DEV_MODE = true; // Set to false to use real authentication
const mockUser = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
} : null;

const mockProfile = DEV_MODE ? {
  id: "dev-user-id",
  email: "dev@example.com",
  role: "superadmin" as UserRole,
  company_id: null,
  has_two_factor: false,
} : null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(mockUser);
  const [profile, setProfile] = useState<UserProfile | null>(mockProfile);
  const [loading, setLoading] = useState(!DEV_MODE);
  const [temporarySession, setTemporarySession] = useState<any | null>(null);
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
        // Create a UserProfile object with default has_two_factor if not present
        const profileData: UserProfile = {
          id: data.id,
          email: data.email,
          role: data.role as UserRole,
          company_id: data.company_id,
          has_two_factor: data.has_two_factor || false
        };
        setProfile(profileData);
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    if (DEV_MODE) {
      // Mock successful login in dev mode
      return { error: null, needsTwoFactor: false };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error, needsTwoFactor: false };
      }

      // Store the session temporarily if 2FA is required
      if (data?.user) {
        // Check if user has 2FA enabled by fetching profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          return { error: profileError, needsTwoFactor: false };
        }

        // Default to false if has_two_factor doesn't exist
        const needsTwoFactor = profileData?.has_two_factor || false;
        
        if (needsTwoFactor) {
          // Store session temporarily and prevent automatic login
          setTemporarySession(data.session);
          setUser(null);
          
          // Request 2FA code via API (in production, this would send an email or SMS)
          // This is a mock implementation, in a real app you would use a proper 2FA service
          console.log("2FA required for user:", data.user.email);
          
          return { error: null, needsTwoFactor: true };
        }
      }

      return { error: null, needsTwoFactor: false };
    } catch (error: any) {
      return { error, needsTwoFactor: false };
    }
  };

  // Verify two-factor authentication
  const verifyTwoFactor = async (token: string) => {
    if (DEV_MODE) {
      // Mock successful verification in dev mode
      return { error: null };
    }

    try {
      if (!temporarySession) {
        return { error: new Error("No active login session") };
      }

      // Validate the token (In a real implementation, this would validate against a proper 2FA service)
      if (token === "123456") { // Mock validation - replace with real validation in production
        // Complete the sign-in process with the stored session
        setUser(temporarySession.user);
        await fetchUserProfile(temporarySession.user.id);
        setTemporarySession(null);
        return { error: null };
      } else {
        return { error: new Error("Invalid verification code") };
      }
    } catch (error: any) {
      return { error };
    }
  };

  // Enable two-factor authentication for the current user
  const enableTwoFactor = async () => {
    if (DEV_MODE) {
      // Mock successful enabling in dev mode
      return { error: null, secret: "MOCK2FASECRET" };
    }

    try {
      if (!user) {
        return { error: new Error("No authenticated user"), secret: null };
      }

      // In a real implementation, this would generate a secret and register with a proper 2FA service
      const mockSecret = "ABCDEF123456"; // Mock secret - replace with real generation in production

      // Check if has_two_factor column exists in profiles table
      const { error: columnError } = await supabase.rpc('check_column_exists', { 
        p_table: 'profiles', 
        p_column: 'has_two_factor' 
      });

      // If column doesn't exist, we should add it
      if (columnError) {
        console.warn("has_two_factor column may not exist, defaulting to update anyway");
      }

      // Try to update the profile with has_two_factor
      const { error } = await supabase
        .from("profiles")
        .update({ has_two_factor: true })
        .eq("id", user.id);

      if (error) {
        console.error("Error enabling 2FA:", error);
        return { error, secret: null };
      }

      // Update local profile state
      if (profile) {
        setProfile({ ...profile, has_two_factor: true });
      }

      return { error: null, secret: mockSecret };
    } catch (error: any) {
      return { error, secret: null };
    }
  };

  // Disable two-factor authentication for the current user
  const disableTwoFactor = async () => {
    if (DEV_MODE) {
      // Mock successful disabling in dev mode
      return { error: null };
    }

    try {
      if (!user) {
        return { error: new Error("No authenticated user") };
      }

      // Try to update the profile with has_two_factor
      const { error } = await supabase
        .from("profiles")
        .update({ has_two_factor: false })
        .eq("id", user.id);

      if (error) {
        return { error };
      }

      // Update local profile state
      if (profile) {
        setProfile({ ...profile, has_two_factor: false });
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    if (DEV_MODE) {
      // Mock successful signup in dev mode
      return { error: null };
    }

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

  // Reset password
  const resetPassword = async (email: string) => {
    if (DEV_MODE) {
      // Mock successful password reset in dev mode
      toast.success("In development mode, password reset is simulated");
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
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
    if (DEV_MODE) {
      // Mock successful password update in dev mode
      toast.success("In development mode, password update is simulated");
      return { error: null };
    }

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
  const isAdmin = DEV_MODE ? true : (profile?.role === "admin" || profile?.role === "superadmin");
  const isSuperAdmin = DEV_MODE ? true : (profile?.role === "superadmin");

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
    enableTwoFactor,
    disableTwoFactor,
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
